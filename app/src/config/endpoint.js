import { ENV, ENV_PROD, ENV_STAGE } from "./env.js";

var url = "";

switch (ENV) {
  case ENV_PROD:
    url = "";
    break;
  case ENV_STAGE:
    url = "";
    break;
  default:
    url = "http://localhost:5555/v1";
    break;
}

export default url;
