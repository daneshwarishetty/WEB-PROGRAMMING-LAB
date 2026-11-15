const detailsContainer = document.getElementById("profileDetails");
const savedData = sessionStorage.getItem("lab8UserInfo");

if (!savedData) {
  detailsContainer.innerHTML = "<p>No user information was found. Please complete the registration form first.</p>";
} else {
  const user = JSON.parse(savedData);
  const fields = [
    ["Full Name", user.name],
    ["Gender", user.gender],
    ["Mobile Number", user.mobile],
    ["Email ID", user.email],
    ["City", user.city],
    ["State", user.state],
    ["Country", user.country]
  ];

  fields.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "detail-row";

    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    description.textContent = value;

    row.append(term, description);
    detailsContainer.appendChild(row);
  });
}
