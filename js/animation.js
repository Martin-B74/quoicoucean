function animateBubble() {
    const bubbles = document.querySelectorAll(".bubble");
  
    bubbles.forEach((bubble) => {
      const speed = Math.random() * 2 + 1; // Vitesse aléatoire entre 1 et 3
      let x = Math.random() * window.innerWidth-100; // Position X initiale aléatoire
      let y = window.innerHeight + 100; // Position Y initiale hors de l'écran
      const oscillation = Math.random() * 20 + 10; // Amplitude de l'oscillation horizontale
      const frequency = Math.random() * 0.02 + 0.01; // Fréquence de l'oscillation
  
      // Initialisation de la position
      bubble.style.left = `${x}px`;
      bubble.style.bottom = `${y}px`;
  
      function moveBubble() {
        y -= speed; // Déplacer vers le haut
        const offsetX = Math.sin(y * frequency) * oscillation; // Oscillation horizontale
        bubble.style.transform = `translate(${offsetX}px, ${y}px)`;
  
        // Réinitialisation quand la bulle dépasse le haut
        if (y < -100) {
          y = window.innerHeight + 100; // Remettre en bas
          x = Math.random() * window.innerWidth; // Nouvelle position horizontale aléatoire
          bubble.style.left = `${x}px`; // Appliquer la nouvelle position
        }
  
        requestAnimationFrame(moveBubble); // Continuer l'animation
      }
  
      moveBubble(); // Démarrer l'animation pour chaque bulle
    });
  }
  
  // Appeler la fonction quand la page est chargée
  window.onload = animateBubble;
  