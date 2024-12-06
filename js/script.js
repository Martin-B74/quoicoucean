const updateIndex = () => {
    slideIndex++;
};

const getDameTextContainer = (slideIndex) => {
    let slide = document.querySelector(".active .dame_question");
    let slideText = slide.textContent;
    return slideText;
};

const displayText = (text) => {
    document.querySelector(".active .dame_question").textContent = text;
};

//Set up the text for the given slide index
const displayQuestion = (slideIndex) => {
    let slideText = getDameTextContainer(slideIndex);
    slideText.textContent = getSlideData(slideIndex).phrase_dame;

    document.querySelector(".active .question").textContent =
        getSlideData(slideIndex).question;

    getSlideData(slideIndex).answers.forEach((answer, index) => {
        document.querySelector(
            "#pop_question label#label_q" + (index + 1)
        ).textContent = answer;
        document.querySelector(
            '#pop_question input[type="radio"]#q' + (index + 1)
        ).value = index;
    });
};

const getSlideData = (slideIndex) => {
    return text[slideIndex - 1];
};

const checkAnswer = (slideIndex) => {
    if (
        document.querySelector('#pop_question input[type="radio"]:checked') ==
        null
    ) {
        // Add error message in div
        document
            .querySelector("#pop_question")
            .insertAdjacentHTML(
                "beforeend",
                '<div class="nogood" role="alert">Veuillez sélectionner une réponse</div>'
            );
        return;
    } else {
        if (document.querySelector(".nogood")) {
            // Remove error message in div
            document.querySelector(".nogood").remove();
        }
    }
    const answer = document.querySelector(
        '#pop_question input[type="radio"]:checked'
    ).value;
    const correctAnswer = getSlideData(slideIndex).correct;
    if (answer == correctAnswer) {
        // Add correct message in div
        if (document.querySelector(".nogood")) {
            document.querySelector(".nogood").remove();
        }
        if (document.querySelector(".good")) {
            document.querySelector(".good").remove();
        }
        document
            .querySelector("#pop_question")
            .insertAdjacentHTML(
                "beforeend",
                '<div class="good" role="alert">Très bien !</div>'
            );
    } else {
        if (document.querySelector(".good")) {
            document.querySelector(".good").remove();
        }
        if (document.querySelector(".nogood")) {
            document.querySelector(".nogood").remove();
        }
        // Add incorrect message in div
        document
            .querySelector("#pop_question")
            .insertAdjacentHTML(
                "beforeend",
                '<div class="nogood" role="alert">Incorrect</div>'
            );
    }
};

const fontToggle = () => {
    var currentFont = document.querySelector("body");
    if (currentFont.style.fontFamily != "Braille") {
        currentFont.style.fontFamily = "Braille";
    } else {
        currentFont.style.fontFamily = "Arial";
    }
};

displayQuestion(slideIndex);

displayText(getSlideData(slideIndex).phrase_dame);

const validQuestions = document.querySelector("#validQuestions");

validQuestions.addEventListener("click", (e) => {
    e.preventDefault();
    checkAnswer(slideIndex);
});
