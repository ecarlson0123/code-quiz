# code-quiz
# Challenge 4: Code Quiz

## The Challenge Summary
Create a quiz on the topic of coding with the following requirements:  
GIVEN I am taking a code quiz  
WHEN I click the start button  
THEN a timer starts and I am presented with a question  
WHEN I answer a question  
THEN I am presented with another question  
WHEN I answer a question incorrectly  
THEN time is subtracted from the clock  
WHEN all questions are answered or the timer reaches 0  
THEN the game is over  
WHEN the game is over  
THEN I can save my initials and score  

## How I did it

### Step 1: Create rough HTML
The HTML had to be very rough because almost all the elements would be dynamically generates. This actually made this stepo very quick and easy.

### Step 2: Create JS functions and variables
This easily took the longest. Finding the correct order to do things in, made it hard, along with deciding how to structure the data with the questions and answers.

It would have been easy to do a list, and just have the answers be in the same place each time, but using a dictionary gave me the ability to randomize the answer positions.
I created these funcitons:  
-createQuestion  
-timeFunction  
-clearScreen  
-respondToAnswer  
-showHighscores  
-addHighscore  
-endGame  
-createStartScreen  
-answerHandler  

From their names, it is easy to determine what each does and why they are critical. Many of these could have been combined into one or a couple functions, but separation of variables made debugging and adding later features easier.  

### Step 3: Adding CSS
This portion was also very easy. I made sure to add appropriate classes and ids to the generated elements so that a general styling could be made for each type of element that was created.

### Step 4: Debugging
I made sure to click each button available in each step to make sure that none of them created errors with certain elements not interacting correctly with certain functions.
A couple small bugs appeared but thanks to the separation of variables, it was easy to find the root of the issues.

## Links:
[Repository Link](https://github.com/ecarlson0123/code-quiz)  
[Deployed Website](https://ecarlson0123.github.io/code-quiz/)  
