import express from 'express';
import { Book } from '../models/bookModel.js';
import { SignUp } from '../models/signUpModel.js';

const router = express.Router();

//1. Route for Save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear||
            !request.body.amount||
            !request.body.quantity
        ) {
            return response.status(400).send({
                message: 'Send all required fields:title,author,publishYear,amount,quantity',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            amount: request.body.amount,
            quantity: request.body.quantity,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//2. Route for get all books from Database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(201).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//3. Route for get all books from Database by Id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//4. Route for update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear||
            !request.body.amount||
            !request.body.quantity
        ) {
            return response.status(400).send({
                message: 'Send all required fields title : title,author,publishYear,amount,quantity',

            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated succesfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//5. Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// 6. Route for Login
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.userName ||
            !request.body.email ||
            !request.body.password||
            !request.body.confirmPassword
        ) {
            return response.status(400).send({
                message: 'Send all required fields: userName, email, password, confirmPassword',
            });
        }
        const newSignUp = {
            userName: request.body.userName,
            email: request.body.email,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword,
        };

        const signUp = await SignUp.create(newSignUp);

        return response.status(201).send(signUp);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;