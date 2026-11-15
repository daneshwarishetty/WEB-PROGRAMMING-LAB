const searchInput = document.getElementById("searchInput");
const tableRows = Array.from(document.querySelectorAll("#productTable tbody tr"));
const emptyMessage = document.getElementById("emptyMessage");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  let visibleCount = 0;

  tableRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query);
    row.hidden = !matches;
    if (matches) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
});

document.getElementById("year").textContent = new Date().getFullYear();
