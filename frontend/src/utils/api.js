const API_BASE_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE_URL) ||
  "";

async function request(method, path, { body, params } = {}) {
  const url = new URL(API_BASE_URL + "/api" + path, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers = {};
  const token = localStorage.getItem("token");

  if (token) headers.Authorization = "Bearer " + token;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
    }

    const error = new Error(
      (data && (data.error || data.message)) || "Request failed"
    );
    error.response = { status: response.status, data };
    throw error;
  }

  return { data, status: response.status };
}

const api = {
  get(path, options = {}) {
    return request("GET", path, { params: options.params });
  },
  post(path, body) {
    return request("POST", path, { body });
  },
  put(path, body) {
    return request("PUT", path, { body });
  },
  patch(path, body) {
    return request("PATCH", path, { body });
  },
  delete(path) {
    return request("DELETE", path);
  },
};

export default api;
