import { Ajax } from "../services/Ajax";
import baseUrl from "../config/endpoint";

class baseModel {
  constructor() {
    this.apiEndpoint = "";
    this.params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  finalEndpoint(endpoint) {
    return `${baseUrl}${endpoint || this.apiEndpoint}`;
  }

  login(payload, endpoint) {
    this.params.body = JSON.stringify(payload);
    this.params.method = "POST";
    return Ajax(this.finalEndpoint(endpoint), this.params);
  }

  create(payload, endpoint) {
    this.params.body = JSON.stringify(payload);
    this.params.method = "POST";
    return Ajax(this.finalEndpoint(endpoint), this.params);
  }

  // getAll(endpoint, params) {
  //   return Net.get((endpoint || this.apiEndpoint) + q);
  // }

  // getOne(id, endpoint) {
  //   return Net.get((endpoint || this.apiEndpoint) + "/" + id);
  // }
}

export default baseModel;
