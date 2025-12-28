
import React from 'react';
import { OptimizationResult } from '../types';
import CopyButton from './CopyButton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultCardProps {
  result: OptimizationResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const chartData = [
    { name: 'Virality', value: result.viralityScore },
    { name: 'Remaining', value: 100 - result.viralityScore },
  ];
  const COLORS = ['#FF0000', 'rgba(255, 255, 255, 0.1)'];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Section: Viral Score & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Virality Score</h3>
          <div className="w-32 h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{result.viralityScore}%</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">Prediksi Potensi FYP</p>
        </div>

        <div className="md:col-span-2 glass-card p-6 rounded-2xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
              <i className="fas fa-bolt"></i>
            </div>
            <h3 className="font-bold text-lg">Retensi 3 Detik Pertama</h3>
          </div>
          <p className="text-gray-300 italic mb-4">"{result.retentionTip}"</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Analisis Judul:</h4>
            <p className="text-sm text-gray-300">{result.ctrAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Titles Section */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-fire text-orange-500"></i> Judul Viral (CTR Tinggi)
          </h3>
        </div>
        <div className="space-y-3">
          {result.titles.map((title, idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
              <p className="text-white font-medium pr-4">{title}</p>
              <CopyButton text={title} />
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-align-left text-blue-500"></i> Deskripsi SEO
          </h3>
          <CopyButton text={result.description} label="Salin Deskripsi" />
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
          {result.description}
        </div>
      </div>

      {/* Hashtags Section */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-hashtag text-purple-500"></i> Hashtag Trending
          </h3>
          <CopyButton text={result.hashtags.join(' ')} label="Salin Semua" />
        </div>
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium text-gray-300 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
