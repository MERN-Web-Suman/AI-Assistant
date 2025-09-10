import React from 'react'
import "./App.css"
import va from "./assets/wp13327460.jpg"
import { CiMicrophoneOn } from "react-icons/ci";
import { useContext } from 'react';
import { datacontext } from './context/UserContext';
import laugh from "./assets/sealaugh.gif"
import aiimg from "./assets/aivoice.gif"

export default function App() {
  
 let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}= useContext(datacontext)
 


  return (
    <div className='main' >
       <img src={va} alt="" id='shifra' />
       <span>I'm Shifra, You Advanced Virtual Assistant</span>
       {!speaking ? <button onClick={()=>{
          setPrompt("Listings....")
        setSpeaking(true)
        setResponse(false)
        recognition.start()}} >Click here <CiMicrophoneOn /> </button>
        :
        <div className='response' >
          {!response ? <img src={laugh} alt="" id='speak' /> 
          : <img src={aiimg} alt="" id='aigif' />
          }
          
          <p>{prompt} </p>
        </div>
         }
       
    </div>
  )
}
