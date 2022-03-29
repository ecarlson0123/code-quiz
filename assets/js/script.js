var timer = document.querySelector('#timer');
var highscoreLink = document.querySelector('#highscore-link');
var answers = document.querySelector('#answers');
var correctness = document.querySelector('#correctness');
var subtext = document.querySelector('#subtext');
var largeText = document.querySelector('#large-text');
var timerCount = 60;
var questionNumber= 0;

var questionsText= {"question1" : "what is the ...", question2: "blah blah blah"}
var answersText = {"question1" : ["hi" , "hello", "wow", "yay"]}


var answerHandler = function(event){
    var targetEL= event.target;
    if(targetEL.matches('#start-button')){
        questionNumber++;
        clearScreen();
        createQuestion();
    }
};



var createQuestion = function(){
    clearScreen();
    largeText.textContent = questionsText["question"+questionNumber];
    var answerLength = answersText["question"+questionNumber].length;
    var answerNumbers = []
    for(i=0; i<answerLength; i++){
        answerNumbers.push(i)
    };
    console.log('answerlength: ' + answerLength);
    for( i=0; i<answerLength; i++){
        console.log('answernum: ' + answerNumbers);
        randomSelect=answerNumbers[Math.floor(Math.random()*answerNumbers.length)];
        console.log('random: ' + randomSelect);
        var newAnswer = document.createElement("li");
        newAnswer.className="answer"
        newAnswer.textContent= answersText["question"+questionNumber][randomSelect];
        if(randomSelect==0){
            newAnswer.id="correct"
        }
        else{
            newAnswer.id="wrong"
        }
        answers.appendChild(newAnswer);
        for( x = 0; x < answerNumbers.length; x++){ 
    
            if ( answerNumbers[x] === randomSelect) { 
        
                answerNumbers.splice(x, 1); 
            }
        };
        console.log('answernum: ' + answerNumbers);
    };
};

var clearScreen = function(){
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
    subtext.textContent="";
};

var respondToAnswer = function(){
    questionNumber++;
};

var showHighscores = function(){

};

var addHighscore = function(){

};

var startGame = function(){

};

var endGame = function(){
    questionNumber=0;
};

var createStartScreen = function(){
    highscoreLink.textContent = 'View Highscores';
    largeText.textContent = 'Welcome to the Coding Quiz!';
    subtext.textContent = 'You will gain a point for every correct answer and lose time for every incorrect answer! Work fast, but be diligent!';
    var startButton = document.createElement("li");
    startButton.id = "start-button";
    startButton.textContent = "Start Game!"
    answers.appendChild(startButton);
};

answers.addEventListener("click", answerHandler);

createStartScreen();
