const chatMessagesDiv = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');

function sendMessage() {
    const userMessage = userMessageInput.value;

    // Add user message to the chat window
    appendMessage('user', userMessage);

    // Send user message to the server

    sendUserMessage(userMessage);

    // Clear the user input
    userMessageInput.value = '';
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
}

// Attach the handleKeyPress function to the input field
userMessageInput.addEventListener('keypress', handleKeyPress);
