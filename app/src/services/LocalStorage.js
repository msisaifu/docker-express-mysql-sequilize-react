export default new (class {
  constructor() {
    if (typeof localStorage === "undefined") return;
  }
  clear() {
    localStorage.clear();
  }
  get(key) {
    var val = localStorage.getItem(key);
    return typeof val === "string" ? JSON.parse(val) : val;
  }
  key(n) {
    return localStorage.key(n);
  }
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  remove(key) {
    localStorage.removeItem(key);
  }
})();
