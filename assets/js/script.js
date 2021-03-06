
/* DEFINE VARIABLES */
var timer = document.querySelector('#timer');
var highscoreLink = document.querySelector('#highscore-link');
var answers = document.querySelector('#answers');
var correctnessWrapper = document.querySelector('.correctness-wrapper');
var subtext = document.querySelector('#subtext');
var largeText = document.querySelector('#large-text');
var textWrapper = document.querySelector('#text-wrapper');
var buttons = document.querySelector('#buttons');
var timerCount = 60;
var questionNumber= 0;
var timeInterval;
var highscores = []

/* ALL QUESTIONS */
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

/* ALL ANSWERS */
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


 
 
 /* CREATES EACH QUESTION BY CHECKING AGAINST GLOBAL VARIABLE QUESTIONNUMBER */
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
        newAnswer.className="answer button"
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


/* CLEARS MOST ELEMENTS OF SCREEN, NOT ALL (INCREASES EFFICIENCY) */
var clearScreen = function(){
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    };
    while(buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    };
    if(textWrapper.querySelector('#userInitials')!==null){
        remove=textWrapper.querySelector('#userInitials');
        textWrapper.removeChild(remove);
    };
    subtext.textContent="";
    
};

/* DICTATES TIMEFLOW IN THE PROGRAM */
var timeFunction = function(string){
    switch(string){
        case "start":
            timerCount=60;
            timer.textContent="Time left: " + timerCount;
            timeInterval= setInterval(function(){
                if(timerCount>=1){
                    timerCount--;
                    timer.textContent="Time left: " + timerCount
                } else if (timerCount <=0){
                    clearInterval(timeInterval);
                    timer.textContent="Time left: 0";
                    endGame();
                }}, 1000);
                break;
        case "wrong":
            if (timerCount>5){
                timerCount-=5;
                timer.textContent="Time left: " + timerCount;
            }
            else if(timerCount<=5){
                clearInterval(timeInterval);
                timerCount=0;
                timer.textContent="Time left: 0";
                endGame();
            };
            break;
        case "end":
            clearInterval(timeInterval);
            break;
        };
};


/* DETERMINES IF THE SELECTED ANSWER IS CORRECT AND CREATES A NOFIFICATION ON THE BOTTOM OF THE SCREEN */
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
       

/* SHOWS THE LIST OF HIGHSCORES, ALSO CREATES RESTART AND RESET HIGHSCORES BUTTONS */
var showHighscores = function(){
    while(correctnessWrapper.firstChild){
        correctnessWrapper.removeChild(correctnessWrapper.firstChild);
    };
    highscoreLink.textContent="";
    highscoreLink.style.backgroundColor="white";
    clearScreen();
    largeText.textContent = "Highscores:"
    for(i=0; i<highscores.length; i++){
        var newScoreEL = document.createElement("li");
        newScoreEL.className = "highscore";
        newScoreEL.textContent = (i+1) + ".) " + highscores[i][0] + ": " + highscores[i][1];
        answers.appendChild(newScoreEL);
    }
    var resetScores = document.createElement("li");
    resetScores.id = "reset-button"
    resetScores.className = "button"
    resetScores.textContent = "Reset Highscores"
    buttons.appendChild(resetScores);
    var restart = document.createElement("li");
    restart.className = "button";
    restart.id = "restart-button";
    restart.textContent = "Restart"
    buttons.appendChild(restart);
};


/* THIS IS USED WHENEVER THE GAME SHOULD END (TIME RUNS OUT OR OUT OF QUESTIONS) */
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
    submitEl.className = "button"
    submitEl.textContent = "SUBMIT"
    textWrapper.appendChild(userInitials);
    buttons.appendChild(submitEl);
    questionNumber=0; 
};


/* DETERMINES HOW HIGH THE SCORE IS ON THE LEADERBOARD AND SAVES IT TO THE LOCAL STORAGE */
var addHighscore = function(){
    var initials = document.querySelector("input[id='userInitials']").value
    if(initials.length>2 || initials.length===0){
        window.alert("Please input your first and last intitial only!");
        document.getElementById('userInitials').value = '';
        return false;
    }
    var userScore = [initials , timerCount];
    if(highscores.length===0 || highscores.length == null){
        highscores.push(userScore);
        return true;
    }
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
    console.log()
    saveScores();
};

/* CREATES THE STARTING SCREEN WITH A START BUTTON AND WELCOME MESSAGES */
var createStartScreen = function(){
    questionNumber=0;
    timer.textContent = "Time left: NA"
    highscoreLink.textContent = 'View Highscores';
    highscoreLink.style.backgroundColor="var(--primary-color)"
    highscoreLink.id = "viewHighscores-button"
    largeText.textContent = 'Welcome to the Coding Quiz!';
    subtext.textContent = 'You will gain a point for every correct answer and lose time for every incorrect answer! Work fast, but be diligent!';
    var startButton = document.createElement("li");
    startButton.id = "start-button";
    startButton.className = "button"
    startButton.textContent = "Start Game!"
    buttons.appendChild(startButton);
};
    

/* WHEN SOMETHING IS CLICKED DOES AN ACTION BASED ON WHAT IS CLICKED */
var answerHandler = function(event){
    var targetEL= event.target;
    if(targetEL.matches('#start-button')){
        questionNumber++;
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
        saveScores();
        textWrapper.removeChild(input);
        showHighscores();
        };
    }
    else if(targetEL.matches('#reset-button')){
        highscores=[];
        saveScores();
        showHighscores();
    }
    else if(targetEL.matches('#restart-button')){
        clearScreen();
        createStartScreen();
    }
    else if(targetEL.matches('#viewHighscores-button')){
        timeFunction("end");
        showHighscores();
    }
};


/* SAVES SCORES TO LOCAL STORAGE */
var saveScores = function(){
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

/* RETRIEVES LOCAL STORAGE HIGHSCORES */
var retrieveScores = function(){
    highscores=JSON.parse(localStorage.getItem("highscores"));
    if (highscores===null){
        highscores=[];
    }
};

/* LISTENS FOR AN EVENT SUCH AS A CLICK */
document.addEventListener("click", answerHandler);

/* STARTS THE PROGRAM */
retrieveScores();
createStartScreen();
