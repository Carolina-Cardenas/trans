// Your Google API keys

const speechApiKey = 'AIzaSyD2TRwYImxxRFc58hQSEy4NPyaUp1xBnsU';

const translationApiKey = 'AIzaSyA3Xzoexhj-EQkmd3ka2AeBJ1rBchJICq0';

 

// DOM elements

const startButton = document.getElementById('start');

const stopButton = document.getElementById('stop');

const transcriptionElement = document.getElementById('transcription');

const translationElement = document.getElementById('translation');

 

// Setup for Speech Recognition

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'sv-SE'; // Swedish

 

let finalTranscript = '';

 

// Handle results from Speech Recognition

recognition.onresult = (event) => {

    finalTranscript = event.results[0][0].transcript;

    transcriptionElement.textContent = finalTranscript;

    translateText(finalTranscript);

};

 

// Start and Stop functions

startButton.addEventListener('click', () => {

    recognition.start();

});

 

stopButton.addEventListener('click', () => {

    recognition.stop();

});

 

// Function to translate text

function translateText(text) {

    const url = `https://translation.googleapis.com/language/translate/v2?key=${translationApiKey}`;

    const data = {

        q: text,

        source: 'sv',

        target: 'es',

        format: 'text'

    };

 

    fetch(url, {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)

    })

    .then(response => response.json())

    .then(data => {

        const translatedText = data.data.translations[0].translatedText;

        translationElement.textContent = translatedText;

    })

    .catch(error => console.error('Error translating text:', error));

}

 