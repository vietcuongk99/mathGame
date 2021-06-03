var timeLeft,
    countDownTimer,
    userScore,
    question,
    answer,
    firstNum,
    secondNum,
    mathCode,
    listOption;
timeLeft = RULE.TIMELEFT;
listOption = [0, 0, 0, 0];
userScore = RULE.SCORE.DEFAULT;

const countDown = () => {
    document.getElementById('timerDiv').innerHTML = `Time left: ${timeLeft}s`;
    countDownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timerDiv').innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft == 0) {
            clearInterval(countDownTimer);
            showNotify();
            resetGame();
        }
    }, 1000);
};
const startGame = () => {
    document.getElementById('btnStart').classList.add('display-none');
    document.getElementById('btnReset').classList.remove('display-none');
    printScore();
    countDown();
    generateQuestion();
};
const resetGame = () => {
    document.getElementById('btnStart').classList.remove('display-none');
    document.getElementById('btnReset').classList.add('display-none');
    timeLeft = RULE.TIMELEFT;
    userScore = RULE.SCORE.DEFAULT;
    question = "";
    answer = "";
    firstNum = "";
    secondNum = "";
    mathCode = "";
    clearInterval(countDownTimer);
    resetGameContent();
    printScore();
};
const initEvent = () => {
    document.getElementById('btnReset').addEventListener("click", () => {
        resetGame();
    });
    document.getElementById('btnStart').addEventListener("click", () => {
        startGame();
    });
};
const getQuestionAndAnswer = (firstNum, secondNum, mathCode) => {
    if (firstNum || secondNum || mathCode) {
        switch (mathCode) {
            case (CALCULATOR.ADD.CODE):
                {
                    question = `${firstNum} ${CALCULATOR.ADD.GLYPH} ${secondNum}`;
                    answer = firstNum + secondNum;
                    break;
                }
            case (CALCULATOR.MINUS.CODE):
                {
                    question = `${firstNum} ${CALCULATOR.MINUS.GLYPH} ${secondNum}`;
                    answer = firstNum - secondNum;
                    break;
                }
            case (CALCULATOR.MULTIPLY.CODE):
                {
                    question = `${firstNum} ${CALCULATOR.MULTIPLY.GLYPH} ${secondNum}`;
                    answer = firstNum * secondNum;
                    break;
                }
        }
    }

};
const generateOptions = (listOption) => {
    document.getElementById('groupAnswerDiv').innerHTML = "";
    let randomNum = Math.floor(Math.random() * RULE.RANGE + 1);
    let index = 0;
    while (index < RULE.OPTIONS) {
        if (listOption.indexOf(randomNum) < 0) {
            if (listOption.indexOf(answer) != index) {
                listOption[index] = randomNum;
            }
            index++;
        }
        randomNum = Math.floor(Math.random() * RULE.RANGE + 1);
    }
    for (let i = 0; i < RULE.OPTIONS; i++) {
        let option = document.createElement('div');
        option.classList.add("box-item", "text-center", "inline-block", "shadow", "bg-white");
        option.innerHTML = `${listOption[i]}`;
        option.addEventListener("click", () => {
            calculateScore(answer, listOption[i]);
            generateQuestion();
        });
        document.getElementById('groupAnswerDiv').append(option);
    }
};
const generateQuestion = () => {
    let answerIndex;
    firstNum = Math.floor(Math.random() * RULE.RANGE + 1);
    secondNum = Math.floor(Math.random() * RULE.RANGE + 1);
    mathCode = Math.floor(Math.random() * 3);
    getQuestionAndAnswer(firstNum, secondNum, mathCode);
    document.getElementById('questionDiv').innerHTML = question;
    answerIndex = Math.floor(Math.random() * RULE.OPTIONS);
    listOption[answerIndex] = answer;
    generateOptions(listOption);
};
const calculateScore = (correctAnswer, userAnswer) => {
    let result;
    if (correctAnswer == userAnswer) {
        result = "Correct";
        debugger
        userScore++;
    } else {
        result = "Wrong!"
    }
    showResult(result);
    printScore();
};
const printScore = () => {
    document.getElementById('scoreDiv').innerHTML = `Score: ${userScore}`;
};
const showResult = (result) => {
    let resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = result;
    resultDiv.classList.remove('display-none');
    let showResult = setTimeout(() => {
        resultDiv.classList.add('display-none');
        clearTimeout(showResult);
    }, 800);
};
const resetGameContent = () => {
    document.getElementById('questionDiv').innerHTML = "";
    document.getElementById('groupAnswerDiv').innerHTML = "";
    for (let index = 0; index < RULE.OPTIONS; index++) {
        let option = document.createElement('div');
        option.classList.add("box-item", "text-center", "inline-block", "shadow", "bg-white");
        option.innerHTML = "";
        document.getElementById('groupAnswerDiv').append(option);
    }
    document.getElementById('timerDiv').innerHTML = "";
};

const showNotify = () => {
    let notifyContent;
    notifyContent = document.getElementById('notifyContent');
    notifyContent.innerHTML = `Game over!<br>Your score is ${userScore}`;
    document.getElementById('notifyDiv').classList.remove('display-none');
}
initEvent();