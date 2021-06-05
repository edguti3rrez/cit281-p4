/*
    CIT 281 Project 5
    Name: Edwin Gutierrez
*/

// Imported module and packages for the server
const fs = require('fs');
const fastify = require('fastify') ();

const { getQuestions, getAnswers, getQuestionsAnswers, getQuestion, getAnswer, getQuestionAnswer, addQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer } = require('./p4-modules');

const listenIP = 'localhost';
const listenPort = 8080;

// Handles GET route and returns an object of all the questions
fastify.get("/cit/question", (req, res) => {
    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(
            {
                "error": "",
                "statusCode": 200,
                "questions": getQuestions()
            }
        );
});

// Handles GET route and returns an object of all the answers
fastify.get("/cit/answer", (req, res) => {
    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(
            {
                "error": "",
                "statusCode": 200,
                "answers": getAnswers()
            }
        );
});

// Handles GET route and returns copy of database objects
fastify.get("/cit/questionanswer", (req, res) => {
    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(
            {
                "error": "",
                "statusCode": 200,
                "questions_answers": getQuestionsAnswers()
            }
        );
});

// Takes a request parameter number and returns a question object if no error
fastify.get("/cit/question/:number", (req, res) => {
    let questionObj = getQuestion(req.params.number);
    let statusOfObj = 200;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (questionObj.error !== '') {
        statusOfObj = 404;
    }

    if (questionObj.error === '') {    
        res
            .code(200)
            .header("Content-Type", "application/json; charsetutf-8")
            .send(
                {
                    "error": questionObj.error,
                    "statusCode": statusOfObj,
                    "question": questionObj.question,
                    "number": questionObj.number
                }
            );
    }
});

// Takes a request parameter number and returns a answer object if no error
fastify.get("/cit/answer/:number", (req, res) => {
    let answerObj = getAnswer(req.params.number);
    let statusOfObj = 200;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (answerObj.error !== '') {
        statusOfObj = 404;
    }

    if (answerObj.error === '') {    
        res
            .code(200)
            .header("Content-Type", "application/json; charsetutf-8")
            .send(
                {
                    "error": answerObj.error,
                    "statusCode": statusOfObj,
                    "answer": answerObj.answer,
                    "number": answerObj.number
                }
            );
    }
});

// Takes a request parameter number and returns a question/answer object if no error
fastify.get("/cit/questionanswer/:number", (req, res) => {
    let questionAnswerObj = getQuestionAnswer(req.params.number);
    let statusOfObj = 200;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (questionAnswerObj.error !== '') {
        statusOfObj = 404;
    }

    if (questionAnswerObj.error === '') {    
        res
            .code(200)
            .header("Content-Type", "application/json; charsetutf-8")
            .send(
                {
                    "error": questionAnswerObj.error,
                    "statusCode": statusOfObj,
                    "question": questionAnswerObj.question,
                    "answer": questionAnswerObj.answer,
                    "number": questionAnswerObj.number
                }
            );
    }
});

// Handles unmatched URLs by simply returning error message
fastify.get("*", (req, res) => {
    res
        .code(404)
        .header("Content-Type", "application/json; charsetutf-8")
        .send({
            "error": "Route not found",
            "statusCode": 404
        });
});

// Handles adding a new question object from Postman body
fastify.post("/cit/question", (req, res) => {
    let addedQuestionAnswerObj = addQuestionAnswer(JSON.parse(req.body));
    let statusOfAddedObj = 201;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (addedQuestionAnswerObj.error !== '') {
        statusOfAddedObj = 404;
    }
    
    res
        .code(201)
        .header("Content-Type", "application/json; charsetutf-8")
        .send({
                "error": addedQuestionAnswerObj.error,
                "statusCode": statusOfAddedObj,
                "number": addedQuestionAnswerObj.number
            });
});


// Updates existing question objects using Postman
fastify.put("/cit/question", (req, res) => {
    let updatedQuestionAnswerObj = updateQuestionAnswer(JSON.parse(req.body));
    let statusOfUpdatedObj = 200;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (updatedQuestionAnswerObj.error !== '') {
        statusOfUpdatedObj = 404;
    }

    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send({
                "error": updatedQuestionAnswerObj.error,
                "statusCode": statusOfUpdatedObj,
                "number": updatedQuestionAnswerObj.number
            });
});

// Handles delete command to remove a questoin object from the database
fastify.delete("/cit/question/:number", (req, res) => {
    let deletedQuestionAnswerObj = deleteQuestionAnswer(JSON.parse(req.params.number));
    let statusOfDeletedObj = 200;

    // Will update the status code of sent object if the p4-module.js returns an error
    if (deletedQuestionAnswerObj.error !== '') {
        statusOfDeletedObj = 404;
    }

    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send({
                "error": deletedQuestionAnswerObj.error,
                "statusCode": statusOfDeletedObj,
                "number": deletedQuestionAnswerObj.number
            });
});

// Listens to entering the local IP and port to then display the webpage
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on http://${listenIP}:${listenPort}`); // test to make sure we're working
});