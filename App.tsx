
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import { generateOptimization } from './services/geminiService';
import { OptimizationResult } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateOptimization(topic);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat memproses permintaan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6">
      <Header />

      <main className="space-y-8">
        {/* Input Form Section */}
        <section className="glass-card p-1 rounded-3xl overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-2 bg-black/40 p-2 rounded-[22px]">
            <div className="flex-grow flex items-center gap-3 px-4 py-3">
              <i className="fas fa-search text-gray-500"></i>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Apa topik video kamu? (Contoh: Resep Seblak Viral)"
                className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="youtube-gradient hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fas fa-wand-magic-sparkles"></i>
              )}
              <span>Optimasi Sekarang</span>
            </button>
          </form>
        </section>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center flex items-center justify-center gap-2">
            <i className="fas fa-triangle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Dynamic Content */}
        <div ref={resultRef}>
          {loading ? (
            <Loader />
          ) : result ? (
            <ResultCard result={result} />
          ) : (
            <div className="py-12 text-center opacity-40">
              <i className="fas fa-rocket text-5xl mb-4"></i>
              <p className="text-lg">Masukkan topik untuk memulai perjalanan viral kamu.</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating UI Support */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <div className="glass-card py-3 px-4 rounded-full flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            AI Optimizer Online
          </span>
          <span className="font-semibold text-white/50">v1.0.2</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
