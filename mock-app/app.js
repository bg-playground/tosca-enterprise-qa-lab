// Mock order-to-activate domain. All state lives in localStorage; nothing leaves the browser.
class Catalog {
  static PLANS = { BASIC: { name: 'Basic 5GB', price: 25 }, PLUS: { name: 'Plus 25GB', price: 40 }, UNLTD: { name: 'Unlimited', price: 65 } };
  static price(code) { return Catalog.PLANS[code] ? Catalog.PLANS[code].price : null; }
}
class Serviceability {
  // Fictional coverage: ZIPs starting with 1-8 are covered, 9xxxx is not.
  static check(zip) {
    if (!/^\d{5}$/.test(zip)) return { ok: false, reason: 'ZIP must be 5 digits' };
    if (zip.startsWith('9') || zip.startsWith('0')) return { ok: false, reason: 'Address not serviceable' };
    return { ok: true, reason: 'Serviceable' };
  }
}
class Validation {
  static iccid(v) { return /^89\d{17,18}$/.test(v); }
  static order(o) {
    const e = [];
    if (!o.customer.trim()) e.push('Customer name is required');
    if (!Catalog.PLANS[o.plan]) e.push('Plan is required');
    if (!Validation.iccid(o.iccid)) e.push('ICCID must start with 89 and be 19-20 digits');
    const s = Serviceability.check(o.zip);
    if (!s.ok) e.push(s.reason);
    return e;
  }
}
class OrderStore {
  static KEY = 'ota.orders';
  static all() { return JSON.parse(localStorage.getItem(OrderStore.KEY) || '[]'); }
  static save(list) { localStorage.setItem(OrderStore.KEY, JSON.stringify(list)); }
  static clear() { localStorage.removeItem(OrderStore.KEY); }
}
class Lifecycle {
  static NEXT = { Submitted: ['Provisioning', 'Cancelled'], Provisioning: ['Activated', 'Cancelled'], Activated: [], Cancelled: [] };
  static canMove(from, to) { return (Lifecycle.NEXT[from] || []).includes(to); }
}
// Mock provisioning API (the "integration" surface). Same-origin, in-memory only.
class OtaApi {
  static create(input) {
    const errors = Validation.order(input);
    if (errors.length) return { ok: false, errors };
    const list = OrderStore.all();
    const id = 'ORD-' + String(1001 + list.length);
    const order = { id, customer: input.customer.trim(), plan: input.plan, iccid: input.iccid, zip: input.zip, status: 'Submitted', history: ['Submitted'] };
    list.push(order); OrderStore.save(list);
    return { ok: true, order };
  }
  static transition(id, to) {
    const list = OrderStore.all(); const o = list.find(x => x.id === id);
    if (!o) return { ok: false, errors: ['Order not found'] };
    if (!Lifecycle.canMove(o.status, to)) return { ok: false, errors: [`Cannot move ${o.status} to ${to}`] };
    o.status = to; o.history.push(to); OrderStore.save(list);
    return { ok: true, order: o };
  }
  static get(id) { return OrderStore.all().find(x => x.id === id) || null; }
  static list() { return OrderStore.all(); }
  static reset() { OrderStore.clear(); }
}
window.OtaApi = OtaApi; window.Catalog = Catalog;

class Ui {
  static $(id) { return document.getElementById(id); }
  static render() {
    const body = Ui.$('orders-body'); body.innerHTML = '';
    for (const o of OtaApi.list()) {
      const tr = document.createElement('tr'); tr.dataset.testid = `order-${o.id}`; tr.setAttribute('data-testid', `order-${o.id}`);
      tr.innerHTML = `<td>${o.id}</td><td></td><td>${Catalog.PLANS[o.plan].name}</td><td data-testid="status">${o.status}</td><td></td>`;
      tr.children[1].textContent = o.customer;
      const actions = tr.children[4];
      for (const [label, to] of [['Provision', 'Provisioning'], ['Activate', 'Activated'], ['Cancel', 'Cancelled']]) {
        const b = document.createElement('button'); b.textContent = label; b.setAttribute('data-testid', `${label.toLowerCase()}`);
        b.disabled = !Lifecycle.canMove(o.status, to);
        b.onclick = () => { OtaApi.transition(o.id, to); Ui.render(); };
        actions.appendChild(b);
      }
      body.appendChild(tr);
    }
  }
  static init() {
    Ui.$('plan').addEventListener('change', e => { const p = Catalog.price(e.target.value); Ui.$('price').textContent = p === null ? '-' : `$${p}.00`; });
    Ui.$('check').addEventListener('click', () => { const r = Serviceability.check(Ui.$('zip').value.trim()); Ui.$('service-msg').textContent = r.reason; });
    Ui.$('order-form').addEventListener('submit', e => {
      e.preventDefault();
      const res = OtaApi.create({ customer: Ui.$('customer').value, plan: Ui.$('plan').value, iccid: Ui.$('iccid').value.trim(), zip: Ui.$('zip').value.trim() });
      const errs = Ui.$('errors'); errs.innerHTML = '';
      if (!res.ok) { for (const m of res.errors) { const li = document.createElement('li'); li.textContent = m; errs.appendChild(li); } return; }
      e.target.reset(); Ui.$('price').textContent = '-'; Ui.$('service-msg').textContent = `Created ${res.order.id}`;
      Ui.render();
    });
    Ui.render();
  }
}
document.addEventListener('DOMContentLoaded', Ui.init);
