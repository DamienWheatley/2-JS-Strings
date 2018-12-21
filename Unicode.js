//Question 1

/* 

Quite stuck on this one.. I'm not even sure where to begin. I got this far and my brain just went into self-doubt mode - is putting it into an array the right way to go? How then 
am I supposed to set a character limit?- using Trim? array[0].trim(22)?

*/

let string = `Publication Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

let array = string.split(",");

console.log('|' + array[0] ) 

//Question 2

/* 
Some of the files are garbled because they are using a different encoding system. For instance, '/Unicode.1.html' and '/Unicode.2.html' use 'utf16le' encoding. 

First, Unicode.1 is written from the data received from the HTML.request and encoded in 'utfl16le' with a Byte Order Mark. 
The data is then read from '/Unicode.1.html' and written to '/Unicode.2.html', but the first character is removed using .slice(1) - this is removing the BOM ('\uFEFF'), 
which is fine in modern browsers that are able to read utf-16 by default but older versions do not have this capability (add-ins can be used) and as such are unable to
recognise characters from utf-16. This is shown when writing './Unicode.3.html' from '/Unicode.2.html', because Unicode.2 is encoded in utf16le without BOM, 
when Unicode.3 is written using 'utf8' it is unable to convert the additional characters (nor is it able to match the order the characters are written in) and 
instead displays "garbled" text. 

Notepad++, much like Chrome, has been developed to recognise utf-16, and as such is able to read it without the BOM.


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # Nice quote? # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                                                                                                                         #
#   Clause D98 of conformance (section 3.10) of the Unicode standard states, "The UTF-16 encoding scheme may or may not begin with a BOM. However, when there is no BOM,  #
#   and in the absence of a higher-level protocol, the byte order of the UTF-16 encoding scheme is big-endian."                                                           #
#                                                                                                                                                                         #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


*/


const https = require('https');
const fs = require('fs');
 
const options = {
    protocol: 'https:',
    host: 'en.wikipedia.org',
    path: '/wiki/Unicode'
};
 
const request = https.request(options, responseStream => {
    let htmlText = '';
    responseStream.on('data', chunk => {
        htmlText += chunk;
    });
    responseStream.on('end', () => {
        writeToFile('./Unicode.1.html', '\uFEFF' + htmlText, 'utf16le');
 
        const fileText = readFromFile('./Unicode.1.html', 'utf16le');
        writeToFile('./Unicode.2.html', fileText.slice(1), 'utf16le');
 
        const finalText = readFromFile('./Unicode.2.html', 'utf8');
        writeToFile('./Unicode.3.html', '\uFEFF' + finalText, 'utf16le');
    });
});
 
request.on('error', function (e) {
    console.error(e.message);
});
 
request.end();
 
function writeToFile(filePath, text, encoding) {
    fs.writeFileSync(filePath, text, { encoding: encoding });
}
 
function readFromFile(filePath, encoding) {
    return fs.readFileSync(filePath, { encoding: encoding });
}