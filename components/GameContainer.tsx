
import React, { useState, useEffect } from 'react';
import { GameState, LevelScore, EvaluationResponse } from '../types';
import { LEVELS } from '../constants';
import { evaluateLevelResponse, generateFinalReport } from '../services/geminiService';
import Button from './Button';
import ReportView from './ReportView';

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [scores, setScores] = useState<LevelScore[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResponse | null>(null);
  const [finalReport, setFinalReport] = useState<any>(null);

  const currentLevel = LEVELS[currentLevelIdx];

  const handleStart = () => {
    setGameState(GameState.PLAYING);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const evalResult = await evaluateLevelResponse(currentLevel, userAnswer);
      setCurrentEvaluation(evalResult);
      
      const newScore: LevelScore = {
        level: currentLevel.level,
        score: evalResult.score,
        feedback: evalResult.feedback,
        personalityTrait: evalResult.personalityTrait,
        iqSegment: evalResult.iqEstimate,
        userAnswer: userAnswer
      };
      
      setScores(prev => [...prev, newScore]);
      setGameState(GameState.LEVEL_TRANSITION);
    } catch (error) {
      console.error("Evaluation failed", error);
      alert("Something went wrong with the brain-scan. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextLevel = async () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setUserAnswer('');
      setCurrentEvaluation(null);
      setGameState(GameState.PLAYING);
    } else {
      setIsEvaluating(true);
      try {
        const report = await generateFinalReport(scores);
        setFinalReport(report);
        setGameState(GameState.FINAL_REPORT);
      } catch (error) {
        console.error("Final report generation failed", error);
        alert("Failed to generate your master profile. Retrying...");
      } finally {
        setIsEvaluating(false);
      }
    }
  };

  if (gameState === GameState.INTRO) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 p-6 mt-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <h1 className="text-6xl font-display font-bold gradient-text">360IQ</h1>
          <p className="text-2xl text-slate-300 font-light tracking-tight italic">"The Thinking Levels Game"</p>
        </div>
        
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <p className="text-lg text-slate-300 leading-relaxed">
            Welcome to 360IQ, the game that challenges your mind across five dimensions of intelligence. Each level will reveal more about your personality, critical thinking, and IQ.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Logic', 'Analysis', 'Creativity', 'Strategy', 'Adaptability'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-sky-400 border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
          <Button onClick={handleStart} className="w-full text-xl py-6" variant="primary">
            Begin Your Journey
          </Button>
          <p className="text-xs text-slate-500 uppercase tracking-widest">5 Levels • AI Evaluation • Personality Mapping</p>
        </div>
      </div>
    );
  }

  if (gameState === GameState.FINAL_REPORT && finalReport) {
    return <ReportView report={finalReport} scores={scores} onRestart={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-widest">
          <span>Level {currentLevelIdx + 1} of 5</span>
          <span>{Math.round(((currentLevelIdx) / 5) * 100)}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${((currentLevelIdx + (gameState === GameState.LEVEL_TRANSITION ? 1 : 0)) / 5) * 100}%` }}
          />
        </div>
      </div>

      {gameState === GameState.PLAYING && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold text-sky-400">{currentLevel.title}</h2>
              <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">{currentLevel.type}</p>
            </div>

            <div className="text-xl text-slate-200 leading-relaxed bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
              {currentLevel.puzzle.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here... Be detailed to get a more accurate evaluation."
                className="w-full h-40 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                disabled={isEvaluating}
              />
              <Button type="submit" disabled={isEvaluating || !userAnswer.trim()} className="w-full">
                {isEvaluating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Evaluating your mind...
                  </>
                ) : "Submit Answer"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {gameState === GameState.LEVEL_TRANSITION && currentEvaluation && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="glass-card p-8 rounded-3xl space-y-8 border-sky-500/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <span className="text-3xl font-display font-bold text-sky-400">{currentEvaluation.score}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Feedback</h3>
                <p className="text-sky-400 font-semibold">{currentEvaluation.iqEstimate}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed text-lg italic">
                "{currentEvaluation.feedback}"
              </p>
              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <span className="text-xs text-indigo-400 uppercase font-bold tracking-widest block mb-1">Personality Insight</span>
                <p className="text-indigo-200 font-semibold">{currentEvaluation.personalityTrait}</p>
              </div>
            </div>

            <Button onClick={handleNextLevel} variant="secondary" className="w-full py-4 text-lg">
              {currentLevelIdx < LEVELS.length - 1 ? "Move to Next Level" : "Generate Final Profile"}
              {isEvaluating && <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
