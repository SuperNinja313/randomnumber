var lastRandomNumber = null;
var animationDuration = 250; // Set the duration of the rolling animation in milliseconds
var cooldownDuration = 2000; // Set the cooldown duration in milliseconds
var isButtonCooldown = false;

function generateRandomNumber() {
    return Math.floor(Math.random() * 6000) + 1;
}

function animateRollingNumber(targetNumber) {
    var startingNumber = lastRandomNumber || 0;
    var currentTime = 0;
    var increment = 50; // Time interval for each step of the animation in milliseconds

    function roll() {
        currentTime += increment;
        var progress = currentTime / animationDuration;
        var currentNumber = Math.floor(startingNumber + (targetNumber - startingNumber) * progress);

        // Display the current rolling number
        var rollingNumberElement = document.getElementById('rollingNumber');
        rollingNumberElement.textContent = 'Rolling Number: ' + currentNumber;

        if (currentTime < animationDuration) {
            setTimeout(roll, increment);
        } else {
            // Update the last generated number with the target number
            lastRandomNumber = targetNumber;
            rollingNumberElement.textContent = 'Number Rolled: ' + targetNumber;

            // Reset the button cooldown after the animation finishes
            isButtonCooldown = false;
        }
    }

    roll();
}

function drawRandomNumber() {
    // Check if the button is in the cooldown state
    if (isButtonCooldown) {
        return; // Do nothing if the button is on cooldown
    }

    // Set the button in cooldown state to prevent spamming rolls
    isButtonCooldown = true;

    var randomNumber;

    // Generate a new random number that is not the same as the last one
    do {
        randomNumber = generateRandomNumber();
    } while (randomNumber === lastRandomNumber);

    // Start the rolling animation
    animateRollingNumber(randomNumber);

    // After the animation finishes and cooldown period, reset the button to allow rolling again
    setTimeout(function () {
        isButtonCooldown = false;
    }, animationDuration + cooldownDuration);
}
