
import React from 'react';
import Button from './Button';

interface InfoSection {
  heading: string;
  text: string;
}

interface InfoViewProps {
  title: string;
  sections: InfoSection[];
  onBack: () => void;
}

const InfoView: React.FC<InfoViewProps> = ({ title, sections, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">{title}</h1>
        <div className="h-1 w-20 bg-sky-500 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border-l-4 border-l-sky-500/50">
            <h3 className="text-xl font-bold text-sky-400 mb-2">{section.heading}</h3>
            <p className="text-slate-300 leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back to Game
        </Button>
      </div>
    </div>
  );
};

export default InfoView;
