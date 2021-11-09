// Looping through this allows me to add anymore questions later in the future
let questions = [
    {
        qu: "Question 1: If you had to decide on the highest grade you feel you can comfortably get, what would you choose?",
        an_list: ["A Not Achieved", "B Achieved", "C Merit", "D Excellence!"]
    },
    {
        qu: "Question 2: How often do you study/do schoolwork outside school?",
        an_list: ["A Very little, 30min-1hr a week.", "B Sometimes, 1-2hrs a week", "C Regularly, 2-5hrs a week", "D Very often, 5-10hrs a week"]
    },
    {
        qu: "Question 3: What is your current GPA? ",
        an_list: ["A 0-50%", "B 50-75%", "C 75-90%", "D 90-100%"]
    },
    {
        qu: "Question 4: Have you received a Not Achieved this year?",
        an_list: ["A yes", "B no"]

    },
    {
        qu: "Question 5: Do you feel as if you are not prepared for your end of year exams?",
        an_list: ["A yes", "B no"]
    }
]

// Creates the question elements for the html page. Will return the element created
function createQuizElements(question, questionNumber) {
    let questionDiv, questionTextDiv, quizAnswerDiv, quizAnswerList, i, answer

    // Creates  a div to store the whole question
    questionDiv = document.createElement("div")
    questionDiv.className = "quiz-question"

    // Creates a div to store the question
    questionTextDiv = document.createElement("div")
    questionTextDiv.className = "question"
    questionTextDiv.innerHTML = question["qu"]
    questionDiv.append(questionTextDiv)

    // Creates a div to store the answers
    quizAnswerDiv = document.createElement("div")
    quizAnswerDiv.className = "answers"
    questionDiv.append(quizAnswerDiv)

    // Creates an unordered list to add the answers to
    quizAnswerList = document.createElement("ul")
    quizAnswerDiv.append(quizAnswerList)

    // Uses a for loop to loop through each answer and create a radiobutton the user can click on

    for (i = 0; i < question["an_list"].length; i++) {
        let li, input, inputID

        // Creates a unique id for the input
        inputID = "question-" + questionNumber.toString() + "-answer-" + (i + 1).toString()

        // Creates a list element for the answer
        li = document.createElement("li")

        // Creates the radio button
        input = document.createElement("input")
        input.type = "radio"
        input.id = inputID
        input.name = "question-" + questionNumber
        li.append(input)

        // Creates the label for the radio button
        let label = document.createElement("label")
        label.htmlFor = inputID
        label.innerHTML = question["an_list"][i]
        li.append(label)

        quizAnswerList.append(li)
    }


    return questionDiv
}

// Checks if the user has checks all of the check boxes
function hasUserFinishedQuiz() {
    let i;
    // Loops through each question
    for (i = 0; i < questions.length; i++) {
        // Gets a list of inputs to loop through and check
        let selector = "input[name=question-" + (i + 1).toString() + "]"
        let answerRadioButtons = document.querySelectorAll(selector)

        // Gets the answer radio buttons to check if one of them has been checked
        if (!isQuestionBeenAnswered(answerRadioButtons)) {
            return false
        }
    }
    return true;
}

// Hides the span tag that shows the user they didn't complete the quiz
function hideQuizError() {
    let quizErrorText = document.getElementById("quizError")
    quizErrorText.style.display = "none"
}

// Changes the advice based on the score the user got
function changeAdvice(score) {
    let text;
    if (score < 8) {
        text = "You really need to put in some extra work. It's for your own benefit, as there is certainly a risk of you failing this year if things continue as-is. Possibly look into tutoring. "
    } else if (score < 11) {
        text = "You certainly are looking ok, but there is definitely room for improvement. Put in an extra hour or two a week and you should be looking on-track. "
    } else if (score < 13) {
        text = "You're on track! Keep it up, and if you're aiming for Excellence, possibly look into just doing that tiny extra bit more! "
    } else {
        text = "You're doing amazing. Keep up the great work. You're well on track to get 100% for the year. "
    }

    // Changes the text of the span
    document.getElementsByClassName("popup-advice")[0].textContent = text
}

// This happens when the finish quiz button is clicked
function finishQuiz() {
    // Checks if the user has checked all of the radio boxes
    if (hasUserFinishedQuiz()) {
        // Shows the popup window
        showPopUpWindow()
    } else {
        // Tells the user they need to complete the quiz first
        let quizErrorText = document.getElementById("quizError")

        quizErrorText.style.display = ""

        // Hides the message from the user
        setTimeout(hideQuizError, 1500);
    }
}

// Checks if the question has been answered
function isQuestionBeenAnswered(radioButtons) {
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            return true;
        }
    }
    return false
}

// Displays the popup window
function showPopUpWindow() {
    let score = calculateScore()
    console.log(score)

    // Changes the popup display to its default value which would show it
    document.getElementsByClassName("popup-background")[0].style.display = "";

    changeAdvice(score)

    // Changes the result span
    document.getElementsByClassName("popup-result")[0].textContent = "You got a score of " + score.toString() + "!"
}

function closePopUpWindow() {
    document.getElementsByClassName("popup-background")[0].style.display = "none";
}

// Calculates the scores for the test
function calculateScore() {
    let i, score;
    score = 0
    for (i = 0; i < questions.length; i++) {
        let radioButtons = document.querySelectorAll("input[name=question-" + (i + 1).toString())
        score += getCheckedRadioButton(radioButtons) + 1
    }

    return score;
}

function getCheckedRadioButton(radioButtons) {
    let i;
    // Gets the radio button that was checked
    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return i
        }
    }

}

// Creates the elements for the quiz so it can display it to the user
let i, quiz, question, questionElement;
quiz = document.getElementsByClassName("quiz")[0]
for (i = 0; i < questions.length; i++) {
    question = questions[i]
    questionElement = createQuizElements(question, i + 1)
    quiz.append(questionElement)
}

document.getElementById("finish-quiz-button").onclick = finishQuiz;
document.getElementById("close-button").onclick = closePopUpWindow;
document.getElementsByClassName("popup-background")[0].onclick = closePopUpWindow;