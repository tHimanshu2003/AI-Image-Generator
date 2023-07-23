import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'

function App() {
  const [prompts, setPrompts] = useState("")
  const [result, setResult] = useState("")

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })

  delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration)

  const generateImage = async () => {
    try {
    const response = await openai.createImage({
      prompt: prompts,
      n: 1,
      size: "1024x1024",
    })
    setResult(response.data.data[0].url)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='app-main'>
        <h2>Generate Image using OpenAIApi</h2>
        <input className="app-input" type="text" placeholder='Type Something to Generate...' onChange={(e) => setPrompts(e.target.value)} />
        <button onClick={generateImage}>Generate</button>
        {result.length > 0 ? <img src={result} alt="Generated Image" /> : <></>}
      </div>
    </>
  )
}

export default App
