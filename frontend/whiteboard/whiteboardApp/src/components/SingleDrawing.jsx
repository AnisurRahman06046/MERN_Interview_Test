import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function SingleDrawing() {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/api/v1/drawings/drawing/${id}`
        );
        const result = await response.json();
        setDrawing(result.data || null);
      } catch (error) {
        console.error("Error fetching drawing:", error);
      }
    };

    fetchDrawing();
  }, [id]);

  useEffect(() => {
    if (drawing) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = 800; // Set canvas width
      const height = 600; // Set canvas height
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height); // Clear canvas

      // Draw lines from the lines array
      drawing.lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color || "black";
        ctx.lineWidth = line.width || 2;
        ctx.stroke();
      });

      // Draw shapes (circles and lines) from the shapes array
      drawing.shapes?.forEach((shape) => {
        if (shape.type === "circle") {
          // Calculate radius using startX and endX
          const radius = Math.abs(shape.endX - shape.startX);

          ctx.beginPath();
          ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = shape.color || "black"; // Circle color
          ctx.lineWidth = shape.width || 2; // Circle line width
          ctx.stroke();
        } else if (shape.type === "line") {
          // Draw lines from the shapes array (used for triangles, etc.)
          ctx.beginPath();
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          ctx.strokeStyle = shape.color || "black";
          ctx.lineWidth = shape.width || 2;
          ctx.stroke();
        }
      });

      // Generate image URL
      const imageURL = canvas.toDataURL();
      setImage(imageURL);
    }
  }, [drawing]);

  const handleEdit = () => {
    navigate(`/drawing/edit/${id}`); // Navigate to the edit page
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/drawings/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/"); // Redirect to home or drawings list after deletion
      } else {
        console.error("Failed to delete drawing.");
      }
    } catch (error) {
      console.error("Error deleting drawing:", error);
    }
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{drawing.title}</h1>
        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Display the generated image */}
        <img
          src={image || "https://via.placeholder.com/800"}
          alt={drawing.title}
          className="w-full h-auto object-cover"
        />
        <div className="p-4">
          <p>{drawing.description}</p>{" "}
          {/* Assuming you have a description field */}
        </div>
      </div>
    </div>
  );
}

export default SingleDrawing;
