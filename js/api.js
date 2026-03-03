const API_BASE = "http://localhost:5000/api";

// =============================
// TOKEN HANDLING
// =============================
function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
}

// =============================
// GENERIC API CALL
// =============================
async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(API_BASE + endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;

  } catch (error) {
    alert(error.message);
    throw error;
  }
}