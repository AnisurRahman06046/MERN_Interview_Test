import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DrawingsList() {
  const [drawings, setDrawings] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/drawings`);
        const result = await response.json();
        setDrawings(result.data || []);
      } catch (error) {
        console.error("Error fetching drawings:", error);
      }
    };

    fetchDrawings();
  }, []);
  useEffect(() => {
    const generateImages = () => {
      drawings.forEach((drawing) => {
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

        // Draw shapes (including circles and lines)
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
            // Draw lines from the shapes array
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
        setImages((prevImages) => ({ ...prevImages, [drawing._id]: imageURL }));
      });
    };

    generateImages();
  }, [drawings]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Drawings</h1>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(drawings) && drawings.length > 0 ? (
          drawings.map((drawing) => (
            <div
              key={drawing._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              {/* Display the generated image */}
              <img
                src={images[drawing._id] || "https://via.placeholder.com/200"}
                alt={drawing.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{drawing.title}</h3>
                <Link
                  to={`/drawing/${drawing._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No drawings available.</p>
        )}
      </div>
    </div>
  );
}

export default DrawingsList;
