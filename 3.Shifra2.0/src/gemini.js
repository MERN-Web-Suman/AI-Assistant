
let apiKey="AIzaSyAWqc2ETdqVK2ga8ejpOE3wNsr_hItNkno"



 import {
   GoogleGenerativeAI,
   HarmCategory,
   HarmBlockThreshold,
 } from "@google/generative-ai";


 const genAI = new GoogleGenerativeAI(apiKey);

 const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
 });

  const generationConfig = {
    temperature:1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens:20,
    responseMimeType: "text/plain",
  }

  async function run(prompt) {
    const chatSession = model.startChat({
          generationConfig,
          history: [
          ],
    });

    const result = await chatSession.sendMessage(prompt);
       return result.response.text();
  }

  export default run;



// import {
//   GoogleGenAI,
//   createUserContent,
//   createPartFromUri,
// } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:"AIzaSyAWqc2ETdqVK2ga8ejpOE3wNsr_hItNkno" });

// async function main() {
//   const image = await ai.files.upload({
//     file: "/path/to/organ.png",
//   });
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: [
//       createUserContent([
//         "Tell me about this instrument",
//         createPartFromUri(image.uri, image.mimeType),
//       ]),
//     ],
//   });
//   console.log(response.text);
// }

//  export default main;