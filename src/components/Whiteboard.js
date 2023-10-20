import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/whiteboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faEraser } from '@fortawesome/free-solid-svg-icons';

const colors = [
  '#000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080'
];

function Whiteboard() {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState('#000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [brushSize, setBrushSize] = useState(2);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = getMousePosition(canvas, e);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      setPrevX(offsetX);
      setPrevY(offsetY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;

      const { offsetX, offsetY } = getMousePosition(canvas, e);

      ctx.strokeStyle = isErasing ? '#FFFFFF' : currentColor;
      ctx.lineCap = 'round';
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();

      setPrevX(offsetX);
      setPrevY(offsetY);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, isErasing, currentColor, prevX, prevY, brushSize]);

  const handleColorChange = (event) => {
    setCurrentColor(event.target.value);
    setIsErasing(false);
  };

  const handleEraserClick = () => {
    setIsErasing(true);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'sketch.png';
    a.click();
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(Number(event.target.value));
  };

  const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    return { offsetX, offsetY };
  };

  return (
    <div>
    <nav className="navbar navbar-light navbar-expand-lg">
        <div className="container d-flex flex-row">
          <a className="navbar-brand" href="#">StudyBuddies</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav m-auto my-2 my-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" href="/classes">StudyRoom</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/todos">Study Goals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/whiteboard" >
                  Whiteboard
                </a>
               
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ide">Code Editor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/files">Files </a>
              </li>
              

            </ul>
           
          </div>
        </div>
      </nav>
    <div className="white" style={{backgroundColor:'#B9D9EB'}} >
      <main>
        <div className="background-container "  >
          <div className="color-palette">
            <input type="color" value={currentColor} onChange={handleColorChange} />
            <button onClick={handleEraserClick}>
              <FontAwesomeIcon icon={faEraser} /> Eraser
            </button>
            <input
              type="range"
              value={brushSize}
              min="1"
              max="10"
              onChange={handleBrushSizeChange}
            />
            <button onClick={handleSaveCanvas}>
              <FontAwesomeIcon icon={faPaintBrush} /> Save
            </button>
            <button onClick={handleClearCanvas}>
              <FontAwesomeIcon icon={faPaintBrush} /> Clear
            </button>
            <div className="additional-colors">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                ></div>
              ))}
            </div>
            
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="whiteboard-canvas"
          style={{backgroundColor:'white'}}
        ></canvas>
      </main>
    </div>
    </div>
  );
}

export default Whiteboard;