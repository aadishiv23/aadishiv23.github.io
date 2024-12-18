const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('overlay');
let isAnimating = false;

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (isAnimating) return;

        const cardId = card.getAttribute('data-card-id');
        const existingExpandedCard = document.querySelector('.card.expanded');

        // If the clicked card is already expanded, collapse it
        if (existingExpandedCard && existingExpandedCard.getAttribute('data-card-id') === cardId) {
            closeExpandedCard(existingExpandedCard);
            return;
        }

        // Prevent multiple cards from expanding simultaneously
        if (existingExpandedCard) {
            closeExpandedCard(existingExpandedCard, () => {
                openExpandedCard(card);
            });
            return;
        }

        // Open the clicked card
        openExpandedCard(card);
    });
});

// Function to open the expanded card
function openExpandedCard(card) {
    isAnimating = true;
    overlay.classList.add('active');
    document.body.classList.add('no-scroll'); // Prevent background scrolling

    // Clone the clicked card
    const clonedCard = card.cloneNode(true);
    clonedCard.classList.add('expanded');
    clonedCard.style.transition = 'none'; // Remove transitions to set initial position

    // Add close button to the cloned card
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = "×";
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('title', 'Close');

    // Close button event listener
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closeExpandedCard(clonedCard);
    });

    clonedCard.appendChild(closeButton);
    document.body.appendChild(clonedCard);

    // Force reflow to apply initial styles before adding the expanding class
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            clonedCard.classList.add('expanding');
            clonedCard.style.transition = ''; // Re-enable transitions
            isAnimating = false;
        });
    });

    // Optionally, you can add smooth transition for details
    setTimeout(() => {
        const details = clonedCard.querySelector('.details');
        if (details) {
            details.style.maxHeight = '500px';
            details.style.opacity = '1';
        }
    }, 450);
}

// Function to close the expanded card
function closeExpandedCard(card, callback) {
    if (isAnimating) return;
    isAnimating = true;

    card.classList.remove('expanding');
    card.style.transform = `translateX(-50%) translateY(100%)`;

    setTimeout(() => {
        card.classList.remove('expanded');
        const closeButton = card.querySelector('.close-button');
        if (closeButton) closeButton.remove();
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Re-enable background scrolling
        card.remove(); // Remove the cloned card from the DOM
        isAnimating = false;

        if (callback && typeof callback === 'function') {
            callback();
        }
    }, 400); // Duration matches the CSS transition
}

// Overlay click to close any expanded card
overlay.addEventListener('click', () => {
    const openedCard = document.querySelector('.card.expanded');
    if (openedCard) {
        closeExpandedCard(openedCard);
    }
});