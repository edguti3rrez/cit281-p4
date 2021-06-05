/*
    CIT 281 Project 5
    Name: Edwin Gutierrez
*/

const { data } = require('./p4-data.js');

// Returns an array of questions from the p4-data.js information
function getQuestions() {
    let questionsArray = [];

    for (const questionProperty of data) {
        questionsArray.push(questionProperty.question);
    }

    return questionsArray;
}

// Returns an array of the answers from the database file (p4-data.js)
function getAnswers() {
    let answersArray = [];

    for (const answerProperty of data) {
        answersArray.push(answerProperty.answer);
    }

    return answersArray;
}

// Makes a deep copy of the database infromation using the JSON method
function getQuestionsAnswers() {
    const questionsAndAnswersObject = JSON.parse(JSON.stringify(data)); // Clones the original data
    return questionsAndAnswersObject;
}

// grabs the question corresponding to the number passed in, will also display errors if any
function getQuestion(number = "") {
    const listOfErrors = [
        'Question number must be an integer',
        'Question number must be >= 1',
        'Question number must be less than the number of questions (3)'
    ];

    let indexingNumber = parseInt(number);
    let questionObject = {};

    for (const obj of data) {
        if ('Q' + number === obj.question) {
            questionObject = {
                error: '',
                question: obj.question,
                number: indexingNumber
            };
        }
    }

    // Set of if statements in case of errors!
    if (Number.isInteger(indexingNumber) === false) {
        questionObject = {
            error: listOfErrors[0],
            question: '',
            number: ''
        };
    } else if (indexingNumber < 1) {
        questionObject = {
            error: listOfErrors[1],
            question: '',
            number: ''
        };
    } else if (indexingNumber > 3) {
        questionObject = {
            error: listOfErrors[2],
            question: '',
            number: ''
        };
    }

    return questionObject;
}

// Will return an object with the answer corresponding to the number passed in, handles errors as well
function getAnswer(number = "") {
    const listOfErrors = [
        'Answer number must be an integer',
        'Answer number must be >= 1',
        'Answer number must be less than the number of questions (3)'
    ];

    let indexingNumber = parseInt(number);
    let answerObject = {};

    for (const obj of data) {
        if ('A' + number === obj.answer) {
            answerObject = {
                error: '',
                answer: obj.answer,
                number: indexingNumber
            };
        }
    }

    // Set of if statements in case of errors!
    if (Number.isInteger(indexingNumber) === false) {
        answerObject = {
            error: listOfErrors[0],
            answer: '',
            number: ''
        };
    } else if (indexingNumber < 1) {
        answerObject = {
            error: listOfErrors[1],
            answer: '',
            number: ''
        };
    } else if (indexingNumber > 3) {
        answerObject = {
            error: listOfErrors[2],
            answer: '',
            number: ''
        };
    }

    return answerObject;
}

// Grabs both the question and answer to a corresponding parameter value
function getQuestionAnswer(number = "") {
    let questionObj = getQuestion(number); // Uses the getQuestion function for easier work
    let questionAndAnswerObj = {};

    if (questionObj.error === '') {
        questionAndAnswerObj = {
            ...questionObj, // Combines objects for ease
            answer: 'A' + number
        }
    } else {
        questionAndAnswerObj = {
            ...questionObj,
            answer: ''
        };
    }

    return questionAndAnswerObj;
}

// Will add new questions to the database!
function addQuestionAnswer(info = {}) {
    let postMessage = {};

    const { question, answer } = info;

    if (answer === undefined && question === undefined) {
        postMessage = {
            error: 'Object question property required', // Error when both variables undefined
            message: '',
            number: -1
        };
        return postMessage;

    } else if (answer === undefined) {
        postMessage = {
            error: 'Object answer property required', // Error when answer ONLY is undefined
            message: '',
            number: -1
        };
        return postMessage;

    } else if (question === undefined) {
        postMessage = {
            error: 'Object question property required', // Error when Question ONLY is undefined
            message: '',
            number: -1
        };
        return postMessage;

    // Will add the new question object as long as question and answer object parameters are defined
    } else if (question !== undefined && answer !== undefined) {
        postMessage = {
            error: '',
            message: 'Question added',
            number: data.length + 1
        };
        data.push({question, answer});
        return postMessage;
    }
}

// Will update existing question objects
function updateQuestionAnswer(info = {}) {
    let putMessage = {};

    const { number, question, answer } = info;

    // Will present error if question and answer values are not included
    if (question === undefined || answer === undefined) {
        putMessage = {
            error: 'Object question property or answer property required',
            message: '',
            number: ''
        };
        return putMessage;
        
    // Will error if number is not provided
    } else if (number === undefined) {
        putMessage = {
            error: 'Object number property must be a valid integer',
            message: '',
            number: ''
        };
        return putMessage;

    // Will present corrected data object along with a message showing correction
    } else if (number !== undefined && question !== undefined && answer !== undefined) {
        putMessage = { 
            error: '',
            message: `Question ${number} updated`, 
            number: number 
        };

        data[number - 1].question = question;
        data[number - 1].answer = answer;

        return putMessage;
    }
    return data;
}

// Will delete question objects
function deleteQuestionAnswer(info = "") { // Changed the default info to "" not {}
    let indexingNumber = parseInt(info);
    let deleteMessage = {};

    // Handles potential errors when deleted a question object
    if (Number.isInteger(indexingNumber) === false) {
        deleteMessage = {
            error: 'Question/answer number must be an integer',
            message: '',
            number: ''
        };
        return deleteMessage;

    } else if (indexingNumber < 1) {
        deleteMessage = {
            error: 'Question/answer number must be >= 1',
            message: '',
            number: ''
        };
        return deleteMessage;
        
    } else if (indexingNumber > data.length) {
        deleteMessage = {
            error: `Question/answer number must be less than the number of questions (${data.length})`,
            message: '',
            number: ''
        };
        return deleteMessage;
        
    // Is the positive response, when an object is deleted without error
    } else if (Number.isInteger(indexingNumber) && indexingNumber >= 1 && indexingNumber <= data.length) {
        data.splice(indexingNumber - 1, 1);
        deleteMessage = {
            error: '',
            message: `Question ${indexingNumber} deleted`,
            number: indexingNumber
        };
        return deleteMessage;
        
    }
    return data;

}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = false;   // Extra credit

// getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
}

// getAnswer()
if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
}

// getQuestionAnswer()
if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
}

// addQuestionAnswer()
if (testAdd) {
    testing(
      "addQuestionAnswer",
      { d: "()", f: addQuestionAnswer() },
      { d: "({})", f: addQuestionAnswer({}) },
      { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
      { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
      {
        d: '(question: "Q4", answer: "A4")',
        f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
      }
    );
}

// updateQuestionAnswer()
if (testUpdate) {
    testing(
      "updateQuestionAnswer",
      { d: "()", f: updateQuestionAnswer() },
      { d: "({})", f: updateQuestionAnswer({}) },
      { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
      { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
      {
        d: '(question: "Q1U", answer: "A1U")',
        f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
      },
      {
        d: '(number: 1, question: "Q1U", answer: "A1U")',
        f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
      }
    );
    console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
    testing(
      "deleteQuestionAnswer",
      { d: "()", f: deleteQuestionAnswer() },
      { d: "(0)", f: deleteQuestionAnswer(0) },
      { d: "(1)", f: deleteQuestionAnswer(1) },
      { d: "(0)", f: deleteQuestionAnswer(4) }
    );
    console.log(data);
  }
  

  module.exports = { 
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer
  }