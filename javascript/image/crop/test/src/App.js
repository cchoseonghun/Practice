import './App.css'
import { useState, useRef } from "react";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleChange = (e) => {
    const tempImagePath = URL.createObjectURL(e.target.files[0]);
    setImagePath(tempImagePath);
    showImage();
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const tempImagePath = URL.createObjectURL(e.dataTransfer.files[0]);
    setImagePath(tempImagePath);
    showImage();
  }

  const handleCrop = () => {
    setImagePath(croppedImage);
  }

  const showImage = () => {
    document.querySelector('.input-div').style.display = 'none';
    document.querySelector('.output-div').style.display = 'flex';
    document.querySelector('.crop-Btn').style.display = 'block';
  }

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="App">
      <div className="input-div" onDrop={handleDrop}>
        <p>여기로 이미지를 드래그하거나 <strong>클릭</strong>하세요.</p>
        <input type="file" className="file" onChange={handleChange} accept="image/jpeg, image/png, image/jpg"/>
      </div>

      <div className="output-div">
        <div className="canvas" id="canvas">
          {/* 기존 업로드한 이미지 */}
          {/* <img src={imagePath} alt='uploadImg'/> */}
          {/* crop 기능이 들어간 업로드한 이미지 */}
          <Cropper id='cropper' src={imagePath} crop={onCrop} ref={cropperRef} />
          {/* crop 후 이미지 */}
          {/* <img src={croppedImage} alt='cropped'/> */}
        </div>
      </div>

      <button className='crop-Btn' onClick={handleCrop}>Crop!</button>
    </div>
  );
}

export default App;
