const express = require('express'); 
let books = require("./booksdb.js"); 
let isValid = require("./auth_users.js").isValid; 
let users = require("./auth_users.js").users; 

const public_users = express.Router(); 
public_users.post("/register", (req,res) => { 
    const username=req.query.username||req.body.username; 
    const password=req.query.password||req.body.password; 
    const userNew={username,password}; 
    users.push(userNew); 
    console.log(userNew); 
    res.send("User successfully created"); 
    console.log(users);
 }); 

public_users.get('/',function (req, res) { 
    let displayBooks=JSON.stringify(books,null,2); 
    res.send(displayBooks);
    
 }); 

 public_users.get('/isbn/:isbn',function (req, res) { 
    let isbn=(req.params.isbn); 
    if(isbn in books){ res.send(books[isbn]); } 
    else res.send("Nothing found") 
}); 
public_users.get('/author/:author',function (req, res) { 
    let author=req.params.author; console.log(author); 
    let details=Object.values(books); 
    console.log(details); 
    let new_books=[]; 
    details.forEach(detail=>{ if(detail.author===author){ 
        new_books.push(detail); } 
    }) ;
    res.send(new_books); 
});

public_users.get('/title/:title',function (req, res) { 
    let title=req.params.title; 
    let book_list=[]; 
    let details=Object.entries(books); 
    details.forEach((detail)=>{ 
        if(detail[1].title===title){ 
            console.log(detail); 
            book_list.push({isbn:detail[0],author:detail[1].author,reviews:detail[1].reviews}); 
        } }) 
        res.send({booksByTitle:book_list}); 
    }); 

public_users.get('/review/:isbn',function (req, res) { 
    let isbn=req.params.isbn; 
    if(isbn in books){ 
        let book=books[isbn]; 
        console.log(book); 
        res.send(book.reviews); 
    } else res.send("Nothing found") }); 
    
module.exports.general = public_users;
