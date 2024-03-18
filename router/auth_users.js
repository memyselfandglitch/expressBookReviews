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

// regd_users.use("/", (req,res,next)=>{
//         // Middleware which tells that the user is authenticated or not
//            if(req.session.authorization) {
//                let token = req.session.authorization['accessToken']; // Access Token
//                console.log(token);
//                jwt.verify(token, "access",(err,user)=>{
//                    if(!err){
//                        req.user = user;
//                        next();
//                    }
//                    else{
//                        return res.status(403).json({message: "User not authenticated"})
//                    }
//                 });
//             } else {
//                 return res.status(403).json({message: "User not logged in"})
//             }
//     });
        

regd_users.put("/auth/review/:isbn", (req, res) => {
    console.log(req);
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

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
