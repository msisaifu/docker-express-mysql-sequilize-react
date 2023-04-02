import LocalStorage from "./LocalStorage";

export function Ajax(endpoint, params) {
  return new Promise(async (fulfil, reject) => {
    try {
      const user_data = LocalStorage.get("user");
      if (user_data && user_data.access_token) {
        params["headers"]["Authorization"] = `Bearer ${user_data.access_token}`;
      }
      const response = await fetch(endpoint, params);
      const result = await response.json();
      fulfil(result);
    } catch (error) {
      reject(error);
    }
  });
}
