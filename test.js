class Book {
    constructor(publicationDate,title,author){
        this.publicationDate = shortenDate(publicationDate);
        this.title = truncateTitle(title);
        this.author = truncateAuthor(author);
    }
}

const string = `Publication Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

function truncate(string, maxLength){
    if(string.length > maxLength){
        shortendString = string.substring(0,maxLength)+"... | ";
        return shortendString;
    } else {
        return string;
    }
}

function truncateTitle(title) {
    return truncate(title, 26);
}

function truncateAuthor(author){
    return truncate(author, 18);
}

function shortenDate(date){
    if(date.length > 10){
        date = 'Pub Date';
        return date;
    } else {
        return date;
    }
}

function splitCSVarray(string){
    let books = [];
    let booksCSVarray = string.split("\n");

    booksCSVarray.forEach(CSVbook => {
        let book = CSVbook.split(",");
        books.push(book);
    })   
    return books;
}

let books = splitCSVarray(string);

let bookClass = [];

function createBook(books){

    for(i = 0; i <= books[0].length; i++){
        let book = books[i];
        
        let newDate = book[0];
        let newTitle = book[1];
        let newAuthor = book[2];

        let newBook = new Book (newDate,newTitle,newAuthor);
        bookClass.push(newBook);
    }
}


function displayBooks() {
    for(i = 1; i <= books.length - 1; i++) {
        console.log(displayedBooks = ('|' + bookClass[i].publicationDate.padStart(11,' ').padEnd(12,' ') + '| ' + bookClass[i].title.padStart(29,' ') + ' | ' + bookClass[i].author));
    }
}

createBook(books);

let headers = ('|' + bookClass[0].publicationDate.padStart(9, ' ').padEnd(12, ' ') + '|' + bookClass[0].title.padStart(30,' ') + ' | ' + bookClass[0].author.padEnd(22,' ') + ('|'));
let spacer = ('|' + '='.repeat(headers.length - 2) + '|');
let row1 = displayBooks();


// let row3 = ('|' + extractDate(booksCSVarray[6]).padStart(11,' ').padEnd(12,' ') + '| ' + truncateTitle(booksCSVarray[7]) + booksCSVarray[8].padStart(21,' ') + ' |');

console.log(`${headers}\n${spacer}\n${row1}`);