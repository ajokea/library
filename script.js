const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
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

        const readDiv = document.createElement('div');
        const read = document.createElement('p');
        read.classList.add('read');
        read.innerHTML = book.read ? 'Read' : 'Unread';

        const readButton = document.createElement('button');
        readButton.classList.add('read-book')
        readButton.textContent = book.read ? 'Not read it?' : 'Read it?';
        readDiv.appendChild(read);
        readDiv.appendChild(readButton);
        
        const buttonDiv = document.createElement('div');
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-book');
        removeButton.textContent = 'Remove';
        buttonDiv.appendChild(removeButton);

        bookInfo2.appendChild(readDiv);
        bookInfo2.appendChild(buttonDiv);

        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(bookInfo2);
    }
}

const newBookButton = document.getElementById('new-book');
const form = document.querySelector('form');

const body = document.body;
const backdrop = document.createElement('div');
backdrop.className = 'backdrop';

newBookButton.addEventListener('click', () => {
    body.appendChild(backdrop);
    form.style.display = "block";
    form.style.zIndex = 1
    form.reset();
});

const cancelBookButton = document.getElementById('cancel-book');
cancelBookButton.addEventListener('click', () => {
    form.style.display = "none";
    body.removeChild(backdrop);
    form.reset();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const bookData = Object.fromEntries(formData);

    let bookTitle = bookData['book-title'];
    let bookAuthor = bookData['book-author'];
    let bookPages = bookData['book-pages'];
    let readBook = bookData['book-read'] === "no" ? false : bookData['book-read'] === 'yes' ? true : '';

    const validBook = bookTitle && bookAuthor && bookPages;

    if (validBook) {
        addBookToLibrary(bookTitle, bookAuthor, bookPages, readBook);
        displayBooks();
        form.style.display = "none";
        body.removeChild(backdrop);
    } else {
    }
});

bookDisplay.addEventListener('click', (event) => {
    if (event.target.matches('.remove-book')) {
        let book = event.target.parentElement.parentElement.parentElement;
        let index = book.dataset.index;
        myLibrary.splice(index, 1);
        displayBooks();
    }
});

bookDisplay.addEventListener('click', (event) => {
    if (event.target.matches('.read-book')) {
        let book = event.target.parentElement.parentElement.parentElement;
        let index = book.dataset.index;
        myLibrary[index].toggleReadStatus();
        displayBooks();
    }
});