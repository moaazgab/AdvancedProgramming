function Question(que, choices, answer) {
    this.que = que;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer == choice;
}

function Quiz(questions) {
    this.score = 0;
    this.mistake = 0;
    this.questions = questions;
    this.questionIndex = -1;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (id, answer, correctButtonNumber) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        var scoreHTML = "";
        scoreHTML = scoreHTML + ("Correct: " + quiz.score);
        document.getElementById("crrScore").innerHTML = scoreHTML;
        document.getElementById(id).style.background = "#00ff00";
    } else {
        this.mistake++;
        var mistakeHTML = "";
        mistakeHTML = mistakeHTML + ("Wrong: " + quiz.mistake);
        document.getElementById("wrngScore").innerHTML = mistakeHTML;
        document.getElementById(id).style.background = "#ff0000";
        // show correct answer
        document.getElementById("btn" + correctButtonNumber).style.background = "#00ff00";
    }
}

Quiz.prototype.increaseQuesIndex = function () {
    this.questionIndex++;
}

Quiz.prototype.endGame = function () {
    return this.questionIndex == 10;
}

function resetBtnBackgroundColor(){
    document.getElementById("btn0").style.background = "#D3D3D3";
    document.getElementById("btn1").style.background = "#D3D3D3";
    document.getElementById("btn2").style.background = "#D3D3D3";
    document.getElementById("btn3").style.background = "#D3D3D3";
}

const waitTime = 3000;

function findCorrectButton(choices){
    for (var i = 0; i < choices.length; i++) {
        if (choices[i] == quiz.getQuestionIndex().answer) {
            return i;
        }
    }
}
function run() {
    resetBtnBackgroundColor();
    quiz.increaseQuesIndex();
    //console.log("question is: ", quiz.getQuestionIndex());
    if (quiz.endGame()) {
        message();
    } else {
        document.getElementById("question").innerHTML = quiz.getQuestionIndex().que;
        var choices = quiz.getQuestionIndex().choices;
        var btn = findCorrectButton(choices);
        for (var i = 0; i < choices.length; i++) {
            document.getElementById("choice" + i).innerHTML = choices[i];
            guess("btn" + i, choices[i], btn);
        }
        qcount();
    }
};
var timeoutID;
function wait(time) {
    timeoutID = setTimeout(function () {
        runController(0);
    }, time);
}

// if param. equals 1 then run() called from html
// else it's called from timeOut()
function runController(quick) {
    // if run() called from user quickly 
    if (quick == 1) {
        clearTimeout(timeoutID);
        // clearInterval(timeoutID);
        run();
    } else { // if user waits to see correct answers (wait for timeOut)
        run();
    }
}

function guess(id, guess, correctButtonNumber) {
    document.getElementById(id).onclick = function () {
        quiz.guess(id, guess, correctButtonNumber);
        wait(waitTime);
    }
};

function qcount() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    document.getElementById("qnum").innerHTML = "Question: " + currentQuestionNumber + " / 10";
};

function reenterContestYesOrNo(str) {
    var txt;
    if (confirm(str)) {
        restart();
    } else {
        document.getElementById("btn0").disabled = true;
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn2").disabled = true;
        document.getElementById("btn3").disabled = true;
        document.getElementById("next").disabled = true;
        document.getElementById("question").innerHTML = 'We wish you best of luck!<br>Bye &#128075;'.fontcolor("#1FFD00").fontsize("24");
    }
}

function message() {
    if (quiz.score < 5)
        reenterContestYesOrNo("You need to practise more and more!\n\nEnter the contest again?");
    else if (quiz.score >= 5 && quiz.score <= 6)
        reenterContestYesOrNo("You are doing well, keep practicing!\n\nEnter the contest again?");
    else if (quiz.score >= 7 && quiz.score <= 9)
        reenterContestYesOrNo("You are about to be excellent!\n\nEnter the contest again?");
    else if (quiz.score = 10)
        reenterContestYesOrNo("You are excellent!\n\nEnter the contest again?");
};

function restart() {
    location.reload();
}

function test() {
    console.log("This is test");
}

let questions = [
    new Question("What are the technologies that accelerate the communication that enable access to information and the creation of information?", ["Technology", "Communication", "Information Technologies", "Hardware"], "Information Technologies"),
    new Question("What is the most basic software that manages electronic devices such as mobile phones, tablets and computers?", ["Operating System", "Application Software", "Computer", "Other Softwares"], "Operating System"),
    new Question("Which of the license types given below can we use some features for free in a limited way?", ["Freeware Software", "Demo Software", "Lisanslı Software", "Beta Software"], "Demo Software"),
    new Question("Which of the following is not a programming language?", ["C++", "Python", "Linux", "Java"], "Linux"),
    new Question("Which of the following is a service providing a cloud storage service?", ["Youtube", "Twitter", "Instagram", "Google Drive"], "Google Drive"),
    new Question("What is the function of the F2 key in Windows OS?", ["Enable full screen feature", "Opens the search window", "Opens the expand window", "Allows to change the name of the selected file"], "Allows to change the name of the selected file"),
    new Question("What is the hardware used to transfer a picture, text or figure to the computer environment?", ["CPU", "Printer", "Modem", "Scanner"], "Scanner"),
    new Question("What are the software used to remove malware?", ["Trojan", "Virus", "Malware", "Antivirus"], "Antivirus"),
    new Question("Which of the following passwords are more reliable and harder to crack than others?", ["A12345", "Abc123", "Wz149-Mac", "Wyz123hbn"], "Wz149-Mac"),
    new Question("Which one is not an object oriented programming language?", ["Java", "C#", "C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("There are ____ main components of object oriented programming.", ["1", "6", "2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

let randQuestions = [];
let rand;
let i = 0;
do {
    rand = questions[Math.floor(Math.random() * questions.length)];
    if (!randQuestions.includes(rand)) {
        randQuestions.push(rand);
    } else { i--; }
    i++;
} while (i < 10);

let quiz = new Quiz(randQuestions);

run();

const title = document.getElementById("title");
title.innerText = document.title;
