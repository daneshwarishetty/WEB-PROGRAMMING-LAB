const userForm = document.getElementById("userForm");
const errorMessage = document.getElementById("errorMessage");

userForm.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  const name = document.getElementById("name").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const country = document.getElementById("country").value;

  if (!name || !gender || !mobile || !email || !city || !state || !country) {
    errorMessage.textContent = "Please fill in all required fields.";
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    errorMessage.textContent = "Please enter a valid 10-digit Indian mobile number.";
    document.getElementById("mobile").focus();
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    document.getElementById("email").focus();
    return;
  }

  const user = {
    name,
    gender: gender.value,
    mobile,
    email,
    city,
    state,
    country
  };

  // Store the form details so display.html can read them.
  sessionStorage.setItem("lab8UserInfo", JSON.stringify(user));
  window.location.href = "display.html";
});
