var inquirer = require("inquirer");
var basic = require('./basicCards.js');
var ClozeCard = require("./ClozeCard.js");
var fs = require("fs");

inquirer.prompt({
    type: "list",
    name: "command",
    message: "What would you like to do?",
    choices: [
        { name: "Add a Basic flashcard" },
        { name: "Add a Cloze flashcard" },
        { name: "Show all flashcards" }
    ]

}).then(function(answers) {
    if (answers.command === "Add a Basic flashcard") {
        addcard();
    } else if (answers.command === "Show all flashcards") {
        readcards();
    }
    else if (answers.command === "Add a Cloze flashcard") {
        addCloze();
	}

});

function addCloze(){
	// var newCloze = new ClozeCard("Today is Saturday", "Saturday");
	// console.log(newCloze);
	inquirer.prompt([{
		name: "full",
		message: "What is the statement?",
	}, {
		type: "input",
		name: "answer",
		message: "What is the answer?",
	}]).then(function(answers) {
        var newCloze = new ClozeCard(answers.full, answers.answer);
        newCloze.add();
        console.log("Question and answer has been added!")

    })
}

function addcard() {
    inquirer.prompt([{
        name: "front",
        message: "What is the question?",

    }, {
        type: "input",
        name: "back",
        message: "What is the answer?",
    }]).then(function(answers) {
        var newBasic = new basic(answers.front, answers.back);
        newBasic.add();
        console.log("Question and answer has been added!")

    })
}

function readcards() {

    fs.readFile("allcards.txt", 'utf8', function(error, data) {

            if (error) {
                console.log(error);
            }
            var questions = data.split(';');
            console.log(questions);

            // var notBlank = function(value) {
            //     return value;
            // };
            // questions = questions.filter(notBlank);
            // var count = 0;
            // showQuestion(questions, count);

            //to make quiz, read all the data in allcard.txt
            // then send the different objects into an array
            // search by each one, first checking whether it is a basic or cloze type
            // if basic, "front" is the question portion
            // if cloze, "partial" is the question portion

        }

    )
}

var showQuestion = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    questionText = parsedQuestion.front;
    correctReponse = parsedQuestion.back;


 inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        } else {
            console.log('Wrong!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        }
    });
}