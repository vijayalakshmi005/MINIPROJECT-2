function rate(stars) {
    const starElements = document.querySelectorAll('.stars i');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
    localStorage.setItem('userRating', stars); 
}

function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function(e) {
            document.querySelector('.comments').value = e.results[0][0].transcript;
            localStorage.setItem('userComment', e.results[0][0].transcript); 
            recognition.stop();
        };
        recognition.onerror = function(e) {
            recognition.stop();
        };
    }
}

function submitFeedback() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';
    const msg = new SpeechSynthesisUtterance('Thank you for your feedback!');
    window.speechSynthesis.speak(msg);
    
    // Clear local storage after submission
    localStorage.removeItem('userComment');
    localStorage.removeItem('userRating');
}

// Load saved data on page load
window.onload = function() {
    const savedComment = localStorage.getItem('userComment');
    const savedRating = localStorage.getItem('userRating');
    
    if (savedComment) {
        document.querySelector('.comments').value = savedComment;
    }
    
    if (savedRating) {
        rate(savedRating);
    }
};


    function validateFeedback() {
        const comments = document.querySelector('.comments').value;
        if (comments.trim() === "") {
            alert("Please enter your comments before submitting.");
            return false;
        }
        return true;
    }

