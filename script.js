document.addEventListener('DOMContentLoaded', function() {
    const riddles = [
        { question: "I list the standards for drugs to be imported. Which schedule am I?", answer: "Schedule A" },
        { question: "I provide the form for the application of import of drugs. Which schedule am I?", answer: "Schedule B" },
        { question: "Under me those disease are kept whose drugs are not available in market. Which schedule am I?", answer: "Schedule J" },
        { question: "I List the drugs which are habit-forming psychotropic and other drugs likely to be misused for addictive purposes. Which schedule am I?", answer: "Schedule X" },
        { question: "I am about the drugs exempted from the provision of import of drugs. Which schedule am I?", answer: "Schedule D" },
        { question: "I provide the standards for poisonous substances under Ayurvedic, Siddha and Unani. Which schedule am I?", answer: "Schedule E1" },
        { question: "I am related to production testing, storage, packing and labelling of biological and other special products. I?", answer: "Schedule F & F1" },
        { question: "I set the Requirements for factory premises, etc. for the manufacture of Homeopathic drugs. Which schedule am I?", answer: "Schedule M1" },
        { question: "I set standards for sterilized umbilical tapes. Which schedule am I?", answer: "Schedule F3" },
        { question: "I set the Requirements for factory premises for the manufacture of medical devices. Which schedule am I?", answer: "Schedule M3" },
        { question: "Under me Various drugs/substances to be used under the medical supervision and which are to be labelled accordingly. Which schedule am I?", answer: "Schedule G" },
        { question: "I allow drugs to be sold only on the prescription of an RMP. Which schedule am I?", answer: "Schedule H" },
        { question: "I am about the Requirement and guidelines for clinical trials. Which schedule am I?", answer: "Schedule Y" },
        { question: "I set standards for patent and proprietary medicines. Which schedule am I?", answer: "Schedule V" },
        { question: "I set standards for surgical dressings. Which schedule am I?", answer: "Schedule F2" },
        { question: "I keep list of Drugs exempted from provisions related to manufacture of drugs. Which schedule am I?", answer: "Schedule K" },
        { question: "I set the standards for good manufacturing practices (GMP) for drugs and cosmetics. Which schedule am I?", answer: "Schedule M" },
        { question: "I set standards for ophthalmic preparations. Which schedule am I?", answer: "Schedule FF" },
        { question: "I set the Requirements for factory premises for the manufacture of cosmetics. Which schedule am I?", answer: "Schedule M2" },
        { question: "I set the Standards for medical devices. Which schedule am I?", answer: "Schedule R1" },
        { question: "I provide the List of manufacture equipment for the efficient running of a pharmacy. Which schedule am I?", answer: "Schedule N" },
        { question: "I set the standards for disinfectant fluids. Which schedule am I?", answer: "Schedule O" },
        { question: "I keep info about Life period and storage of various drugs. Which schedule am I?", answer: "Schedule P" },
        { question: "I allow for Maintenance of manufacturing and analytical records of drugs. Which schedule am I?", answer: "Schedule U" },
        { question: "I am for the standards for colours used in drugs and cosmetics. Which schedule am I?", answer: "Schedule Q" },
        { question: "I provide the standards for condoms and other mechanical contraceptives. Which schedule am I?", answer: "Schedule R" },
        { question: "I allow for Maintenance of manufacturing, raw material and analytical records of cosmetics. Which schedule am I?", answer: "Schedule U1" },
        { question: "I set the standards for cosmetics. Which schedule am I?", answer: "Schedule S" },
        { question: "I give Requirements for factory premises and manufacture of Ayurvedic, Siddha and Unani products. Which schedule am I?", answer: "Schedule T" },
        { question: "I provide the Regulations regarding retail package size of various drugs. Which schedule am I?", answer: "Schedule P1" },
        { question: "I extend the standards of Schedule C for other drugs. Which schedule am I?", answer: "Schedule C1" },
        { question: "I list the drugs which can be marketed under generic names only. Which schedule am I?", answer: "Schedule W" },
        { question: "I set the standards for biological products. Which schedule am I?", answer: "Schedule C" },
        { question: "I ENSURE that antibiotics are not misused. Which schedule am I?", answer: "Schedule HX" }
    ];

    const riddlesContainer = document.getElementById('riddles-container');
    let userRollNumber = '';

    function getRandomQuestions() {
        const shuffled = [...riddles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }

    function showAnswer(index, correctAnswer) {
        const answerPara = document.getElementById(`correct-answer-${index}`);
        const userAnswer = document.getElementById(`user-answer-${index}`).value.trim();
        const feedback = document.getElementById(`feedback-${index}`);

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
            feedback.style.color = 'red';
        }

        answerPara.style.display = 'block';
        feedback.style.display = 'block';
    }

    function startQuiz() {
        userRollNumber = document.getElementById('roll-number').value.trim();
        if (!userRollNumber) {
            alert('Please enter your roll number.');
            return;
        }

        document.getElementById('start-page').classList.add('hidden');
        document.getElementById('riddles-container').classList.remove('hidden');

        const questions = getRandomQuestions();
        questions.forEach((riddle, index) => {
            const riddleDiv = document.createElement('div');
            riddleDiv.classList.add('riddle');

            const questionPara = document.createElement('p');
            questionPara.textContent = riddle.question;

            const inputAnswer = document.createElement('input');
            inputAnswer.type = 'text';
            inputAnswer.id = `user-answer-${index}`;
            inputAnswer.classList.add('input-answer');
            inputAnswer.placeholder = 'Your answer here...';

            const checkButton = document.createElement('button');
            checkButton.textContent = 'Submit Answer';
            checkButton.onclick = () => showAnswer(index, riddle.answer);

            const answerPara = document.createElement('p');
            answerPara.classList.add('answer');
            answerPara.id = `correct-answer-${index}`;
            answerPara.style.display = 'none';
            answerPara.textContent = `The answer is: ${riddle.answer}`;

            const feedbackPara = document.createElement('p');
            feedbackPara.classList.add('feedback');
            feedbackPara.id = `feedback-${index}`;
            feedbackPara.style.display = 'none';

            riddleDiv.appendChild(questionPara);
            riddleDiv.appendChild(inputAnswer);
            riddleDiv.appendChild(checkButton);
            riddleDiv.appendChild(answerPara);
            riddleDiv.appendChild(feedbackPara);

            riddlesContainer.appendChild(riddleDiv);
        });

        // Add the leaderboard button and container
        const leaderboardButton = document.createElement('button');
        leaderboardButton.textContent = 'Show Leaderboard';
        leaderboardButton.onclick = showLeaderboard;
        leaderboardButton.classList.add('hidden');
        riddlesContainer.appendChild(leaderboardButton);

        const leaderboardDiv = document.createElement('div');
        leaderboardDiv.classList.add('hidden');
        leaderboardDiv.id = 'leaderboard';
        riddlesContainer.appendChild(leaderboardDiv);

        // Check if all questions are answered and display leaderboard
        const checkAnswers = () => {
            const feedbacks = document.querySelectorAll('.feedback');
            const allAnswered = Array.from(feedbacks).every(feedback => feedback.style.display === 'block');
            if (allAnswered) {
                leaderboardButton.classList.remove('hidden');
            }
        };

        document.querySelectorAll('.riddle button').forEach(button => {
            button.addEventListener('click', checkAnswers);
        });
    }

    function showLeaderboard() {
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = `<h2>Leaderboard</h2><p>${userRollNumber} - Score: 0</p>`;
        leaderboard.classList.remove('hidden');
    }

    function closePopup() {
        document.getElementById('popup').classList.add('hidden');
        document.getElementById('overlay').classList.add('hidden');
    }
});
