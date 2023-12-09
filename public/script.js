const chatMessagesDiv = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');

function sendMessage() {
    const userMessage = userMessageInput.value;

    // Add user message to the chat window
    appendMessage('user', userMessage);

    // You can replace this with your own logic to interact with GPT or any other AI model
    // For now, let's keep it simple
    const aiResponse = generateAIResponse(userMessage);

    // Add AI response to the chat window
    appendMessage('ai', aiResponse);

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
