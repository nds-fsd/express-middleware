const express = require('express');

const addDateMiddleware = (req, res, next) => {
    console.log('Request Type:', req.method);
    req.requestInstant = new Date();
    next();
};

const validateTodo = (req, res, next) => {
    console.log('Request Type:', req.method);
    const todo = req.body;
    
    if (todo.name === undefined || todo.name.length === 0) {
        res.status(400).send({message: 'name required'});
        return;
    }
    if (todo.description === undefined || todo.description.length === 0) {
        res.status(400).send({message: 'description required'});
        return;
    }
    next();
};


module.exports = {
    addDateMiddleware,
    validateTodo,
}