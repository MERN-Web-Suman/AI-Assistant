
import React, { createContext, useState } from 'react'
import run from '../gemini';
 export const datacontext = createContext()

export default function UserContext({children}) {

    let [speaking,setSpeaking] = useState(false)
    let [prompt,setPrompt] = useState("listening...")
    let [response,setResponse] = useState(false)

    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak)
    }

     async function aiResponse(prompt){
        let text = await run(prompt);
        let newText = text.split("**")&&text.split("*")&&text.replace("google","Suman Developer")&&text.replace("Google","Suman Developer")

        setPrompt(newText)
        speak(newText)
        setResponse(true)
        setTimeout(()=>{
        setSpeaking(false)
        },5000)
        
     } 
    
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex=e.resultIndex
        let transcript=e.results[currentIndex][0].transcript;

        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    };

function takeCommand(command) {
  const sites = {
    youtube: "https://www.youtube.com/",
    google: "https://www.google.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  };

  command = command.toLowerCase();

  // OPEN website
  if (command.includes("open")) {
    let found = false;
    for (let key in sites) {
      if (command.includes(key)) {
        window.open(sites[key], "_blank");
        speak(`Opening ${key}`);
        setPrompt(`Opening ${key}...`);
        found = true;
        break;
      }
    }

    if (!found) {
      const searchQuery = command.replace("open", "").trim();
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.open(googleSearchUrl, "_blank");
      speak(`Searching ${searchQuery} on Google`);
      setPrompt(`Searching ${searchQuery} on Google...`);
    }
  }

  // SEARCH on Google
  else if (command.includes("search")) {
    const searchQuery = command.replace("search", "").trim();
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, "_blank");
    speak(`Searching ${searchQuery}`);
    setPrompt(`Searching ${searchQuery}...`);
  }

  // PLAY on YouTube
  else if (command.includes("play")) {
    const searchQuery = command.replace("play", "").trim();
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeSearchUrl, "_blank");
    speak(`Playing ${searchQuery} on YouTube`);
    setPrompt(`Playing ${searchQuery} on YouTube...`);
  }

  // TIME
  else if (command.includes("time")) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    speak(`Current time is ${time}`);
    setPrompt(`⏰ ${time}`);
  }

  // DATE
  else if (command.includes("date")) {
    const now = new Date();
    const date = now.toDateString();
    speak(`Today's date is ${date}`);
    setPrompt(`📅 ${date}`);
  }

  else {
    aiResponse(command);
  }

  setTimeout(() => {
    setSpeaking(false);
  }, 4000);
}



   let value ={
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
   }

  return (
    <div>
        <datacontext.Provider value={value} > 
           {children}
        </datacontext.Provider>
    </div>
  )
}
