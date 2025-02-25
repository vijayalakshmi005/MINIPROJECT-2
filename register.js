let isRecognitionActive = false;

// Function to prompt the user and start voice recognition
function promptAndRecognize(promptText, fieldId) {
    if (!isRecognitionActive) {
        speak(promptText, () => startRecognition(fieldId));
    }
}

// Function to speak a given text
function speak(text, callback = null) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';

    speech.onend = function () {
        if (callback) callback();
    };

    window.speechSynthesis.speak(speech);
}

// Function to start voice recognition
function startRecognition(fieldId) {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    if (isRecognitionActive) return;

    isRecognitionActive = true;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        if (event.results.length > 0) {
            const transcript = event.results[0][0].transcript.trim(); // Trim whitespace
            console.log('Transcript:', transcript); // Log the transcript for debugging

            // Replace spoken words with symbols
            let formattedTranscript = transcript
                .replace(/ at /g, '@') // Replace "at" with "@"
                .replace(/ dot /g, '.'); // Replace "dot" with "."

            document.getElementById(fieldId).value = formattedTranscript; // Assign the formatted transcript to the input field
            isRecognitionActive = false;

            // Provide feedback if the password field is filled
            if (fieldId === 'password') {
                speak('Press Enter to login.');
            }
        }
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error); // Log the error for debugging
        alert('Speech recognition error. Please try again.');
        isRecognitionActive = false;
    };

    recognition.onend = function () {
        isRecognitionActive = false; // Reset the recognition state when it ends
    };

    recognition.start();
}


function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "./preferences.html";
}


document.getElementById('signupForm').addEventListener('submit', handleSubmit);
