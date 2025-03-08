document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = userInput.value.trim();
    if (prompt === '') return;

    addMessage(prompt, 'user');
    userInput.value = '';

    addMessage('Generating image...', 'bot');

    try {
      const imageUrl = await generateImage(prompt);
      if (imageUrl) {
        addImage(imageUrl);
      } else {
        addMessage('Sorry, I could not generate an image.', 'bot');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      addMessage('An error occurred while generating the image.', 'bot');
    }
  });

  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `${sender}-message`);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addImage(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'bot-message');
    messageElement.appendChild(imageElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function generateImage(prompt) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/images/generations';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    return data.data[0].url;
  }
});
