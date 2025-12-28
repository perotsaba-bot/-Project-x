
import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, label, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
        copied 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10'
      } ${className}`}
    >
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
      {label && <span>{copied ? 'Tersalin!' : label}</span>}
      {!label && (copied ? 'Tersalin' : '')}
    </button>
  );
};

export default CopyButton;
