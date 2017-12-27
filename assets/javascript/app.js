
var timeInSecs;
var ticker;

function startTimer(secs){
timeInSecs = parseInt(secs)-1;
ticker = setInterval("tick()",1000);   // every second
}

function stop(){
    // Clears our "counter" interval. The interval name is passed to the clearInterval function.
        clearInterval(ticker);
    }
;

function tick() {
var secs = timeInSecs;
if (secs>0) {
timeInSecs--;
}
else {
clearInterval(ticker);
stop();
showResults(); // stop counting at zero and show results
// startTimer(30);  // remove forward slashes in front of startTimer to repeat if required
}

//*document.getElementById("countdown").innerHTML = "Time Remaining: " + secs;*//
$('#countdown').html('<h2>' + "Time Remaining: " + secs +'</h2>');
}

startTimer(30);  // 30 seconds


function buildQuiz() {
      // we'll need a place to store the HTML output
      var output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        var answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
      let numIncorrect = 0;
      let numUnanswered = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var guessedAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (guessedAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // if answer is wrong
        } else if (guessedAnswer === currentQuestion.wrongAnswers) {
            //add to the number of incorrect answers
            numIncorrect++;
            
          // if unaswered
        } else {
            numUnanswered++;
        }
      });
  
      // show results
      $('#results').html('Correct Answers: '+numCorrect+ "<br>" +'Incorrect Answers: '+numIncorrect+ "<br>" +'Unanswered: '+numUnanswered);
    }
  
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var myQuestions = [
      {
        question: "What was the name of Titanic's older sister ship?",
        answers: {
          A: "Olympic",
          B: "Britannic",
          C: "Majestic",
          D: "Lusitania"
        },
        correctAnswer: "A",
        wrongAnswers: ["B", "C", "D"]
      },
      {
        question: "Who founded New York in 1609?",
        answers: {
          A: "Giovanni da Verrazzano",
          B: "Peter Stuyvesant",
          C: "Henry Hudson",
          D: "Walter Raleigh"
        },
        correctAnswer: "C",
        wrongAnswers: ["A", "B", "D"]
      },
      {
        question: "Which one of these presidents is not typically ranked in the top three?",
        answers: {
          A: "Franklin D. Roosevelt",
          B: "Lyndon B. Johnson",
          C: "George Washington",
          D: "Abraham Lincoln"
        },
        correctAnswer: "B",
        wrongAnswers: ["A", "C", "D"]
      },
      {
        question: "How does Harry Potter hide from his enemies?",
        answers: {
          A: "Invisibility Charm",
          B: "Shriking Potion",
          C: "Invisibility Cloak",
          D: "Camoflauge"
        },
        correctAnswer: "C",
        wrongAnswers: ["A", "B", "D"]
      }
    ];
  
    // display quiz right away
    buildQuiz();
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
;

//*var guessedAnswer = 0*//

//*var correctAnswer = 0

//*var questions = ["What was the name of Titanic's older sister ship?", "Who founded New York in 1609?", "Which one of these presidents is not typically ranked in the top three?", "How does Harry Potter hide from his enemies?"];




//*function gameFunction (){
    //*for (var i = 0; i<questions.length; i++) {
		//*if (guessedAnswer===correctAnswer)) {
			//*correct++;
		//*} else if (guessedAnswer===wrongAnswers) {
            //incorrect++;
			//*} else {
				//*unAnswered++;
			//*}
		//*}
    //*}
    //*$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
//*}*//