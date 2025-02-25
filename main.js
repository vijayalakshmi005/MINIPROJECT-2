document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const numberOfOptions = options.length;

    // Greet the user and announce the number of options
    const greetingMessage = `Welcome! happy to see you! .  You have ${numberOfOptions} options available. navigate using tab button if you click tab one time then press enter to live news , 2 time for songs , 3 times for live matches , 4 times for educational content , and 5 times for health care bot . i'll Wait for your response .`;
    speak(greetingMessage);
    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedOption = option.textContent;
            speak(`You selected ${selectedOption}.`);
            handleButtonClick(selectedOption);
        });
    });
});

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

function handleButtonClick(option) {
    switch (option) {
        case 'LIVE NEWS':
            window.location.href = 'news.html';
            break;
        case 'LISTEN SONGS':
            window.location.href = 'songs.html';
            break;
        case 'LIVE MATCHES':
            window.location.href = 'matches.html';
            break;
        case 'EDUCATION':
            window.location.href = 'education.html';
            break;
        case 'HEALTH':
            window.location.href = 'health.html';
            break;
        default:
            speak("Option not recognized.");
    }
}

function proceedToNextPage() {
    window.location.href = './feedback.html';
}

// Ensure the sendButton exists before adding the event listener
const sendButton = document.getElementById('sendButton');
if (sendButton) {
    sendButton.addEventListener('click', function() {
        const userInput = document.getElementById('userInput').value;
        if (userInput.trim() === "") return; // Prevent empty messages

        // Append user message
        const chatMessages = document.getElementById('chatMessages'); // Fixed variable name
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.textContent = userInput;
        chatMessages.appendChild(userMessageDiv);

        // Simulate bot response (you can replace this with actual bot logic)
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.textContent = "You said: " + userInput; // Simple echo response
        chatMessages.appendChild(botMessageDiv);

        // Clear input
        document.getElementById('userInput').value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    });
}

// Speech recognition setup
document.getElementById('voiceInputButton').addEventListener('click', function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const userInput = event.results[0][0].transcript;
        document.getElementById('userInput').value = userInput; // Set the input field with the recognized text
        document.getElementById('sendButton').click(); // Trigger the send button
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
        speak("Sorry, I didn't catch that. Please try again."); // User feedback for errors
    };
});

// Show input area
document.getElementById('showInputButton').addEventListener('click', function() {
    document.getElementById('inputArea').style.display = 'flex'; // Show the input area
    document.getElementById('userInput').focus(); // Focus on the input field
});