import { useState, useEffect } from 'react'
import './App.css'

function App() {

  let [arrayData, setArrayData] = useState([]);
  let [inputText, setInputText] = useState("");
 
  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/photos'
    )
    .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
    })
    .then((data) => {
      console.log(data.slice(0, 20));
      setArrayData(data.slice(0, 20));
    })
  },[]);

  useEffect(() => {
    console.log(inputText);
  },[inputText])

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className="main">
      <div className="input-containter">
        <input type="text" value={inputText} onChange={handleInputChange}/>
      </div>
      <div className="grid">
        {arrayData.map((e) => {
          if (e.title.includes(inputText)) {
            return (
              <div>
                <img src={e.url}/>
                <span>{e.title}</span>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default App
