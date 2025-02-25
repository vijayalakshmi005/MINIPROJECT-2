
let isRecognitionActive = false;


function promptAndRecognize(promptText, fieldId) {
    
    if (!isRecognitionActive) {
        speak(promptText, () => startRecognition(fieldId));
    }
}


function speak(text, callback = null) {
    const speech = new SpeechSynthesisUtterance(text); 
    speech.lang = 'en-US'; 
    
    speech.onend = function () {
        if (callback) callback(); 
    };

    window.speechSynthesis.speak(speech); 
}


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
        const transcript = event.results[0][0].transcript; 
        document.getElementById(fieldId).value = transcript; 
        isRecognitionActive = false; 

       
        if (fieldId === 'password') {
            speak('Press Enter to login.');
        }
    };

   
    recognition.onerror = function () {
        alert('Speech recognition error. Please try again.');
        isRecognitionActive = false; 
    };

    recognition.start(); 
}


function handleSubmit(event) {
    event.preventDefault(); 
    window.location.href = "./preferences.html"; 
}
