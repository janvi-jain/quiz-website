const questions = [
    {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
},
{
    question: "How many days are in a week?",
    options: ["5", "6", "7", "8"],
    answer: 2
},
{
    question: "Which color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: 0
},

{
    question: "If 1 pen costs ₹10, how much do 5 pens cost?",
    options: ["40", "50", "60", "70"],
    answer: 1
},
{
    question: "Find the missing number: 2, 4, 8, 16, ?",
    options: ["18", "20", "32", "24"],
    answer: 2
},
{
    question: "A train has 10 coaches. Each coach has 10 people. Total people?",
    options: ["100", "90", "110", "10"],
    answer: 0
},
{
    question: "If you have 10 chocolates and eat 3, how many are left?",
    options: ["5", "6", "7", "8"],
    answer: 2
},

{
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    options: ["Letter M", "Time", "Clock", "Second"],
    answer: 0
},
{
    question: "If you drop a yellow hat in the Red Sea, what happens?",
    options: ["Turns red", "Becomes wet", "Disappears", "Floats"],
    answer: 1
},
{
    question: "Which is heavier: 1 kg cotton or 1 kg iron?",
    options: ["Cotton", "Iron", "Equal", "Depends"],
    answer: 2
},
{
    question: "If you take 2 apples from 3 apples, how many do you have?",
    options: ["1", "2", "3", "0"],
    answer: 1
},
{
    question: "What has hands but cannot clap?",
    options: ["Clock", "Robot", "Human", "Shadow"],
    answer: 0
}
];

document.getElementById("quizBox").style.display = "none";

let player = "";
let currentQuestion = 0;
let score = 0;
let answered = false;
let time = 15;
let timer;

function startQuiz() {
    player = document.getElementById("playerName").value;
    if (player === "") {
        alert("Please Enter Your Name")
        return;
    }
    document.getElementById("welcome").style.display = "none";

    startCountdown();
}

function startCountdown() {
    let count = 3;
    document.getElementById("countdown").innerText = count;

    let interval = setInterval(() => {
        count--;
        document.getElementById("countdown").innerText = count;

        if (count === 0) {
            clearInterval(interval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("quizBox").style.display = "block";
            loadQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    answered = false;
    document.getElementById("questionNumber").innerText = "Question " + (currentQuestion + 1) + " of " + questions.length;

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let options = document.querySelectorAll(".option");

    options.forEach((btn, i) => {
        btn.innerText = q.options[i];

        btn.disabled = false;

        btn.classList.remove("btn-success", "btn-danger");

        btn.classList.add("btn-outline-primary");
    });

    startTimer()
}

function startTimer() {
    clearInterval(timer);
    time = 15;
    document.getElementById("timer").style.color = "white";
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = time;

        if (time <= 5) {
            document.getElementById("timer").style.color = "red";
        } else {
            document.getElementById("timer").style.color = "white";
        }

        if (time === 0) {
            clearInterval(timer);
            let messages = [
                "⏰ Too slow!",
                "⏰ Time ran out!",
                "⏰ Clock wins this round!"
            ];
            alert(messages[Math.floor(Math.random() * messages.length)]);

            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion()
    } else {
        showResult()
    }
}

function checkAnswer(index) {

    clearInterval(timer);

    answered = true;

    let options = document.querySelectorAll(".option");

    let correctAnswer = questions[currentQuestion].answer;

    if (index === correctAnswer) {
        score++;
        let correctSound = document.getElementById("correctSound");
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        let wrongSound = document.getElementById("wrongSound");
        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    options.forEach((btn, i) => {

        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-success");
        } else if (i === index) {
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-danger");
        }

    });
}

function nextbtn() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }
    nextQuestion()
}

function showResult() {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("finalName").innerText = "player Name : " + player;

    let message = "";

    if (score >= 7) {
        message = "🏆 Great job! You're a quiz master.";
        confetti();
    }
    else if (score >= 4) {
        message = "📚 Good try! Learning never stops.🙂";
    }
    else {
        message = "💪 Don't give up! Practice makes perfect.";
    }

    document.getElementById("finalScore").innerHTML =
        `Your Score: ${score}/${questions.length} <br><br> ${message}`;

}

function RestartQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 15;

    document.getElementById("result").style.display = "none";
    document.getElementById("welcome").style.display = "block";
}