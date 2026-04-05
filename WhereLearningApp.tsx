import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Home, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  BookOpen,
  ArrowRight,
  Trophy,
  Compass
} from 'lucide-react';

// --- Data ---
const RULES = [
  { 
    word: "¿Dónde?", 
    meaning: "Որտե՞ղ", 
    usage: "Գտնվելու վայրը (Location/Position)", 
    example: "¿Dónde estás?", 
    hy: "Որտե՞ղ ես դու:",
    icon: <MapPin className="w-8 h-8 text-blue-500" />
  },
  { 
    word: "¿Adónde?", 
    meaning: "Ո՞ւր", 
    usage: "Ուղղություն / Նպատակակետ (Destination/Movement)", 
    example: "¿Adónde vas?", 
    hy: "Ո՞ւր ես գնում:",
    icon: <Navigation className="w-8 h-8 text-emerald-500" />
  },
  { 
    word: "¿De dónde?", 
    meaning: "Որտեղի՞ց", 
    usage: "Ծագում (Origin)", 
    example: "¿De dónde eres?", 
    hy: "Որտեղի՞ց ես դու (ծագումով):",
    icon: <Home className="w-8 h-8 text-orange-500" />
  }
];

const EXERCISES = [
  { q: "¿___ eres? - Soy de Armenia.", options: ["Dónde", "Adónde", "De dónde"], correct: "De dónde", hy: "Որտեղի՞ց ես դու: - Ես Հայաստանից եմ:" },
  { q: "¿___ está mi libro? - Está en la mesa.", options: ["Dónde", "Adónde", "De dónde"], correct: "Dónde", hy: "Որտե՞ղ է իմ գիրքը: - Այն սեղանի վրա է:" },
  { q: "¿___ vas ahora? - Voy al cine.", options: ["Dónde", "Adónde", "De dónde"], correct: "Adónde", hy: "Ո՞ւր ես գնում հիմա: - Գնում եմ կինոթատրոն:" },
  { q: "¿___ vives? - Vivo en Madrid.", options: ["Dónde", "Adónde", "De dónde"], correct: "Dónde", hy: "Որտե՞ղ ես ապրում: - Ապրում եմ Մադրիդում:" },
  { q: "¿___ viene ese tren? - Viene de París.", options: ["Dónde", "Adónde", "De dónde"], correct: "De dónde", hy: "Որտեղի՞ց է գալիս այս գնացքը: - Գալիս է Փարիզից:" },
  { q: "¿___ vamos a comer? - Vamos al restaurante.", options: ["Dónde", "Adónde", "De dónde"], correct: "Adónde", hy: "Ո՞ւր ենք գնում ուտելու: - Գնում ենք ռեստորան:" },
  { q: "¿___ están las llaves? - En el coche.", options: ["Dónde", "Adónde", "De dónde"], correct: "Dónde", hy: "Որտե՞ղ են բանալիները: - Մեքենայի մեջ:" },
  { q: "¿___ es el profesor? - Es de España.", options: ["Dónde", "Adónde", "De dónde"], correct: "De dónde", hy: "Որտեղի՞ց է ուսուցիչը: - Իսպանիայից է:" },
  { q: "¿___ caminas? - Camino al parque.", options: ["Dónde", "Adónde", "De dónde"], correct: "Adónde", hy: "Ո՞ւր ես քայլում: - Քայլում եմ դեպի այգի:" },
  { q: "¿___ trabajas? - Trabajo en el hospital.", options: ["Dónde", "Adónde", "De dónde"], correct: "Dónde", hy: "Որտե՞ղ ես աշխատում: - Աշխատում եմ հիվանդանոցում:" },
];

