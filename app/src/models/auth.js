import baseModel from "./baseModel";

export default new (class extends baseModel {
  constructor() {
    super();
    this.apiEndpoint = "/auth";
  }
})();
