const chatMessagesDiv = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');
const randomImage = document.getElementById('random-image');

function sendMessage() {
    const userMessage = userMessageInput.value;

    // Add user message to the chat window
    appendMessage('user', userMessage);

    // Send user message to the server

    sendUserMessage(userMessage);

    // Clear the user input
    userMessageInput.value = '';
}
// Function to display a random image
function displayRandomImage() {
    const imagePaths = [
        './images/1.png',
        './images/2.png',
        './images/3.png',
        './images/3.png',
        './images/4.png',
    ];

    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    //test: https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec
    randomImage.src = 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec';
}
function sendUserMessage(message) {
    fetch('http://localhost:3000/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then(response => response.json())
        .then(data => {
            // Add AI response to the chat window
            appendMessage('ai', data.aiResponse);
            
            // Display a random image
            displayRandomImage();
        })
        .catch(error => {
            console.error('Error sending message to the server:', error);
        });
    // Clear the user input
    userMessageInput.value = '';
}


function generateAIResponse(userInput) {
    // Replace this with your logic to interact with GPT or any other AI model
    // For now, let's keep it simple
    return `Sure! Let me help you with ${userInput}.`;
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;

    chatMessagesDiv.appendChild(messageDiv);

    // Scroll to the bottom of the chat window
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
    else {
        userMessageInput.focus();
    }
}

// Attach the handleKeyPress function to the input field
addEventListener('keypress', handleKeyPress);
