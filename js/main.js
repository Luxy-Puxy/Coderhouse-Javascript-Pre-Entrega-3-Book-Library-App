// This const will store book objects
let books = [];

// add a book to the books array - user will fill in the information on form fields
function addBook() {
  const bookName = document.getElementById("book-name").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookGenre = document.getElementById("book-genre").value;

  if (bookName === "" || bookAuthor === "" || bookGenre === "") {
    // display error message to user in the error-message div
    document.getElementById("error-message").textContent = "Please fill all the fields below";
    return;
  }

  // clear the error message
  document.getElementById("error-message").textContent = "";

  // add the book to the books array and save and render the books
  books.push({ name: bookName, author: bookAuthor, genre: bookGenre });
  saveBooks();
  renderBooks();
}

// delete a book from the books array - Will be triggered when the user clicks on any list item
function deleteBook(index) {
  // show the confirm-message div
  document.getElementById("confirm-message").style.display = "block";
  // save the index of the book to be deleted in a global variable
  window.deleteIndex = index;
}

// confirm the delete action
function confirmDelete() {
  // hide the confirm-message div
  document.getElementById("confirm-message").style.display = "none";
  // delete the book
  books.splice(window.deleteIndex, 1);
  saveBooks();
  renderBooks();
}

// cancel the delete action
function cancelDelete() {
  // hide the confirm message div
  document.getElementById("confirm-message").style.display = "none";
}

// save the books array to localStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// load the books array from localStorage
function loadBooks() {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) {
    books = JSON.parse(savedBooks);
  }
}

// render the books array to index
function renderBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  // create list
  const ol = document.createElement("ol");

  // iterate over the books array
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${book.name} by ${book.author} (${book.genre})`;
    // This function will delete the book contained on the list element when clicked
    li.onclick = () => deleteBook(index);

    // add the li
    ol.appendChild(li);
  });

  // add the ol to the book-list div
  bookList.appendChild(ol);
}

// load the books from localStorage when the page loads
loadBooks();

// render the books to the page
renderBooks();
