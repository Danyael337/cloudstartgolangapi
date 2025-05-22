document.addEventListener('DOMContentLoaded', () => {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const winnerText = document.getElementById('winner-text');
    const totalGamesDisplay = document.getElementById('total-games');
    const totalWinsDisplay = document.getElementById('total-wins');

    // Load initial stats
    updateStats();

    // Add click event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const choice = button.dataset.choice;
            playGame(choice);
        });
    });

    async function playGame(playerChoice) {
        try {
            // Show loading state
            playerChoiceDisplay.textContent = '⌛';
            computerChoiceDisplay.textContent = '⌛';
            winnerText.textContent = 'Playing...';

            // Make API call
            const response = await fetch(`/api/play?yourSelection=${playerChoice}`);
            const data = await response.json();

            // Update display
            playerChoiceDisplay.textContent = getEmoji(playerChoice);
            computerChoiceDisplay.textContent = getEmoji(data.computerSelection);
            
            // Update winner text with appropriate styling
            winnerText.textContent = data.winner === 'Tie' 
                ? 'It\'s a tie!'
                : data.winner === 'You'
                    ? 'You win! 🎉'
                    : 'Computer wins! 🤖';

            // Update stats
            updateStats();
        } catch (error) {
            console.error('Error playing game:', error);
            winnerText.textContent = 'Error playing game. Please try again.';
        }
    }

    async function updateStats() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            
            totalGamesDisplay.textContent = data.totalGames;
            totalWinsDisplay.textContent = data.wins;
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    function getEmoji(choice) {
        switch (choice) {
            case 'STONE':
                return '🪨';
            case 'SCISSOR':
                return '✂️';
            case 'BAG':
                return '👜';
            default:
                return '❓';
        }
    }
}); 