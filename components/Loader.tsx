
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-brands fa-youtube text-red-500 text-xl animate-pulse"></i>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white animate-pulse-slow">Menganalisis Algoritma...</h3>
        <p className="text-gray-400 text-sm">Sedang merancang strategi viral untuk video kamu.</p>
      </div>
    </div>
  );
};

export default Loader;
