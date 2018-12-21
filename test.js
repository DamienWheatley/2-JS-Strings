const moment = require('moment');

//Create class to contain books and allow selection of unique properties
class Book {
    constructor(publicationDate,title,author){
        this.publicationDate = formatDate(publicationDate);
        this.title = formatTitle(title);
        this.author = formatAuthor(author);
    }
}

const string = `Publication Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

//shortens "Publication Date" to "Pub Date" and changes date format to DD MMM YYYY, then adds padding
function formatDate(date){
    if(date.length > 11){
        pubDate = 'Pub Date';
        return padLeft(padRight(pubDate, 12), 13);
    } else {
        function convertDateFormat(date){
            let dates = [];
            let splitDatesArray = date.split('/'||'-');
        
            splitDatesArray.forEach(splitDates => {
                let splitDate = splitDates.split(",");
                dates.push(splitDate);
            })
            
            let day = dates[0];
            let month = dates[1];
            let year = dates[2];
        
            let mmDDyyyy = month + '/' + day + '/' + year;
        
            return mmDDyyyy;
        }
        let mmDDyyyy = convertDateFormat(date);
        let formattedDate = moment(mmDDyyyy).format('DD MMM YYYY');
        return padLeft(padRight(formattedDate, 12), 13);
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

function truncate(string, maxLength){
    if(string.length > maxLength){
        shortendString = string.substring(0,maxLength)+"...";
        return shortendString;
    } else {
        return string;
    }
}

function padLeft(string, padding){
    return string.padStart(padding, ' ');
}

function padRight(string, padding){
    return string.padEnd(padding, ' ');
}

function formatTitle(title) {
    if(title.length > 26){
        return truncate(title, 26);
    } else {
        return padLeft(title, 29);
    }    
}

function formatAuthor(author){
    if(author.length > 23){
        return truncate(author, 18);
    } else if(author === 'Authors'){
        return padRight(author, 21);
    } else {
        return padLeft(author, 21);
    }
}

function displayBooks() {
    let headers = ('|' + bookClass[0].publicationDate + '|' + bookClass[0].title.padEnd(30,' ') + ' | ' + bookClass[0].author + (' |'));
    let spacer = ('|' + '='.repeat(headers.length - 2) + '|');
    console.log(`${headers}\n${spacer}`);
    for(i = 1; i <= books.length - 1; i++) {
        console.log('|' + bookClass[i].publicationDate + '| ' + bookClass[i].title + ' | ' + bookClass[i].author + ' |');
    }
}

createBook(books);

displayBooks();
