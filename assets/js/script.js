var timer = document.querySelector('#timer');
var highscoreLink = document.querySelector('#highscore-link');
var answers = document.querySelector('#answers');
var correctnessWrapper = document.querySelector('.correctness-wrapper');
var subtext = document.querySelector('#subtext');
var largeText = document.querySelector('#large-text');
var textWrapper = document.querySelector('#text-wrapper');
var timerCount = 60;
var questionNumber= 0;
var timeInterval;
var highscores = []


var questionsText= {
 "question1" : "1.) Which of the following is true about variable naming conventions in JavaScript?",
 "question2" : "2.) Which of the following is true about cookie handling in JavaScript?",
 "question3" : "3.) Which built-in method removes the last element from an array and returns that element?",
 "question4" : "4.) Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?",
 "question5" : "5.) Which of the following function of String object returns the character at the specified index?",
 "question6" : "6.) Which of the following function of String object returns the characters in a string beginning at the specified location through the specified number of characters?",
 "question7" : "7.) Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
 "question8" : "8.) Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?",
 "question9" : "9.) Which of the following function of Array object joins all elements of an array into a string?",
 "question10" : "10.) Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?"
};

/* THE FIRST ANSWER IN EACH DICTIONARY KEY IS THE CORRECT ANSWER!!! */
var answersText = {
 "question1" : ["Both.", "JavaScript variable names must begin with a letter or the underscore character.", "JavaScript variable names are case sensitive.", "Neither."] , 
 "question2" : ["Both.", "JavaScript can manipulate cookies using the cookie property of the Document object.", "JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.", "Neither."],
 "question3" : ["pop()", "last()", "get()", "None of these."],
 "question4" : ["toFixed()", "toExponential()", "toPrecision()", "toLocaleString()"],
 "question5" : ["charAt()", "charCodeAt()", "concat()", "indexOf()"],
 "question6" : ["substr()", "slice()", "split()", "search()"],
 "question7" : ["anchor()", "link()",  "blink()", "big()"],
 "question8" : ["italics()", "fixed()",  "fontcolor()", "fontsize()"],
 "question9" : ["join()", "concat()",  "pop()", "map()"],
 "question10" : ["unshift()", "sort()",  "splice()", "toString()"]
};


 
 
 
var createQuestion = function(){
    clearScreen();
    largeText.textContent = questionsText["question"+questionNumber];
    var answerLength = answersText["question"+questionNumber].length;
    var answerNumbers = []
    for(i=0; i<answerLength; i++){
        answerNumbers.push(i)
    };
    for( i=0; i<answerLength; i++){
        randomSelect=answerNumbers[Math.floor(Math.random()*answerNumbers.length)];
        var newAnswer = document.createElement("li");
        newAnswer.className="answer"
        newAnswer.textContent= answersText["question"+questionNumber][randomSelect];
        if(randomSelect===0){
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
    };
};

var clearScreen = function(){
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
    subtext.textContent="";
    
};


var timeFunction = function(string){
    switch(string){
        case "start":
            timerCount=60;
            timer.textContent=timerCount;
            timeInterval= setInterval(function(){
                if(timerCount>=1){
                    timerCount--;
                    timer.textContent=timerCount
                } else if (timerCount <=0){
                    clearInterval(timeInterval);
                    timer.textContent=0;
                    endGame();
                }}, 1000);
                break;
        case "wrong":
            if (timerCount>5){
                timerCount-=5;
            }
            else if(timerCount<=5){
                clearInterval(timeInterval);
                timerCount=0;
                timer.textContent=0
                endGame();
            };
            break;
        case "end":
            clearInterval(timeInterval);
            break;
        };
};

var respondToAnswer = function(targetEL){
    while(correctnessWrapper.firstChild){
        correctnessWrapper.removeChild(correctnessWrapper.firstChild);
    };
    if(targetEL.matches('#correct')){
        var correctness = document.createElement("div");
        correctness.id="correctness";
        correctness.textContent="CORRECT!"
        correctnessWrapper.appendChild(correctness);
    }
    else  if(targetEL.matches('#wrong')){
        var correctness = document.createElement("div");
        correctness.id="correctness";
        correctness.textContent="WRONG!"
        correctnessWrapper.appendChild(correctness);
        timeFunction("wrong");
        
    };
    if (questionNumber===(Object.keys(questionsText).length)){
        timeFunction("end");
        endGame();
    }
    else{
        questionNumber++;
        createQuestion();
        console.log(questionNumber);
    };
};
            
var showHighscores = function(){

    clearScreen();
    largeText.textContent = "Highscores:"
    for(i=0; i<highscores.length; i++){
        var newScoreEL = document.createElement("li");
        newScoreEL.className = "highscore";
        newScoreEL.textContent = (i+1) + ".) " + highscores[i][0] + ": " + highscores[i][1];
        answers.appendChild(newScoreEL);
    }
};


var startGame = function(){
    
};

var endGame = function(){
    while(correctnessWrapper.firstChild){
        correctnessWrapper.removeChild(correctnessWrapper.firstChild);
    };
    clearScreen();
    largeText.textContent="GAME OVER!";
    subtext.textContent = "Your score: " + timerCount;
    var userInitials= document.createElement('input');
    userInitials.id="userInitials";
    var submitEl = document.createElement('li');
    submitEl.id = "submit-button";
    submitEl.textContent = "SUBMIT"
    textWrapper.appendChild(userInitials);
    answers.appendChild(submitEl);
    questionNumber=0; 
};

var addHighscore = function(){
    var initials = document.querySelector("input[id='userInitials']").value
    if(initials.length>2 || initials.length===0){
        window.alert("Please input your first and last intitial only!");
        document.getElementById('userInitials').value = '';
        return false;
    }
    var userScore = [initials , timerCount];
    if(highscores.length==0){
        highscores.push(userScore);
        return true;
    }
    /* WORKING ON HIGHSCORE STORAGE */
    else{
        for(i=0; i<highscores.length; i++){
            if(timerCount>highscores[i][1]){
                highscores.splice(i,0,userScore);
                return true;
            };
            if(i==highscores.length-1){
                highscores.push(userScore)
                return true;
            };
        };
    };
    saveScores();
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
            
var answerHandler = function(event){
    var targetEL= event.target;
    if(targetEL.matches('#start-button')){
        questionNumber++;
        clearScreen();
        createQuestion();
        timeFunction("start");
    }
    else if(targetEL.matches('#correct') || targetEL.matches('#wrong')){
        respondToAnswer(targetEL);
    } 
    else if(targetEL.matches('#submit-button')){
        var hsAdded = addHighscore();
        if(hsAdded){
        var input= document.querySelector("input[id='userInitials']");
        textWrapper.removeChild(input);
        showHighscores();
        };
    }
};

var saveScores = function(){
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

highscores=JSON.parse(localStorage.getItem("highscores"));
answers.addEventListener("click", answerHandler);

createStartScreen();
