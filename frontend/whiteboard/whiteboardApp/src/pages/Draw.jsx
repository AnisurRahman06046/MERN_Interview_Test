import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Draw() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [shapeType, setShapeType] = useState("line"); // 'line' or 'circle'
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(""); // New state for title error
  const navigate = useNavigate();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape) => {
        ctx.beginPath();
        if (shape.type === "line") {
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
        } else if (shape.type === "circle") {
          const radius = Math.sqrt(
            Math.pow(shape.endX - shape.startX, 2) +
              Math.pow(shape.endY - shape.startY, 2)
          );
          ctx.arc(shape.startX, shape.startY, radius, 0, Math.PI * 2);
        }
        ctx.strokeStyle = shape.color || "black";
        ctx.lineWidth = shape.width || 2;
        ctx.stroke();
      });
    };

    drawShapes();
  }, [shapes]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setCurrentShape({
      startX,
      startY,
      endX: startX,
      endY: startY,
      type: shapeType,
      color: "black",
      width: 2,
    });
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;
      setCurrentShape((prevShape) => ({
        ...prevShape,
        endX,
        endY,
      }));
    }
  };

  const handleMouseUp = () => {
    if (drawing) {
      setShapes((prevShapes) => [...prevShapes, currentShape]);
      setDrawing(false);
      setCurrentShape(null);
    }
  };

  const handleSave = async () => {
    if (!title) {
      setTitleError("Title is required");
      return;
    }

    setTitleError(""); // Clear the error if title is valid

    const payload = { title, shapes };
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/api/v1/drawings/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    console.log(result);
    if (response.ok) navigate("/");
  };

  return (
    <div>
      <h1>Create Drawing</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          borderColor: titleError ? "red" : "#ccc",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      />
      {titleError && (
        <p style={{ color: "red", fontSize: "14px" }}>{titleError}</p>
      )}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setShapeType("line")}
          style={{
            backgroundColor: shapeType === "line" ? "#4CAF50" : "#e7e7e7",
            color: shapeType === "line" ? "white" : "black",
            padding: "10px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Draw Line
        </button>
        <button
          onClick={() => setShapeType("circle")}
          style={{
            backgroundColor: shapeType === "circle" ? "#4CAF50" : "#e7e7e7",
            color: shapeType === "circle" ? "white" : "black",
            padding: "10px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Draw Circle
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px",
          margin: "10px 0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleSave}
      >
        Save Drawing
      </button>
    </div>
  );
}

export default Draw;
