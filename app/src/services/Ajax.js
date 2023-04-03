import LocalStorage from "./LocalStorage";
import baseUrl from "../config/endpoint";

function refreshToken() {
  const user = LocalStorage.get("user");
  let endpoint = baseUrl + "/auth/refresh_token";
  let params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify({ refresh_token: user.refresh_token }),
  };
  Ajax(endpoint, params)
    .then((res) => {
      let { token } = res;
      let user_data = Object.assign(user, token);
      LocalStorage.set("user", user_data);
    })
    .catch((err) => {
      console.log("err", err);
    });
}

export function Ajax(endpoint, params) {
  return new Promise(async (fulfil, reject) => {
    try {
      const user_data = LocalStorage.get("user");
      if (user_data && user_data.access_token) {
        params["headers"]["Authorization"] = `Bearer ${user_data.access_token}`;
      }
      const response = await fetch(endpoint, params);
      const result = await response.json();
      let code = response.status;
      if (code >= 200 && code < 400) {
        fulfil(result);
      } else {
        if (code == 419) {
          if (user_data && user_data.refresh_token) {
            refreshToken();
          }
        } else {
          reject(result);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}