const shuffle = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function WhereLearningApp() {
  const [mode, setMode] = useState<'learn' | 'quiz' | 'finish'>('learn');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledQuiz, setShuffledQuiz] = useState<typeof EXERCISES>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startQuiz = () => {
    setShuffledQuiz(shuffle(EXERCISES));
    setCurrentIdx(0);
    setScore(0);
    setMode('quiz');
    setFeedback(null);
  };

  const handleAnswer = (option: string) => {
    if (feedback) return;
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
      } else {
        setMode('finish');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.div 
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            className="inline-block bg-blue-600 text-white p-4 rounded-3xl mb-4 shadow-xl"
          >
            <Compass className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900">
            ¿DÓNDE? <span className="text-blue-600">ՈՐՏԵՂ</span>
          </h1>
          <p className="text-xl text-slate-500 font-bold italic mt-2">
            Ինչպե՞ս հարցնել վայրի, ուղղության և ծագման մասին
          </p>
        </header>

        <AnimatePresence mode="wait">
          {mode === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RULES.map((rule, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-slate-100 flex flex-col items-center text-center gap-4"
                  >
                    <div className="bg-slate-50 p-4 rounded-2xl mb-2">
                      {rule.icon}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{rule.word}</h2>
                    <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-black text-sm uppercase">
                      {rule.meaning}
                    </div>
                    <p className="text-slate-500 font-bold text-sm leading-tight">
                      {rule.usage}
                    </p>
                    <div className="mt-4 pt-4 border-t-2 border-slate-50 w-full">
                      <p className="text-lg font-black text-slate-800">{rule.example}</p>
                      <p className="text-sm text-slate-400 italic">{rule.hy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Tip */}
              <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase mb-1">Հիշի՛ր</h3>
                  <p className="text-blue-100 font-medium leading-relaxed">
                    Իսպաներենում հարցական բառերը միշտ ունեն <span className="font-black underline">շեշտ (tilde)</span>: <br />
                    <span className="font-black">A</span> + <span className="font-black">dónde</span> = Ուղղություն (To where) <br />
                    <span className="font-black">De</span> + <span className="font-black">dónde</span> = Ծագում (From where)
                  </p>
                </div>
              </div>

              <button 
                onClick={startQuiz}
                className="w-full py-6 bg-slate-900 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95"
              >
                ՍԿՍԵԼ ՎԱՐԺՈՒԹՅՈՒՆՆԵՐԸ
                <ArrowRight className="w-8 h-8" />
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
                <span className="font-black text-slate-400 uppercase tracking-widest">Հարց {currentIdx + 1} / {shuffledQuiz.length}</span>
                <div className="flex gap-1">
                  {shuffledQuiz.map((_, i) => (
                    <div key={i} className={`h-2 w-4 rounded-full ${i <= currentIdx ? 'bg-blue-500' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-slate-100 text-center relative min-h-[450px] flex flex-col justify-center">
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
                            className="py-6 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 rounded-3xl border-4 border-slate-50 transition-all text-2xl font-black text-slate-700 active:scale-95"
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
                          <div className="bg-emerald-100 p-6 rounded-full mb-6">
                            <CheckCircle2 className="w-24 h-24 text-emerald-500" />
                          </div>
                          <h3 className="text-6xl font-black text-emerald-600 italic uppercase tracking-tighter animate-bounce">ՃԻՇՏ Է:</h3>
                        </>
                      ) : (
                        <>
                          <div className="bg-red-100 p-6 rounded-full mb-6">
                            <XCircle className="w-24 h-24 text-red-500" />
                          </div>
                          <h3 className="text-6xl font-black text-red-600 italic uppercase tracking-tighter">ՍԽԱԼ Է:</h3>
                          <p className="text-2xl font-bold text-slate-500 mt-4">Ճիշտ պատասխանն էր՝ <span className="text-blue-600 font-black">{shuffledQuiz[currentIdx].correct}</span></p>
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
              className="text-center bg-white p-16 rounded-[4rem] border-8 border-slate-100 shadow-2xl max-w-2xl mx-auto relative"
            >
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-blue-600 p-8 rounded-[2rem] border-8 border-white shadow-xl rotate-12">
                <Trophy className="w-20 h-20 text-white" />
              </div>
              <h2 className="text-6xl font-black text-slate-900 uppercase italic mb-4 mt-8 tracking-tighter">ԳԵՐԱԶԱՆՑ:</h2>
              <div className="flex flex-col items-center gap-4 mb-12">
                <p className="text-3xl font-bold text-slate-400">Քո արդյունքը՝</p>
                <div className="text-9xl font-black text-blue-600 flex items-baseline gap-2">
                  {score} <span className="text-3xl text-slate-200">/ {shuffledQuiz.length}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={startQuiz}
                  className="w-full py-6 bg-blue-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <RefreshCw className="w-8 h-8" />
                  ԿՐԿՆԵԼ
                </button>
                <button 
                  onClick={() => setMode('learn')}
                  className="w-full py-6 bg-slate-100 text-slate-600 rounded-full font-black text-2xl uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-4"
                >
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
