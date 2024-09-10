import { useState } from "react";

const FeedRecipe = ({ steps, contents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

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
                <div className="mb-4">
                  <span className="text-xl font-bold">{`${index + 1}.`}</span>
                  <div className="flex justify-between">
                    <span className="flex-1 max-w-60">{step.description}</span>
                    {step.image && (
                      <img
                        src={step.image}
                        alt={`Step ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                        onClick={() => openModal(step.image)}
                      />
                    )}
                  </div>
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
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected step"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedRecipe;
