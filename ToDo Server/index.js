const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Signup = require('./Schemas/Signup');
const ToDos = require('./Schemas/ToDos');
const { ObjectId } = require('mongodb');

const port = 80;
const key = process.env.KEY;

const app = express();
db();

app.use(express.urlencoded({ extended: true })); //for MongoDB
app.use(express.json());
app.use(cors())
app.use(cookieParser());


app.post('/api/signup', async (req, res) => {
    let { username, email, password, confirmPassword } = req.body;
    try {
        let user = await Signup.findOne({ $or: [{ username }, { email }] });
        if (user) {
            res.status(403).send({ message: "User Already Exists" })
        }
        else if (password === confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            const secPass =  await bcrypt.hash(password, salt);

            user = new Signup({ username, email, password: secPass });
            await user.save();

            res.status(200).send({ message: "User Created Sucessfully!", username });
        }
        else {
            res.status(403).send({ message: "Passwords Don't Match" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        let user = await Signup.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "Incorrect username or password 1" });
        }

        let passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(404).send({ message: "Incorrect username or password 2" });
        }

        const token = jwt.sign(username, key);
        // res.cookie('token', 'token', {httpOnly:true, expires: new Date(Date.now() + 25892000000), path:'/'});
        res.status(200).send({ message: "Logged in Successfully", token });


    } catch (err) {
        console.log(err)
        res.status(500).send({ err });
    }
})


const auth = async (req, res, next) => {
    try {
        const encryptedToken = req.header("Authorization").split(' ')[1];
        // const encryptedToken = req.header("Authorization");
        // const encryptedToken = req.cookie('token');
        const username = jwt.verify(encryptedToken, key);
        if (!username) {
            return res.status(404).send({ message: "Forbidden" });
        }

        const user = await Signup.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: "Forbidden" });
        }
        req.user = username;
        next();

    } catch (err) {
        return res.status(500).send({ err });
    }
}

app.get('/api/todos/dashboard', auth, async (req, res) => {
    const username = req.user;
    try {

        const token = req.header("Authorization").split(' ')[1];
        const data = await ToDos.find({ username });
        return res.status(200).send({data});

    } catch (err) {
        return res.status(500).send({ err });
    }
})

app.post('/api/todos/newTodo', auth, async (req, res) => {
    let username = req.user;
    let { title, description, status } = req.body;

    try {

        const data = new ToDos({ username, title, description, status });
        await data.save();

        // const result = {title: data.title, description: data.description, status: data.status, _id: data._id};

        return res.status(200).send({data});

    } catch (err) {
        return res.status(500).send({ err });
    }
})

app.delete('/api/todos/deleteTodo/:todo', auth, async (req, res) => {
    try {

        // Attempt to find and delete the document
        const deletedToDo = await ToDos.findByIdAndDelete(req.params.todo);

        if (!deletedToDo) {
            // If `deletedToDo` is null, the document with the specified ID was not found
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(200).send({ deletedToDo });

    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/todos/updateTodo/:todo', auth, async (req, res)=>{
    try {
        
        const updatedToDo = await ToDos.findByIdAndUpdate(req.params.todo, req.body, {new: true});

        if(!updatedToDo){
            return res.status(404).send({error: 'ToDo not found'});
        }

        return res.status(200).send({updatedToDo});

    } catch (error) {

        return res.status(500).json({error});
        
    }
})



app.listen(port, () => {
    console.log(`Server Running Successfully on http://localhost:${port}`);
})