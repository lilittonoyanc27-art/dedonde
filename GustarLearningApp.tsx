import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Heart, 
  Info,
  Trophy,
  Star
} from 'lucide-react';

// --- Data ---
const GUSTAR_RULES = [
  { pronoun: "A mí", iop: "me", example: "Me gusta el té", hy: "Ինձ դուր է գալիս թեյը" },
  { pronoun: "A ti", iop: "te", example: "Te gusta el café", hy: "Քեզ դուր է գալիս սուրճը" },
  { pronoun: "A él / ella / usted", iop: "le", example: "Le gusta la gata", hy: "Նրան դուր է գալիս գաթան" },
  { pronoun: "A nosotros / nosotras", iop: "nos", example: "Nos gusta viajar", hy: "Մեզ դուր է գալիս ճամփորդել" },
  { pronoun: "A vosotros / vosotras", iop: "os", example: "Os gusta bailar", hy: "Ձեզ դուր է գալիս պարել" },
  { pronoun: "A ellos / ellas / ustedes", iop: "les", example: "Les gusta el sol", hy: "Նրանց դուր է գալիս արևը" },
];

const EXERCISES = [
  { q: "(A mí) ___ gusta la música.", options: ["me", "te", "le"], correct: "me", hy: "Ինձ դուր է գալիս երաժշտությունը:" },
  { q: "(A nosotros) nos ___ los libros.", options: ["gusta", "gustan"], correct: "gustan", hy: "Մեզ դուր են գալիս գրքերը:" },
  { q: "(A ti) ___ gustan las flores.", options: ["me", "te", "nos"], correct: "te", hy: "Քեզ դուր են գալիս ծաղիկները:" },
  { q: "(A ella) le ___ cantar.", options: ["gusta", "gustan"], correct: "gusta", hy: "Նրան դուր է գալիս երգել:" },
  { q: "(A ellos) ___ gusta el helado.", options: ["le", "les", "os"], correct: "les", hy: "Նրանց դուր է գալիս պաղպաղակը:" },
  { q: "(A vosotros) os ___ las películas.", options: ["gusta", "gustan"], correct: "gustan", hy: "Ձեզ դուր են գալիս ֆիլմերը:" },
  { q: "(A usted) ___ gusta caminar.", options: ["le", "les", "me"], correct: "le", hy: "Ձեզ (հարգալից) դուր է գալիս քայլել:" },
  { q: "(A mí) me ___ los gatos.", options: ["gusta", "gustan"], correct: "gustan", hy: "Ինձ դուր են գալիս կատուները:" },
  { q: "(A nosotros) ___ gusta el verano.", options: ["nos", "os", "les"], correct: "nos", hy: "Մեզ դուր է գալիս ամառը:" },
  { q: "(A ti) te ___ el chocolate.", options: ["gusta", "gustan"], correct: "gusta", hy: "Քեզ դուր է գալիս շոկոլադը:" },
];

