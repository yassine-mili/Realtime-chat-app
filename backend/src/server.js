//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT);

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/auth/signup", (req, res) => {
    res.send("Signup endpoint");
})

app.get("/api/auth/login", (req, res) => {
    res.send("Login endpoint");
})

app.get("/api/auth/logout", (req, res) => {
    res.send("Signup endpoint");
})


app.listen(PORT, () => console.log("Server running on port: " + PORT));


