const clicker = document.getElementById('clicker');
const scoreDisplay = document.getElementById('score');
let score = 0;
let popups = [];
const maxPopups = 10;
let audio = new Audio('../sounds/annoying-sound.mp3');
audio.volume = 0.01;
const redirectLink = 'https://nuit.toastcie.dev/game';

function updateScore() {
    scoreDisplay.textContent = score;
}

function moveElementSmoothly(element) {
    const newTop = Math.random() * 80 + '%';
    const newLeft = Math.random() * 80 + '%';

    element.style.top = newTop;
    element.style.left = newLeft;
}

clicker.addEventListener('mousemove', (e) => {
    const rect = clicker.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (
        mouseX > rect.left - 50 &&
        mouseX < rect.right + 50 &&
        mouseY > rect.top - 50 &&
        mouseY < rect.bottom + 50
    ) {
        setTimeout(() => moveElementSmoothly(clicker), 200);
    }
});

clicker.addEventListener('click', () => {
    score++;
    updateScore();
    moveElementSmoothly(clicker);
    audio.play();
});

function createPopup(text, link) {
    if (popups.length >= maxPopups) return;

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <h2>${text}</h2>
        <a href="${link}" target="_blank" class="donLink">Faire un don</a>
        <button class="closePopup">Fermer</button>
    `;
    document.body.appendChild(popup);
    popups.push(popup);
    moveElementSmoothly(popup);

    setInterval(() => moveElementSmoothly(popup), 2000);

    popup.querySelector('.closePopup').addEventListener('click', () => {
        popup.remove();
        popups = popups.filter(p => p !== popup);
    });

    popup.querySelector('.donLink').addEventListener('click', (event) => {
        score++;
        updateScore();
    });
}

const associations = [
    { text: "Protégez les océans avec Sea Shepherd", link: "https://www.seashepherd.fr/" },
    { text: "Rejoignez Surfrider Foundation", link: "https://www.surfrider.eu/" },
    { text: "Agissez pour les coraux avec Coral Guardian", link: "https://www.coralguardian.org/" },
    { text: "Dépolluez les océans avec Septième Continent", link: "https://www.septiemecontinent.com/" }
];

function spawnPopups() {
    setInterval(() => {
        const randomAssoc = associations[Math.floor(Math.random() * associations.length)];
        createPopup(randomAssoc.text, randomAssoc.link);
    }, 2000);
}

function handleBodyClick(event) {
    if (event.target.closest('.popup')) return;

    if (event.target !== clicker && score > 0) {
        score--;
        updateScore();
    }

    if (score >= 30) {
        window.location.href = redirectLink;
    }
}

document.body.addEventListener('click', handleBodyClick);

spawnPopups();