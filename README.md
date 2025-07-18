# Google Gemini AI Chat Web App

An interactive, modern web application that leverages the Google Gemini (Gemma) AI model via the OpenRouter API to provide a seamless chat experience. This project features a beautiful UI, theme switching, persistent chat history, and more.

## Features

- **Conversational AI**: Chat with the Gemini (Gemma) model using natural language.
- **Modern UI**: Responsive, clean interface with dark and light mode support.
- **Theme Toggle**: Instantly switch between dark and light themes; your preference is saved.
- **Persistent Chat**: Chat history is saved in your browser's local storage.
- **Quick Suggestions**: Start a conversation with one-click prompt suggestions.
- **Copy Responses**: Easily copy any AI response to your clipboard.
- **Clear Chat**: Delete all messages with a single click.
- **Typing Animation**: Realistic typing effect for AI responses.
- **Mobile Friendly**: Fully responsive for all device sizes.

## Screenshots

![Gemini Chat Screenshot](gemini.svg)

## Demo

> _To run locally, see instructions below._

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, etc.)
- An [OpenRouter](https://openrouter.ai/) API key (free tier available)

### Installation

1. **Clone or Download** this repository:
   ```sh
   git clone https://github.com/bluerabbit14/Google_Gemini.git
   cd Google_Gemini
   ```
2. **Add Your API Key**:
   - Open `main.js` and set your OpenRouter API key in the `API_KEY` variable:
     ```js
     const API_KEY = "your-openrouter-api-key";
     ```
3. **(Optional) Change Model**:
   - You can change the `MODEL_NAME` in `main.js` to any supported by OpenRouter (e.g., `google/gemini-pro` or others).

### Running the App

Just open `main.html` in your browser. No build or server required!

## Usage

1. Enter your prompt in the input box and press **Send**.
2. Click on any suggestion to quickly start a conversation.
3. Toggle between dark and light mode using the sun/moon icon.
4. Copy any AI response using the copy icon.
5. Delete all chats with the trash icon (this clears local storage).

## Customization

- **Avatar Images**: Replace `asif.jpg` (user) and `gemini.svg` (AI) with your own images if desired.
- **Styling**: Modify `main.css` for custom colors, fonts, or layout.
- **API/Model**: Update `API_URL` and `MODEL_NAME` in `main.js` to use a different provider or model.

## Project Structure

```
Google_Gemini/
├── asif.jpg           # User avatar
├── gemini.svg         # Gemini AI avatar
├── main.html          # Main web page
├── main.css           # Stylesheet
├── main.js            # App logic (frontend)
├── package.json       # Project metadata (for Node.js, not required for web)
└── README.md          # This file
```

## How It Works

- The app sends user prompts to the OpenRouter API using fetch (see `main.js`).
- The response from the Gemini (Gemma) model is displayed with a typing animation.
- All chat messages are saved in local storage for persistence.
- Theme preference is also saved in local storage.

## Dependencies

- [Google Fonts: Poppins](https://fonts.google.com/specimen/Poppins)
- [Material Symbols](https://fonts.google.com/icons)
- [OpenRouter API](https://openrouter.ai/)

## Credits

- UI/UX inspired by modern AI chat apps.
- Developed by [bluerabbit14](https://github.com/bluerabbit14).

## License

This project is licensed under the ISC License. See [LICENSE](LICENSE) for details.

---

**Disclaimer:** Gemini may display inaccurate information, including about people. Always double-check responses.
