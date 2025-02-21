import { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={
        showDrop
          ? "py-4 border border-dashed border-base-300 rounded-lg text-center opacity-100 transition-all duration-300 ease-in-out"
          : "opacity-0"
      }
    >
      <p>Drop Here</p>
    </div>
  );
};

export default DropArea;
