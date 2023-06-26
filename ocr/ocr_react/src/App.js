import Tesseract from 'tesseract.js';
import { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {
  const [log, setLog] = useState({status: 'default', progress: 0});
  const [imagePath, setImagePath] = useState("");
  const [result, setResult] = useState("");
 
  const handleChange = (event) => {
    console.log('first: ', event.target.files[0])
    const tempImagePath = URL.createObjectURL(event.target.files[0]);
    console.log('second: ', tempImagePath)
    setImagePath(tempImagePath);
    Tesseract.recognize(
      tempImagePath, 
      'eng+kor', 
      {logger: m => {
        setLog({
          status: m.status, 
          progress: Math.floor(m.progress.toFixed(2) * 100)
        })
      }}
    ).catch (err => {
      console.error(err);
    }).then(({ data: { text } }) => { 
      setResult(text); 
    })
  }

  return (
    <div className="App">
      <main className="App-main">
        <h3>이미지 업로드</h3>
        <img src={imagePath} className="upload_img" alt='upload_img'/>
        <input type="file" onChange={handleChange}/>

        <h3>인식 결과</h3>
        {'분류중 >>'} <ProgressBar label={`${log.progress}%`} now={log.progress} ></ProgressBar>
        <div className="text-box"><p>result: {result}</p></div>
      </main>
    </div>
  );
}

export default App;
