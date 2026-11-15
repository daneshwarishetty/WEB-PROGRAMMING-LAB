const books = [
  {
    title: "Killing Floor", year: "1997", author: "Lee Child",
    genre: "Crime thriller", publisher: "Putnam",
    description: "Jack Reacher arrives in the small town of Margrave, Georgia, where he is arrested for a murder he did not commit. He sets out to uncover the truth."
  },
  {
    title: "Die Trying", year: "1998", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "Jack Reacher is abducted along with a young woman in Chicago. Their captors have a dangerous plan, and Reacher must find a way to stop it."
  },
  {
    title: "Tripwire", year: "1999", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "Reacher is working in Key West when a private investigator looking for him is found dead. The investigation draws Reacher into a case connected to his past."
  },
  {
    title: "The Visitor (Running Blind)", year: "2000", author: "Lee Child",
    genre: "Crime thriller", publisher: "Bantam Press",
    description: "A series of murders involving women who served in the military brings Reacher into an unsettling investigation."
  },
  {
    title: "Echo Burning", year: "2001", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "While travelling through Texas, Reacher accepts a ride from a woman who asks him for help with a troubling situation at home."
  },
  {
    title: "Without Fail", year: "2002", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "Reacher is asked to test the security arrangements protecting the Vice President-elect and discovers a credible threat."
  },
  {
    title: "Persuader", year: "2003", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "Reacher goes undercover to investigate a criminal operation and confronts a person from his past."
  },
  {
    title: "The Enemy", year: "2004", author: "Lee Child",
    genre: "Military thriller", publisher: "Bantam Press",
    description: "Set in 1990, this novel follows Reacher during his years as a military police officer, before the events of the earlier novels."
  },
  {
    title: "One Shot", year: "2005", author: "Lee Child",
    genre: "Crime thriller", publisher: "Bantam Press",
    description: "A sniper is accused of killing five people. Reacher is brought in to examine the evidence and uncover what really happened."
  },
  {
    title: "The Hard Way", year: "2006", author: "Lee Child",
    genre: "Thriller", publisher: "Bantam Press",
    description: "Reacher is drawn into a kidnapping investigation after a wealthy businessman asks him to help find his missing family."
  }
];

const coverCache = new Map();

async function findCover(book) {
  if (coverCache.has(book.title)) return coverCache.get(book.title);

  const query = encodeURIComponent(`title:${book.title} author:Lee Child`);
  const apiUrl = `https://openlibrary.org/search.json?q=${query}&limit=5&fields=title,author_name,cover_i`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Cover lookup failed");
    const data = await response.json();
    const match = (data.docs || []).find(item =>
      item.cover_i && (item.author_name || []).some(name => name.toLowerCase().includes("lee child"))
    ) || (data.docs || []).find(item => item.cover_i);
    const url = match ? `https://covers.openlibrary.org/b/id/${match.cover_i}-L.jpg` : null;
    coverCache.set(book.title, url);
    return url;
  } catch (error) {
    coverCache.set(book.title, null);
    return null;
  }
}

function makeCoverFallback(book) {
  const cover = document.createElement("div");
  cover.className = "cover-placeholder";
  const author = document.createElement("small");
  author.textContent = "JACK REACHER";
  const title = document.createElement("strong");
  title.textContent = book.title.toUpperCase();
  const byline = document.createElement("small");
  byline.textContent = "LEE CHILD";
  cover.append(author, title, byline);
  return cover;
}

async function makeCoverElement(book, className) {
  const imageUrl = await findCover(book);
  if (imageUrl) {
    const img = document.createElement("img");
    img.className = className || "";
    img.src = imageUrl;
    img.alt = `${book.title} book cover`;
    img.loading = "lazy";
    img.onerror = () => {
      const fallback = makeCoverFallback(book);
      img.replaceWith(fallback);
    };
    return img;
  }
  return makeCoverFallback(book);
}

// Home page: create the clickable list and cover gallery.
const bookList = document.getElementById("book-list");
const gallery = document.getElementById("cover-gallery");

if (bookList && gallery) {
  books.forEach((book, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `book.html?id=${index}`;
    link.textContent = book.title;
    li.appendChild(link);
    bookList.appendChild(li);
  });

  (async () => {
    gallery.innerHTML = "";
    for (let index = 0; index < books.length; index++) {
      const book = books[index];
      const link = document.createElement("a");
      link.className = "cover-link";
      link.href = `book.html?id=${index}`;
      const cover = await makeCoverElement(book, "gallery-cover");
      link.appendChild(cover);
      const label = document.createElement("span");
      label.textContent = book.title;
      link.appendChild(label);
      gallery.appendChild(link);
    }
  })();
}

const details = document.getElementById("book-details");

if (details) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const book = Number.isInteger(id) && id >= 0 && id < books.length ? books[id] : null;

  if (!book) {
    details.textContent = "Book not found. Please return to the home page and select a book.";
  } else {
    document.title = `${book.title} - Book Information`;
    details.innerHTML = "";

    const imageArea = document.createElement("div");
    const copy = document.createElement("section");
    copy.className = "details-copy";

    const cover = awaitCover(book);
    imageArea.appendChild(cover);
    details.append(imageArea, copy);

    const heading = document.createElement("h2");
    heading.textContent = book.title;
    copy.appendChild(heading);

    const about = document.createElement("h3");
    about.textContent = "About the Edition";
    copy.appendChild(about);

    const metadata = document.createElement("ul");
    metadata.className = "metadata";
    [
      ["Originally published", book.year],
      ["Author", book.author],
      ["Genre", book.genre],
      ["Publisher", book.publisher]
    ].forEach(([label, value]) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = `${label}: `;
      li.append(strong, document.createTextNode(value));
      metadata.appendChild(li);
    });
    copy.appendChild(metadata);

    const descriptionSection = document.createElement("div");
    descriptionSection.className = "description";
    const descriptionHeading = document.createElement("h3");
    descriptionHeading.textContent = "Description (Summary)";
    const paragraph = document.createElement("p");
    paragraph.textContent = book.description;
    descriptionSection.append(descriptionHeading, paragraph);
    copy.appendChild(descriptionSection);
  }
}

function awaitCover(book) {
  const wrapper = document.createElement("div");
  wrapper.className = "detail-cover-wrap";
  const placeholder = makeCoverFallback(book);
  placeholder.classList.add("detail-cover");
  wrapper.appendChild(placeholder);

  findCover(book).then(url => {
    if (!url) return;
    const img = document.createElement("img");
    img.className = "detail-cover";
    img.src = url;
    img.alt = `${book.title} book cover`;
    img.onerror = () => img.replaceWith(makeCoverFallback(book));
    wrapper.replaceChildren(img);
  });
  return wrapper;
}
