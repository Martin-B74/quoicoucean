const clicker = document.getElementById('clicker');
const scoreDisplay = document.getElementById('score');
let score = 0;
let popups = [];
const maxPopups = 10;
let oof_song = new Audio('../sounds/annoying-sound.mp3');
oof_song.volume = 0.01;
let win_song = new Audio('../sounds/win.mp3');
win_song.volume = 0.1;
const redirectLink = 'https://nuit.toastcie.dev/game';

function updateScore() {
    scoreDisplay.textContent = score;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    oof_song.play();
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

function stopAllAnimations() {
    clicker.style.animation = 'none';
    clicker.style.transition = 'none';

    popups.forEach(popup => {
        popup.style.animation = 'none';
        popup.style.transition = 'none';
    });

}

function displayWinImage() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    const victoryImage = document.createElement('img');
    victoryImage.src = '../img/win.png';
    victoryImage.alt = 'Victoire!';
    victoryImage.id = 'victoryImage';
    document.body.appendChild(victoryImage);

    const redirectButton = document.createElement('button');
    redirectButton.id = 'redirectButton';
    redirectButton.textContent = 'Click!';
    document.body.appendChild(redirectButton);

    overlay.style.display = 'block';
    victoryImage.style.display = 'block';
    redirectButton.style.display = 'block';

    stopAllAnimations();

    redirectButton.addEventListener('click', () => {
        window.location.href = redirectLink;
    });
}

function handleBodyClick(event) {
    if (event.target.closest('.popup')) return;

    if (event.target !== clicker && score > 0) {
        score--;
        updateScore();
    }

    if (score >= 15) {
        stopAllAnimations();
        displayWinImage();
        win_song.play();
    }
}

document.body.addEventListener('click', handleBodyClick);

spawnPopups();