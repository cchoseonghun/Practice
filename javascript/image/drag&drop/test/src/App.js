import './App.css'
import { useState } from "react";

function App() {
  const [imagePath, setImagePath] = useState("");

  const handleChange = (e) => {
    const tempImagePath = URL.createObjectURL(e.target.files[0]);
    setImagePath(tempImagePath);
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const tempImagePath = URL.createObjectURL(e.dataTransfer.files[0]);
    setImagePath(tempImagePath);
  }

  return (
    <div className="App">
      <div className="input-div" onDrop={handleDrop}>
        <p>여기로 이미지를 드래그하거나 <strong>클릭</strong>하세요.</p>
        <input type="file" className="file" onChange={handleChange} accept="image/jpeg, image/png, image/jpg"/>
      </div>
      <output>
        <div className="image">
          <img src={imagePath} alt='uploadImg'/>
        </div>
      </output>
    </div>
  );
}

export default App;
