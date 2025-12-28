
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-12 youtube-gradient rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <i className="fa-brands fa-youtube text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">ViralShorts <span className="text-red-500">Optimizer</span></h1>
      </div>
      <p className="text-gray-400 max-w-lg mx-auto">
        Optimalkan konten YouTube Shorts kamu dengan bantuan AI. Dapatkan judul viral, deskripsi SEO, dan hashtag trending seketika.
      </p>
    </header>
  );
};

export default Header;
