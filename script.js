const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const bookDisplay = document.querySelector('.book-display');

function displayBooks() {
    bookDisplay.innerHTML = '';
    
    for (let book of myLibrary) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', myLibrary.indexOf(book));
        bookDisplay.appendChild(bookDiv);

        const bookInfo = document.createElement('div');
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = book.title;
        
        const author = document.createElement('p');
        author.classList.add('author')
        author.textContent = book.author;
        
        const pages = document.createElement('p');
        pages.classList.add('pages')
        pages.textContent = `${book.pages} pages`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);

        const bookInfo2 = document.createElement('div');
        const buttonDiv = document.createElement('div');
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-book');
        removeButton.textContent = 'Remove';
        buttonDiv.appendChild(removeButton);

        const read = document.createElement('p');
        read.classList.add('read');
        read.innerHTML = book.read ? 'Already read? \&#x2713' : 'Already read? \&#x2717';
        
        bookInfo2.appendChild(buttonDiv);
        bookInfo2.appendChild(read);

        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(bookInfo2);
    }
}

const newBookButton = document.getElementById('new-book');
const form = document.querySelector('form');

newBookButton.addEventListener('click', () => {
    if (form.style.display === "grid") {
        form.style.display = "none";
    } else {
        form.style.display = "grid";
    }
    form.reset();
});

const addBookButton = document.getElementById('add-book');
addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const bookData = Object.fromEntries(formData);

    let bookTitle = bookData['book-title'];
    let bookAuthor = bookData['book-author'];
    let bookPages = bookData['book-pages'];
    let readBook = bookData['book-read'] === "no" ? false : true;

    const validBook = bookTitle && bookAuthor && bookPages;

    if (validBook) {
        addBookToLibrary(bookTitle, bookAuthor, bookPages, readBook);
        displayBooks();
    }
    
    form.reset();
    form.style.display = "none";
});

bookDisplay.addEventListener('click', (event) => {
    if (event.target.matches('.remove-book')) {
        let book = event.target.parentElement.parentElement.parentElement;
        let index = book.dataset.index;
        myLibrary.splice(index, 1);
        displayBooks();
    }
});