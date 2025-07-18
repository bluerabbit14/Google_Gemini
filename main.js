const typingForm=document.querySelector(".typing-form");
const chatList=document.querySelector(".chat-list");
// const suggestions=document.querySelector(".suggestion")
const toggleThemeButton=document.querySelector("#toggle-theme-button")
const deleteChatButton=document.querySelector("#delete-chat-button")

let userMessage=null;
let isResponseGenerating=false;

const API_KEY=""; //Enter your OpenRouter API key here
const API_URL = `https://openrouter.ai/api/v1`;  //Update this URL if needed as user needs 
const MODEL_NAME = "google/gemma-3n-e2b-it:free";  //Update this model as user your need

const loadLocalStorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText =isLightMode ? "dark_mode" : "light_mode";

    chatList.innerHTML = savedChats || "";


    document.body.classList.toggle("hide-header", savedChats);
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to the bottom
}

loadLocalStorageData();

//create a new message element and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//show typingeffect by displaying words one by one 
const showTypingEffect =(text, textElement, incomingMessageDiv) => {
    const words =text.split(' ');
    let currentWordIndex = 0;
    const typingInterval = setInterval(() => {
        //append each word to the text element with a space
        textElement.innerText += (currentWordIndex === 0? '' : ' ') +words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        //if all words are displayed
        if(currentWordIndex === words.length) {
            isResponseGenerating=false;
            clearInterval(typingInterval);
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML);
        }
            chatList.scrollTo(0, chatList.scrollHeight); // scroll to the bottom
    },75);
}

//fetch response from api based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text");

    // Send a POST request to OpenRouter API with embedded API key, URL, and model name
    try {
        const response = await fetch(API_URL + "/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    { role: "user", content: userMessage }
                ]
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "API Error");

        // OpenRouter returns choices[0].message.content
        const apiResponse = data?.choices?.[0]?.message?.content?.replace(/\*\*(.*?)\*\*/g, '$1') || "";
        showTypingEffect(apiResponse, textElement, incomingMessageDiv);
    } catch (error) {
        isResponseGenerating = false;
        textElement.innerText = error.message;
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}

//show animation while waiting
const showLoadingAnimation = () => {
    const html=`<div class="message-content">
                <img src="gemini.svg" alt="gemini Image" class="avatar">
                <p class="text"></p>
                <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
                </div> 
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight); // scroll to the bottom
    generateAPIResponse(incomingMessageDiv);
} 

const copyMessage = (copyIcon) => {
    const MessageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(MessageText);
    copyIcon.innerText = "done";
    setTimeout(() => copyIcon.innerText = "content_copy",1000); //revert icon after 1 sec
}

//handle sending outgoing chat messages
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim() /*|| userMessage */;
    if(!userMessage || isResponseGenerating) return;
    isResponseGenerating=true;
    
    const html=`<div class="message-content">
                <img src="asif.jpg" alt="user Image" class="avatar">
                <p class="text"></p>
                </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText =userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();
    chatList.scrollTo(0, chatList.scrollHeight); // scroll to the bottom
    document.body.classList.add("hide-header");// hide the header once chat start
    setTimeout(showLoadingAnimation, 500);  //show loading animation after a delay
}
/*
//set usermessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion => {
    suggestion.addEventListener("click", () => {
        userMessage = suggestion.querySelector(".text").innerText;
        handleOutgoingChat();
    })
})
      */


//toggle between dark and light
toggleThemeButton.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode");
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
    toggleThemeButton.innerText =isLightMode ? "dark_mode" : "light_mode";
});

//delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
    if(confirm("Are you sure you want to delete all messages?"))
    {
        localStorage.removeItem("savedChats");
        loadLocalStorageData();
    }
});


typingForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleOutgoingChat();
})
