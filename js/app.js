
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const nextquest = document.querySelector(".nextquest");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// push teh questions into availableQuestions Array
function setavailableQuestions(){   
    const totalQuestion = quiz.length;
    for(let i =0;i< totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
    
}
function getNewQuestion(){
    // set quesiton number
    questionNumber.innerHTML = "question " + (questionCounter + 1)+ " of " + quiz.length;
    // set question
    nextquest.classList.add("hide");
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    // set options 
    // get the length of options
    const optionLen = currentQuestion.options.length
    // push options into availableOptions Array
    for(let i=0; i<optionLen;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in innerhtml
    for(let i=0; i<optionLen;i++){

        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1)
        
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }


    questionCounter++
    
}
//get the result
function getResult(element){
    
    const id = parseInt(element.id);
    
    if(id === currentQuestion.answer){
        //set the green color to the correct option 
        element.classList.add("correct")
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
        nextquest.classList.remove("hide");
    }else{
        element.classList.add("wrong");
        //if  the answer is incorrect then show the correct option by adding green color the correct option 
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        nextquest.classList.remove("hide");
    }   
    attempt++;
    unclickableOptions();
}

//make all the options unclickable once the user select a option(restrict the user to change the option)
function unclickableOptions(){  
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("alredy-answered")
    }
    
}
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
    
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}
function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        
        getNewQuestion();
    }

}
function quizOver(){
    // hide quiz box 
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}
// get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}
function resetQuiz(){
    let questionCounter = 0;
    let correctAnswers = 0;
    let attempt = 0;
    
}
function tryAgainQuiz(){
    resultBox.classList.add("hide");
    // show the quiz-box
    quizBox.classList.remove("hide");
    
    resetQuiz();
    startQuiz();
}
function goToHome(){
    // hide resultBox
    resultBox.classList.add("hide");
    // show home result-box
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz(){
    // hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    // first we will set all questions in availableQuestions Array
    setavailableQuestions();
    //second we will call get 
    getNewQuestion();
    //to create indicators of answer
    answersIndicator();
    //get result
    getResult(element);
}
window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = " -> " + quiz.length;
}
