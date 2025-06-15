import react from 'react';
import { useState, useEffect } from 'react';

export default function App() {

  let [data, setData] = useState([]);
  let [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch (
      'https://jsonplaceholder.typicode.com/photos'
    )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      setData(data.splice(0, 20));
    })
  },[])

  const onInputChange = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  }

  return (
    <div className="main">
      <div className="input-container">
        <input className="input" type="text" value={inputValue} onChange={onInputChange}/>
        </div>
      <div className="grid">
        {
          data.map((dataItem) => {
            if (dataItem.title.includes(inputValue)) {
              return (
                <div className="grid-item">
                  <img src={dataItem.url}/>
                  <span>{dataItem.title}</span>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}