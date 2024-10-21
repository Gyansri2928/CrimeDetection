import React from 'react';

const Loader = ({ loading, progressText , completionPercentage }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="loader border-t-transparent border-solid border-4 border-white rounded-full w-16 h-16 animate-spin mx-auto" id='spinLoader'></div>
            <p className="text-white mt-4">{progressText}</p>
            {completionPercentage && (
              <p className="text-white mt-2 font-bold">{completionPercentage}%</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
