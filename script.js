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

        const read = document.createElement('p');
        read.classList.add('read');
        read.innerHTML = book.read ? 'Already read? \&#x2713' : 'Already read? \&#x2717';
        
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(read);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

displayBooks();