// Shuffle utility
const shuffle = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function GustarLearningApp() {
  const [mode, setMode] = useState<'learn' | 'quiz' | 'finish'>('learn');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledQuiz, setShuffledQuiz] = useState<typeof EXERCISES>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const startQuiz = () => {
    setShuffledQuiz(shuffle(EXERCISES));
    setCurrentIdx(0);
    setScore(0);
    setMode('quiz');
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleAnswer = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option === shuffledQuiz[currentIdx].correct;
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIdx < shuffledQuiz.length - 1) {
        setCurrentIdx(i => i + 1);
        setFeedback(null);
        setSelectedOption(null);
      } else {
        setMode('finish');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-rose-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block bg-rose-500 text-white p-4 rounded-full mb-4 shadow-lg"
          >
            <Heart className="w-12 h-12 fill-current" />
          </motion.div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-rose-900">
            GUSTAR <span className="text-rose-600">ԲԱՅԸ</span>
          </h1>
          <p className="text-xl text-rose-800/70 font-bold italic mt-2">
            Ինչպե՞ս ասել «Ինձ դուր է գալիս» իսպաներենով
          </p>
        </header>

        <AnimatePresence mode="wait">
          {mode === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Explanation Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border-4 border-rose-200">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-8 h-8 text-rose-500" />
                  <h2 className="text-2xl font-black text-slate-800 uppercase">Կանոնը</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                  <p>
                    Իսպաներենում <span className="font-bold text-rose-600">Gustar</span> բայը աշխատում է այլ կերպ: Մենք չենք ասում «Ես սիրում եմ», մենք ասում ենք <span className="italic">«Ինձ դուր է գալիս»</span>:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><span className="font-bold">Gusta</span> — եթե դուր է գալիս մեկ բան կամ գործողություն (singular / verb):</li>
                    <li><span className="font-bold">Gustan</span> — եթե դուր են գալիս մի քանի բաներ (plural):</li>
                  </ul>
                </div>
              </div>

              {/* Conjugation Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GUSTAR_RULES.map((rule, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl shadow-md border-2 border-rose-100 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-rose-400 uppercase tracking-widest">{rule.pronoun}</span>
                      <span className="bg-rose-500 text-white px-4 py-1 rounded-full font-black text-xl">{rule.iop}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{rule.example}</p>
                    <p className="text-rose-800/60 italic font-medium">{rule.hy}</p>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={startQuiz}
                className="w-full py-6 bg-rose-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95"
              >
                <BookOpen className="w-8 h-8" />
                ՍԿՍԵԼ ՎԱՐԺՈՒԹՅՈՒՆՆԵՐԸ
              </button>
            </motion.div>
          )}

          {mode === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-2xl mx-auto"
            >
              {/* Progress */}
              <div className="flex justify-between items-center mb-6 px-4">
                <span className="font-black text-rose-900 uppercase tracking-widest">Հարց {currentIdx + 1} / {shuffledQuiz.length}</span>
                <div className="flex gap-1">
                  {shuffledQuiz.map((_, i) => (
                    <div key={i} className={`h-2 w-6 rounded-full ${i <= currentIdx ? 'bg-rose-500' : 'bg-rose-200'}`} />
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-rose-200 text-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!feedback ? (
                    <motion.div 
                      key={currentIdx}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                    >
                      <h2 className="text-4xl font-black text-slate-800 mb-4 leading-tight">
                        {shuffledQuiz[currentIdx].q}
                      </h2>
                      <p className="text-2xl text-slate-400 font-bold italic mb-12">
                        {shuffledQuiz[currentIdx].hy}
                      </p>

                      <div className="grid grid-cols-1 gap-4">
                        {shuffledQuiz[currentIdx].options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className="py-6 bg-rose-50 hover:bg-rose-100 rounded-3xl border-4 border-rose-100 transition-all text-3xl font-black text-rose-900 active:scale-95"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="feedback"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center py-12"
                    >
                      {feedback === 'correct' ? (
                        <>
                          <CheckCircle2 className="w-32 h-32 text-emerald-500 mb-6" />
                          <h3 className="text-6xl font-black text-emerald-600 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h3>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-32 h-32 text-red-500 mb-6" />
                          <h3 className="text-6xl font-black text-red-600 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h3>
                          <p className="text-2xl font-bold text-slate-500 mt-4">Ճիշտ պատասխանն էր՝ <span className="text-rose-600 font-black">{shuffledQuiz[currentIdx].correct}</span></p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {mode === 'finish' && (
            <motion.div 
              key="finish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white p-16 rounded-[4rem] border-8 border-rose-400 shadow-2xl max-w-2xl mx-auto relative"
            >
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-yellow-400 p-8 rounded-full border-8 border-white shadow-xl">
                <Trophy className="w-20 h-20 text-rose-900" />
              </div>
              <h2 className="text-6xl font-black text-rose-900 uppercase italic mb-4 mt-8 tracking-tighter">ԱՎԱՐՏ:</h2>
              <div className="flex flex-col items-center gap-4 mb-12">
                <p className="text-3xl font-bold text-slate-500">Քո արդյունքը՝</p>
                <div className="text-8xl font-black text-rose-600 flex items-baseline gap-2">
                  {score} <span className="text-3xl text-slate-300">/ {shuffledQuiz.length}</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-10 h-10 ${i < Math.round((score/shuffledQuiz.length)*5) ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} 
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={startQuiz}
                  className="w-full py-6 bg-rose-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <RefreshCw className="w-8 h-8" />
                  ԿՐԿՆԵԼ
                </button>
                <button 
                  onClick={() => setMode('learn')}
                  className="w-full py-6 bg-slate-100 text-slate-600 rounded-full font-black text-2xl uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-4"
                >
                  <ArrowRight className="w-8 h-8 rotate-180" />
                  ՎԵՐԱԴԱՌՆԱԼ ԴԱՍԻՆ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}} />
    </div>
  );
}
