// class Book {
//     constructor(publicationDate,title,author){
//         this.publicationDate = publicationDate;
//         this.title = title;
//         this.author = author;
//     }
// }

// let books = [];

let string = `Publication Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

let booksCSVarray = string.split(",");

function extractDate(dateString) {
    let dateStringLength = dateString.length;
    let extractedDate = dateString.slice(dateStringLength - 10, dateStringLength);
    return extractedDate;
} 

function extractAuthor(authorString) {
    let authorStringLength = authorString.length;
    let extractedAuthor = authorString.slice(0, authorStringLength - 11);
    return extractedAuthor;
}

function truncate(string, maxLength){
    if(string.length > maxLength){
        shortendString = string.substring(0,maxLength)+"... | ";
        return shortendString;
    }
}

function truncateTitle(title) {
    return truncate(title, 26)
}

function truncateAuthor(author) {
    return truncate(author, 18)
}

let publicationDate = booksCSVarray[0].split(' ');
let pubDate = publicationDate[0].slice(0,3) + ' ' + publicationDate[1];

//let JRR = booksCSVarray[4].replace(/\d/gi,'').replace(/\//g,'').trim();


let headers = ('|' + pubDate.padStart(9, ' ').padEnd(12, ' ') + '|' + booksCSVarray[1].padStart(30,' ') + ' | ' + extractAuthor(booksCSVarray[2]).padEnd(22,' ') + ('|'));
let spacer = ('|' + '='.repeat(headers.length - 2) + '|');
let row1 = ('|' + extractDate(booksCSVarray[2]).padStart(11,' ').padEnd(12,' ') + '| ' + booksCSVarray[3].padStart(29,' ') + ' | ' + truncateAuthor(extractAuthor(booksCSVarray[4])));
let row2 = ('|' + extractDate(booksCSVarray[4]).padStart(11,' ').padEnd(12,' ') + '| ' + booksCSVarray[5].padStart(29,' ') + ' | ' + extractAuthor(booksCSVarray[6]) + ' |');
let row3 = ('|' + extractDate(booksCSVarray[6]).padStart(11,' ').padEnd(12,' ') + '| ' + truncateTitle(booksCSVarray[7]) + booksCSVarray[8].padStart(21,' ') + ' |');

console.log(`${headers}\n${spacer}\n${row1}\n${row2}\n${row3}`);