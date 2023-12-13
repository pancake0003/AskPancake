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
        'https://raw.githubusercontent.com/pancake0003/AskPancake/main/images/1.png',
        'https://raw.githubusercontent.com/pancake0003/AskPancake/main/images/2.png',
        'https://raw.githubusercontent.com/pancake0003/AskPancake/main/images/3.png',
        'https://raw.githubusercontent.com/pancake0003/AskPancake/main/images/4.png',
        'https://raw.githubusercontent.com/pancake0003/AskPancake/main/images/5.png',
    ];

    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    //test: https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec
    randomImage.src = randomImagePath;
}
function sendUserMessage(message) {
    //fetch from http://24.144.64.246:4000/SendMessage if using digital console
    //fetch('http://localhost:4000/SendMessage', {
    fetch('http://24.144.64.246:4000/SendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        // Check if AI response contains rate limit message
        if (data.aiResponse.includes('Rate limit exceeded')) {
          // Display rate limit message in the user input box
          userMessageInput.value = data.aiResponse;
        } else {
          // Add AI response to the chat window
          appendMessage('ai', data.aiResponse);
  
          // Display a random image
          displayRandomImage();
        }
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
