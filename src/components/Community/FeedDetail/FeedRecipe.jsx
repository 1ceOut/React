import React, { useState } from "react";

const FeedRecipe = ({ steps, contents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Function to open the modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="mt-12">
      <div>
        <p>{contents}</p>
      </div>
      <br />
      <div>
        {steps.length > 0 && (
          <>
            <h3>단계별 설명</h3>
            {steps.map((step, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <div className="flex items-start mb-2">
                  <span className="flex-1">{`Step ${index + 1}: ${
                    step.description
                  }`}</span>
                  {step.image && (
                    <img
                      src={step.image}
                      alt={`Step ${index + 1}`}
                      className="w-16 h-16 object-cover ml-2 cursor-pointer"
                      onClick={() => openModal(step.image)} // Open modal on click
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // Close modal if clicking outside the image
        >
          <div
            className="relative bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <img
              src={selectedImage}
              alt="Selected step"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={closeModal} // Close modal if clicking on the image
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedRecipe;
