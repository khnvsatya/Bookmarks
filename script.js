const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameE1 = document.getElementById("website-name");
const websiteUrlE1 = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

function showModal() {
  modal.classList.add("show-modal");
  websiteNameE1.focus();
}

// modal event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", (e) => {
  modal.classList.remove("show-modal");
});

//validate form

function Validate(name, urlvalue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const regex = new RegExp(expression);

  if (!name || !urlvalue) {
    alert("provide both values before proceed");
    return false;
  }
  if (!urlvalue.match(regex)) {
    alert("provide proper url");
    return false;
  }

  //   if (urlvalue.match(regex)) {
  //     alert("you found match");
  //   }

  return true;
}

window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

//buiild bookmarks DOM

function buildbookmarks() {
  bookmarksContainer.textContent = " ";

  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const item = document.createElement("div");
    item.classList.add("item");

    const closeicon = document.createElement("i");
    closeicon.classList.add("fa", "fa-times");
    closeicon.setAttribute("title", "delete Bokkmark");
    closeicon.setAttribute("onclick", `deleteBookmark('${url}')`);

    const linkinfo = document.createElement("div");
    linkinfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );

    favicon.setAttribute("alt", "Favicon");

    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);

    link.setAttribute("target", "_blank");
    link.textContent = name;

    linkinfo.append(favicon, link);
    item.append(closeicon, linkinfo);
    bookmarksContainer.appendChild(item);
  });
}

// fetch bookmarks

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "sampleName",
        url: "https://sampleurl.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //   console.log(bookmarks);
  buildbookmarks();
}

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, i);
    }
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

//handle data from Form

function storeBookmark(e) {
  e.preventDefault();
  const name = websiteNameE1.value;
  let urlvalue = websiteUrlE1.value;
  if (!urlvalue.includes("http://", "https://")) {
    urlvalue = `https://${urlvalue}`;
  }
  if (!Validate(name, urlvalue)) {
    return false;
  }

  const bookmark = {
    name: name,
    url: urlvalue,
  };

  bookmarks.push(bookmark);
  //   console.log(JSON.stringify(bookmarks));
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameE1.focus();
}

//Event Listner

bookmarkForm.addEventListener("submit", storeBookmark);
fetchBookmarks();
