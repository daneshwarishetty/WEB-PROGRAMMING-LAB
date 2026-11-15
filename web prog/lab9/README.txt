LAB 9 - READ DATA FROM XML AND DISPLAY IT IN TABULAR FORMAT

Files included:
- index.html : Web page structure
- style.css  : Page and table styling
- script.js  : Fetches books.xml, parses it using DOMParser, and displays rows
- books.xml  : Sample XML data used by the page

HOW TO RUN:
1. Extract the ZIP file.
2. Open the extracted folder in Visual Studio Code.
3. Start a local web server (for example, install/use the Live Server extension).
4. Right-click index.html and choose "Open with Live Server".
5. The book records from books.xml will appear in the table.

IMPORTANT:
Use a local HTTP server rather than opening index.html directly as a file.
Modern browsers may block fetch() requests from file:// pages.

You can edit books.xml to add, remove, or change book records. Keep the XML structure:
<book id="...">
  <title>Book title</title>
  <price>Price</price>
</book>
