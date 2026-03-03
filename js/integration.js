// =============================
// WAIT FOR DOM TO LOAD
// =============================
document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // LOGIN BUTTON
  // =============================
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

      const email = document.getElementById("emailInput").value;
      const password = document.getElementById("passwordInput").value;

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      try {
        await loginUser(email, password);

        alert("Login successful");

        // Hide login card after success
        const loginCard = document.querySelector("#dashboard .form-card");
        if (loginCard) loginCard.style.display = "none";

      } catch (err) {
        console.error(err);
      }
    });
  }

});


// =============================
// AUTH
// =============================

async function registerUser(name, email, password) {
  const data = await apiRequest("/auth/register", "POST", {
    name,
    email,
    password
  });

  alert("Registered successfully");
  return data;
}

async function loginUser(email, password) {
  const data = await apiRequest("/auth/login", "POST", {
    email,
    password
  });

  setToken(data.token);
  loadDashboard();
}


// =============================
// PROFILE
// =============================

async function saveProfile(profileData) {
  const data = await apiRequest("/profile", "POST", profileData);
  alert("Profile saved");
  return data;
}

async function getProfile() {
  return await apiRequest("/profile");
}


// =============================
// WEIGHT
// =============================

async function addWeight(weight) {
  const data = await apiRequest("/weight", "POST", {
    weight
  });

  alert("Weight logged");
  loadDashboard();
  return data;
}

async function getWeightHistory() {
  return await apiRequest("/weight");
}

async function deleteWeight(id) {
  await apiRequest(`/weight/${id}`, "DELETE");
  loadDashboard();
}


// =============================
// AI PLAN
// =============================

async function generatePlan(type) {
  const data = await apiRequest("/plan/generate", "POST", {
    type
  });

  alert("Plan generated");
  return data.plan;
}

async function getPlans() {
  return await apiRequest("/plan");
}

async function deletePlan(id) {
  await apiRequest(`/plan/${id}`, "DELETE");
}


// =============================
// AI CHAT
// =============================

async function sendChatMessage(message) {
  const data = await apiRequest("/chat", "POST", {
    message
  });

  return data;
}

async function getChatHistory() {
  return await apiRequest("/chat");
}

async function clearChat() {
  await apiRequest("/chat", "DELETE");
}


// =============================
// DASHBOARD
// =============================

async function loadDashboard() {
  try {
    const data = await apiRequest("/dashboard");

    const cards = document.querySelectorAll(".card");

    if (cards.length >= 3) {

      cards[0].querySelector("h2").innerText = data.bmi;
      cards[0].querySelector("span").innerText = data.bmiCategory;

      cards[1].querySelector("h2").innerText = data.recommendedCalories;

      cards[2].querySelector("h2").innerText =
        data.recommendedProtein + "g";
    }

    console.log("Dashboard loaded:", data);

  } catch (err) {
    console.error("Dashboard load failed:", err);
  }
}