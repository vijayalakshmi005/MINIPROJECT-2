let timeout;
let isAudioEnabled = false;

window.onload = function() {
    startTimeout();
};

function setPreference(preference) {
    clearTimeout(timeout);
    localStorage.setItem('accessibilityPreference', preference);

    if (preference === 'audio') {
        isAudioEnabled = true;
        document.getElementById('instruction-prompt').style.display = 'block';
        document.getElementById('target-button').style.visibility = 'visible';
        speak("Press Tab to highlight the button, then press Enter.");
    } else {
        document.getElementById('instruction-prompt').style.display = 'block';
        document.getElementById('target-button').style.visibility = 'visible';
    }
}

function startTimeout() {
    timeout = setTimeout(() => {
        if (!isAudioEnabled) {
            speak("If you want to enable audio instructions, press tabb  two time and click enter.'.");
            
        }
    }, 1000);
}

function startVoiceRecognitionForAudioPreference() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('yes, i need')) {
            setPreference('audio');
        }
    };

    recognition.onerror = function() {
        alert('Voice recognition error. Please try again.');
    };

    recognition.start();
}

function completeTask() {
    speak("You clicked the button! Press Enter to enable Proceed.");
    document.getElementById('proceed-button').disabled = false;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            speak("Proceeding to the next page.");
            proceedToNextPage();
        }
    });
}

function proceedToNextPage() {
    window.location.href = './main.html';
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}
