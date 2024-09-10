import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditDrawing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(null);
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [currentTool, setCurrentTool] = useState("line");
  const [eraserSize, setEraserSize] = useState(20);
  const [title, setTitle] = useState(""); // State for title

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/v1/drawings/drawing/${id}`
        );
        const result = await response.json();
        setDrawing(result.data || null);
        if (result.data) {
          setLines(result.data.lines || []);
          setShapes(result.data.shapes || []);
          setTitle(result.data.title || ""); // Set title from the fetched data
        }
      } catch (error) {
        console.error("Error fetching drawing:", error);
      }
    };

    fetchDrawing();
  }, [id]);

  useEffect(() => {
    if (drawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color || "black";
        ctx.lineWidth = line.width || 2;
        ctx.stroke();
      });

      shapes.forEach((shape) => {
        if (shape.type === "circle") {
          const radius = Math.abs(shape.endX - shape.startX);
          ctx.beginPath();
          ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = shape.color || "black";
          ctx.lineWidth = shape.width || 2;
          ctx.stroke();
        } else if (shape.type === "line") {
          ctx.beginPath();
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          ctx.strokeStyle = shape.color || "black";
          ctx.lineWidth = shape.width || 2;
          ctx.stroke();
        }
      });
    }
  }, [drawing, lines, shapes]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setIsDrawing(true);
    if (currentTool === "circle") {
      setCurrentShape({
        type: "circle",
        startX,
        startY,
        endX: startX,
        endY: startY,
        color: "black",
        width: 2,
      });
    } else if (currentTool === "line") {
      setCurrentShape({
        type: "line",
        startX,
        startY,
        endX: startX,
        endY: startY,
        color: "black",
        width: 2,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = line.color || "black";
      ctx.lineWidth = line.width || 2;
      ctx.stroke();
    });

    shapes.forEach((shape) => {
      if (shape.type === "circle") {
        const radius = Math.abs(shape.endX - shape.startX);
        ctx.beginPath();
        ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = shape.color || "black";
        ctx.lineWidth = shape.width || 2;
        ctx.stroke();
      } else if (shape.type === "line") {
        ctx.beginPath();
        ctx.moveTo(shape.startX, shape.startY);
        ctx.lineTo(shape.endX, shape.endY);
        ctx.strokeStyle = shape.color || "black";
        ctx.lineWidth = shape.width || 2;
        ctx.stroke();
      }
    });

    if (currentTool === "circle") {
      const radius = Math.sqrt(
        Math.pow(endX - currentShape.startX, 2) +
          Math.pow(endY - currentShape.startY, 2)
      );
      ctx.beginPath();
      ctx.arc(currentShape.startX, currentShape.startY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = currentShape.color || "black";
      ctx.lineWidth = currentShape.width || 2;
      ctx.stroke();
    } else if (currentTool === "line") {
      ctx.beginPath();
      ctx.moveTo(currentShape.startX, currentShape.startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = currentShape.color || "black";
      ctx.lineWidth = currentShape.width || 2;
      ctx.stroke();
    } else if (currentTool === "eraser") {
      const eraserRadius = eraserSize / 2;

      // Clear the canvas area under the eraser
      ctx.clearRect(
        endX - eraserRadius,
        endY - eraserRadius,
        eraserSize,
        eraserSize
      );

      // Remove shapes and lines under the eraser
      setLines((prevLines) =>
        prevLines.filter(
          (line) => !isLineWithinEraser(line, endX, endY, eraserSize)
        )
      );
      setShapes((prevShapes) =>
        prevShapes.filter(
          (shape) => !isShapeWithinEraser(shape, endX, endY, eraserSize)
        )
      );
    }

    setCurrentShape((prevShape) => ({
      ...prevShape,
      endX,
      endY,
    }));
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      if (currentShape && currentTool !== "eraser") {
        setShapes([...shapes, currentShape]);
      }
      setIsDrawing(false);
      setCurrentShape(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/drawings/drawing/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lines, shapes, title }), // Include title in the update request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update drawing");
      }

      navigate(`/drawing/${id}`);
    } catch (error) {
      console.error("Error updating drawing:", error);
    }
  };

  const isLineWithinEraser = (line, x, y, size) => {
    const lineDist = (x1, y1, x2, y2) => {
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      const param = dot / lenSq;
      const xx = x1 + param * C;
      const yy = y1 + param * D;
      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };

    return lineDist(line.startX, line.startY, line.endX, line.endY) <= size / 2;
  };

  const isShapeWithinEraser = (shape, x, y, size) => {
    if (shape.type === "circle") {
      const radius = Math.abs(shape.endX - shape.startX);
      const distance = Math.hypot(shape.startX - x, shape.startY - y);
      return distance <= radius + size / 2;
    } else if (shape.type === "line") {
      return isLineWithinEraser(shape, x, y, size);
    }
    return false;
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Drawing</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Handle title change
        placeholder="Enter title here"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
            <div className="mt-4">
        <button
          onClick={() => setCurrentTool("line")}
          className={`p-2 ${
            currentTool === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Line
        </button>
        <button
          onClick={() => setCurrentTool("circle")}
          className={`p-2 ${
            currentTool === "circle" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Circle
        </button>
        <button
          onClick={() => setCurrentTool("eraser")}
          className={`p-2 ${
            currentTool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Eraser
        </button>
        <input
          type="number"
          value={eraserSize}
          onChange={(e) => setEraserSize(Number(e.target.value))}
          className="ml-2 p-1 border border-gray-300 rounded"
        />
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
<button
        onClick={handleUpdate}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditDrawing;
