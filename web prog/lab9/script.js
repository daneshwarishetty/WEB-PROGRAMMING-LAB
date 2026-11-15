const tableBody = document.getElementById("bookTableBody");
const statusText = document.getElementById("status");
const reloadButton = document.getElementById("reloadBtn");

async function loadBooks() {
  statusText.textContent = "Loading XML data…";
  statusText.classList.remove("error");
  tableBody.innerHTML = '<tr><td colspan="3" class="empty">Loading records…</td></tr>';

  try {
    // Fetch the XML file from the same folder as this web page.
    const response = await fetch("books.xml");

    if (!response.ok) {
      throw new Error(`Could not load books.xml (HTTP ${response.status}).`);
    }

    const xmlText = await response.text();

    // Convert the XML text into an XML DOM document.
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // A parsererror element indicates that the XML is not well-formed.
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      throw new Error("The XML file contains invalid XML syntax.");
    }

    const books = xmlDoc.getElementsByTagName("book");
    tableBody.innerHTML = "";

    if (books.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3" class="empty">No book records found.</td></tr>';
    } else {
      // Read each book's id attribute and child element values.
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const id = book.getAttribute("id") || "-";
        const titleNode = book.getElementsByTagName("title")[0];
        const priceNode = book.getElementsByTagName("price")[0];
        const title = titleNode ? titleNode.textContent.trim() : "-";
        const price = priceNode ? priceNode.textContent.trim() : "-";

        const row = document.createElement("tr");
        [id, title, price].forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value; // textContent safely inserts XML text as text.
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      }
    }

    statusText.textContent = `${books.length} record${books.length === 1 ? "" : "s"} loaded successfully.`;
  } catch (error) {
    tableBody.innerHTML = '<tr><td colspan="3" class="empty error"></td></tr>';
    tableBody.querySelector(".error").textContent = error.message +
      " Run this project using a local web server (not by opening index.html directly).";
    statusText.textContent = "Unable to load XML data.";
    statusText.classList.add("error");
  }
}

reloadButton.addEventListener("click", loadBooks);
loadBooks();
