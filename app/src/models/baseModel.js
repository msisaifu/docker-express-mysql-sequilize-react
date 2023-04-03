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

  getAll(endpoint) {
    this.params.method = "GET";
    return Ajax(this.finalEndpoint(endpoint), this.params);
  }

  getOne(id, endpoint) {
    this.params.method = "GET";
    return Ajax(this.finalEndpoint(endpoint) + "/" + id, this.params);
  }

  delete(id, endpoint) {
    this.params.method = "DELETE";
    return Ajax(this.finalEndpoint(endpoint) + "/" + id, this.params);
  }

  update(id, payload, endpoint) {
    this.params.method = "PUT";
    this.params.body = JSON.stringify(payload);
    return Ajax(this.finalEndpoint(endpoint) + "/" + id, this.params);
  }

  // getAll(endpoint, params) {
  //   return Net.get((endpoint || this.apiEndpoint) + q);
  // }

  // getOne(id, endpoint) {
  //   return Net.get((endpoint || this.apiEndpoint) + "/" + id);
  // }
}

export default baseModel;
