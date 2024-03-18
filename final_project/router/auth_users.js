const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];


const isValid = (username)=>{ 
    if(username)return true;
    }
    
const authenticatedUser = (username,password)=>{ 
        console.log(users);
        let auth_user=users.filter(user=>user.username===username&&user.password===password);
        if(auth_user.length>0)return true;
        else return false;
    }
    
regd_users.post("/login", (req,res) => {
        let username=req.body.username;
        let password=req.body.password;
        if(isValid(username)&&authenticatedUser(username,password)){
            let accessToken = jwt.sign({
                data: {username,password}
              }, 'access', { expiresIn: 60 * 60 });
              req.session.authorization = {
                accessToken
            }
            return res.status(200).send(accessToken);
        
        }
       else res.status(200).send("Not registered");
    });
        

regd_users.put("/review/:isbn", (req, res) => {
    let isbn=req.params.isbn;
    let book;
    console.log(isbn);
    if(isbn in books)book=books[isbn];
    console.log(`isbn is ${isbn}`);
    let review=req.query.review;
    book.reviews=(review);
    console.log(book);
    res.send("Review successfully added");
});

regd_users.delete("/review/:isbn", (req, res) => {
    let isbn=req.params.isbn;
    let book;
    if(isbn in books)book=books[isbn];
    book.reviews=[];
    console.log(book);
    res.send("Review successfully deleted");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
