import React from 'react';

const FeedRecipe = ({ steps, contents }) => {
  return (
    <div className="mt-12">
      <div>

        <p>{contents}</p>
      </div>
      <br />
      <div>
        <h3>단계별 설명</h3>
        {steps.length > 0 ? (
          steps.map((step, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <div className="flex items-start mb-2">
                <span className="flex-1">{`Step ${index + 1}: ${step.description}`}</span>
                {step.image && (
                  <img
                    src={step.image}
                    alt={`Step ${index + 1}`}
                    className="w-16 h-16 object-cover ml-2"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No steps available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedRecipe;
