import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react'; // Using lucide-react for icons

// Main App component
const App = () => {
  // State to store the chat history
  const [chatHistory, setChatHistory] = useState([]);
  // State to store the current message being typed by the user
  const [inputMessage, setInputMessage] = useState('');
  // State to manage the loading status during API calls
  const [isLoading, setIsLoading] = useState(false);
  // Ref to automatically scroll to the latest message
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat whenever chatHistory changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Function to display a toast notification
  const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-custom ${type} p-3 rounded-lg shadow-md mb-2 flex items-center space-x-2`;
    toast.innerHTML = `
      <span class="font-semibold">${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Automatically remove the toast after 4 seconds
    setTimeout(() => {
      toast.remove();
    }, 4000);
  };

  // Function to send a message to the Gemini API
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return; // Prevent sending empty messages or multiple messages

    const userMessage = { role: 'user', parts: [{ text: inputMessage }] };
    // Add user message to chat history immediately
    setChatHistory((prev) => [...prev, userMessage]);
    setInputMessage(''); // Clear input field
    setIsLoading(true); // Set loading state to true

    try {
      const payload = {
        contents: [...chatHistory, userMessage], // Send entire conversation history for context
      };
      
      // API key is left empty; Canvas will inject it at runtime.
      const apiKey = "AIzaSyBSxttHsKzd4OUMTd8bewQm8cNiPTkitDI";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorData.error.message || 'Unknown error'}`);
      }

      const result = await response.json();
      
      // Check if the response structure is as expected
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const modelResponseText = result.candidates[0].content.parts[0].text;
        const modelMessage = { role: 'model', parts: [{ text: modelResponseText }] };
        setChatHistory((prev) => [...prev, modelMessage]); // Add model's response to chat history
      } else {
        showToast('Received an unexpected response format from the AI.', 'error');
        console.error('Unexpected API response structure:', result);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      showToast(`Error: ${error.message}`, 'error');
      // If an error occurs, add an error message to the chat history
      setChatHistory((prev) => [...prev, { role: 'error', parts: [{ text: `Error: ${error.message}. Please try again.` }] }]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift+Enter for new line
      e.preventDefault(); // Prevent default new line behavior
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl flex flex-col h-[80vh] border-t-8 border-indigo-600">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center justify-between shadow-md">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot size={28} /> Gemini Chat
          </h1>
          <span className="text-sm opacity-80">Powered by Google Gemini API</span>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg">Start a conversation!</p>
              <p className="text-sm">Type your message below and press Enter.</p>
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : msg.role === 'model'
                    ? 'bg-gray-200 text-gray-800 rounded-bl-none'
                    : 'bg-red-100 text-red-700 border border-red-300 rounded-lg' // Error message styling
                }`}
              >
                <div className="flex items-center mb-1">
                  {msg.role === 'user' ? (
                    <User size={16} className="mr-2" />
                  ) : msg.role === 'model' ? (
                    <Bot size={16} className="mr-2" />
                  ) : null}
                  <span className="font-semibold">
                    {msg.role === 'user' ? 'You' : msg.role === 'model' ? 'Gemini' : 'Error'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>
            </div>
          ))}
          {/* Loading indicator message */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-xl shadow-sm bg-gray-200 text-gray-800 rounded-bl-none flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                <span>Gemini is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>

        {/* Message Input Area */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center gap-3">
          <textarea
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-12 overflow-hidden"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            disabled={isLoading}
          ></textarea>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col-reverse items-end"></div>
    </div>
  );
};

export default App;
// Ensure to include the necessary CSS for the custom scrollbar and toast notifications