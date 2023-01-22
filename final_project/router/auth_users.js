const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  const user = users.filter(u => u.username == username)
  if (user.length > 0) {
    return false
  }
  return true
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  const [user] = users.filter(u => u.username == username)
  const isValidPassword = user.password == password
  if (isValidPassword) {
    return true
  }
  return false
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here

  const { username, password } = req.body
  try {
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: "Bad request!. username / password not provided" })
    }

    if (authenticatedUser(username, password)) {

      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken, username
      }
      return res.status(200).json({ code: 200, message: `${username} logged in!` })
    }
    return res.status(401).json({ code: 401, message: 'username and password does not match! check again' })
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message })
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
