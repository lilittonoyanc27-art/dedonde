import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  Target, 
  RefreshCw, 
  User, 
  Swords, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Dumbbell,
  Timer
} from 'lucide-react';

// --- Data ---
const CHALLENGES = [
  { es: "El lunes juego al fútbol", hy: "Երկուշաբթի ես ֆուտբոլ եմ խաղում:" },
  { es: "El martes como una pizza", hy: "Երեքշաբթի ես պիցցա եմ ուտում:" },
  { es: "El miércoles voy al gimnasio", hy: "Չորեքշաբթի ես գնում եմ մարզասրահ:" },
  { es: "El jueves leo un libro", hy: "Հինգշաբթի ես գիրք եմ կարդում:" },
  { es: "El viernes nado en la piscina", hy: "Ուրբաթ ես լողում եմ լողավազանում:" },
  { es: "El sábado visito a mi familia", hy: "Շաբաթ ես այցելում եմ իմ ընտանիքին:" },
  { es: "El domingo descanso en el parque", hy: "Կիրակի ես հանգստանում եմ այգում:" },
  { es: "Mañana es el lunes", hy: "Վաղը երկուշաբթի է:" },
  { es: "Hoy es el viernes", hy: "Այսօր ուրբաթ է:" },
  { es: "Ayer fue el domingo", hy: "Երեկ կիրակի էր:" },
  { es: "Me gusta el sábado", hy: "Ինձ դուր է գալիս շաբաթը:" },
  { es: "No me gusta el lunes", hy: "Ինձ դուր չի գալիս երկուշաբթին:" },
  { es: "El fin de semana es divertido", hy: "Հանգստյան օրերը զվարճալի են:" },
  { es: "El lunes es el primer día", hy: "Երկուշաբթին առաջին օրն է:" },
  { es: "El viernes es el mejor día", hy: "Ուրբաթը լավագույն օրն է:" },
  { es: "Juego tenis el sábado", hy: "Շաբաթ օրը թենիս եմ խաղում:" },
  { es: "Corro en el parque el martes", hy: "Երեքշաբթի վազում եմ այգում:" },
  { es: "Bailo salsa el viernes", hy: "Ուրբաթ սալսա եմ պարում:" },
  { es: "Camino mucho el domingo", hy: "Կիրակի շատ եմ քայլում:" },
  { es: "Estudio español el jueves", hy: "Հինգշաբթի իսպաներեն եմ սովորում:" },
];

export default function SportsDaysGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [round, setRound] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [feedback, setFeedback] = useState<'goal' | 'miss' | null>(null);
  const [shuffledChallenges, setShuffledChallenges] = useState([...CHALLENGES]);
  
  // Scrambled words state
  const [availableWords, setAvailableWords] = useState<{word: string, id: number}[]>([]);
  const [builtSentence, setBuiltSentence] = useState<{word: string, id: number}[]>([]);

  useEffect(() => {
    if (view === 'playing') {
      const shuffled = [...CHALLENGES].sort(() => Math.random() - 0.5);
      setShuffledChallenges(shuffled);
      initRound(shuffled[0]);
    }
  }, [view]);

  const initRound = (challenge: typeof CHALLENGES[0]) => {
    const words = challenge.es.split(' ').map((word, index) => ({ word, id: index }));
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
    setBuiltSentence([]);
  };

  const addWord = (wordObj: {word: string, id: number}) => {
    if (feedback) return;
    setBuiltSentence([...builtSentence, wordObj]);
    setAvailableWords(availableWords.filter(w => w.id !== wordObj.id));
  };

  const removeWord = (wordObj: {word: string, id: number}) => {
    if (feedback) return;
    setAvailableWords([...availableWords, wordObj]);
    setBuiltSentence(builtSentence.filter(w => w.id !== wordObj.id));
  };

  const checkSentence = () => {
    if (feedback) return;
    const target = shuffledChallenges[round].es;
    const current = builtSentence.map(w => w.word).join(' ');

    if (current === target) {
      setFeedback('goal');
      setScores(prev => ({
        ...prev,
        [currentPlayer === 1 ? 'p1' : 'p2']: prev[currentPlayer === 1 ? 'p1' : 'p2'] + 1
      }));
    } else {
      setFeedback('miss');
    }

    setTimeout(() => {
      setFeedback(null);
      if (round < shuffledChallenges.length - 1) {
        const nextRound = round + 1;
        setRound(nextRound);
        setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
        initRound(shuffledChallenges[nextRound]);
      } else {
        setView('finish');
      }
    }, 2000);
  };

  const resetGame = () => {
    setRound(0);
    setScores({ p1: 0, p2: 0 });
    setCurrentPlayer(1);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 max-w-2xl"
          >
            <div className="flex justify-center gap-4 mb-8">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-blue-500 p-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                <Dumbbell className="w-16 h-16 text-white" />
              </motion.div>
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="bg-red-500 p-6 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              >
                <Zap className="w-16 h-16 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-tight">
              Օրերի <span className="text-blue-500">Մարզական</span> <br /> Պայքար
            </h1>
            <p className="text-2xl text-slate-400 mb-12 font-medium">
              1 ընդդեմ 1 մարտահրավեր: <br />
              Կազմիր նախադասությունները և հաղթիր:
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-800/50 p-6 rounded-3xl border-2 border-blue-500/30">
                <User className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <p className="font-bold text-blue-400">Խաղացող 1</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border-2 border-red-500/30">
                <User className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="font-bold text-red-400">Խաղացող 2</p>
              </div>
            </div>

            <button 
              onClick={() => setView('playing')}
              className="group relative px-16 py-6 bg-blue-600 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-4 mx-auto"
            >
              <Swords className="w-10 h-10" />
              ՍԿՍԵԼ ՄԱՐՏԸ
            </button>
          </motion.div>
        )}

        {view === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl flex flex-col gap-8 z-10"
          >
            {/* Scoreboard */}
            <div className="flex justify-between items-center bg-slate-800/80 backdrop-blur-xl p-8 rounded-[3rem] border-2 border-slate-700 shadow-2xl">
              <div className={`flex flex-col items-center transition-all duration-500 ${currentPlayer === 1 ? 'scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-2 ${currentPlayer === 1 ? 'bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-slate-700'}`}>
                  <User className="w-10 h-10" />
                </div>
                <p className="font-black text-sm uppercase tracking-widest text-blue-400">Խաղացող 1</p>
                <p className="text-6xl font-black">{scores.p1}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="bg-slate-700 px-6 py-2 rounded-full flex items-center gap-2">
                  <Timer className="w-5 h-5 text-yellow-500" />
                  <span className="font-black text-xl uppercase italic">Փուլ {round + 1} / 20</span>
                </div>
                <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-yellow-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((round + 1) / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`flex flex-col items-center transition-all duration-500 ${currentPlayer === 2 ? 'scale-110' : 'opacity-50'}`}>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-2 ${currentPlayer === 2 ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]' : 'bg-slate-700'}`}>
                  <User className="w-10 h-10" />
                </div>
                <p className="font-black text-sm uppercase tracking-widest text-red-400">Խաղացող 2</p>
                <p className="text-6xl font-black">{scores.p2}</p>
              </div>
            </div>

            {/* Main Arena */}
            <div className="relative bg-slate-800/50 backdrop-blur-md rounded-[4rem] p-12 border-2 border-slate-700 shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {!feedback ? (
                  <motion.div 
                    key={`q-${round}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="w-full"
                  >
                    <div className={`inline-block px-8 py-3 rounded-full mb-8 font-black text-xl uppercase italic tracking-widest ${currentPlayer === 1 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                      {currentPlayer === 1 ? 'Խաղացող 1-ի հերթն է' : 'Խաղացող 2-ի հերթն է'}
                    </div>
                    
                    <h2 className="text-4xl font-black mb-8 leading-tight text-slate-300">
                      {shuffledChallenges[round].hy}
                    </h2>

                    {/* Built Sentence Area */}
                    <div className="min-h-[80px] bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-600 p-4 mb-8 flex flex-wrap justify-center gap-3">
                      {builtSentence.map((wordObj, i) => (
                        <motion.button
                          layoutId={`word-${wordObj.id}`}
                          key={`built-${wordObj.id}`}
                          onClick={() => removeWord(wordObj)}
                          className={`px-6 py-3 rounded-2xl font-bold text-xl transition-all shadow-lg ${currentPlayer === 1 ? 'bg-blue-500 hover:bg-blue-400' : 'bg-red-500 hover:bg-red-400'}`}
                        >
                          {wordObj.word}
                        </motion.button>
                      ))}
                    </div>

                    {/* Available Words Area */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                      {availableWords.map((wordObj) => (
                        <motion.button
                          layoutId={`word-${wordObj.id}`}
                          key={`avail-${wordObj.id}`}
                          onClick={() => addWord(wordObj)}
                          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-2xl font-bold text-xl transition-all border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 shadow-md"
                        >
                          {wordObj.word}
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={checkSentence}
                      disabled={builtSentence.length === 0}
                      className={`px-12 py-5 rounded-full font-black text-2xl uppercase tracking-widest transition-all shadow-xl flex items-center gap-3 mx-auto ${builtSentence.length === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:scale-95'}`}
                    >
                      <Target className="w-6 h-6" />
                      ՀԱՍՏԱՏԵԼ
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="feedback"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    {feedback === 'goal' ? (
                      <>
                        <div className="w-40 h-40 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.6)]">
                          <CheckCircle2 className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-8xl font-black italic uppercase text-emerald-400 tracking-tighter animate-bounce">ԳՈ՜Լ:</h3>
                        <p className="text-2xl font-bold text-slate-400 mt-4 italic">Հիանալի հարված:</p>
                        <p className="text-3xl font-black text-white mt-6">{shuffledChallenges[round].es}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-40 h-40 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(239,68,68,0.6)]">
                          <XCircle className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-8xl font-black italic uppercase text-red-400 tracking-tighter">ՎՐԻՊՈՒՄ:</h3>
                        <p className="text-2xl font-bold text-slate-400 mt-4 italic">Ճիշտ պատասխանն էր՝</p>
                        <p className="text-3xl font-black text-white mt-4">{shuffledChallenges[round].es}</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 bg-slate-800/80 backdrop-blur-2xl p-16 rounded-[5rem] border-4 border-slate-700 shadow-2xl max-w-3xl"
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Trophy className="w-32 h-32 text-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-4 -right-4"
                >
                  <Sparkles className="w-12 h-12 text-yellow-300" />
                </motion.div>
              </div>
            </div>

            <h2 className="text-6xl font-black italic uppercase mb-8">
              {scores.p1 > scores.p2 ? (
                <span className="text-blue-400">Խաղացող 1-ը ՀԱՂԹԵՑ:</span>
              ) : scores.p2 > scores.p1 ? (
                <span className="text-red-400">Խաղացող 2-ը ՀԱՂԹԵՑ:</span>
              ) : (
                <span className="text-yellow-500">ՈՉ-ՈՔԻ:</span>
              )}
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-500/10 p-8 rounded-[3rem] border-2 border-blue-500/30">
                <p className="text-blue-400 font-black text-xl mb-2 uppercase italic">Խաղացող 1</p>
                <p className="text-7xl font-black">{scores.p1}</p>
              </div>
              <div className="bg-red-500/10 p-8 rounded-[3rem] border-2 border-red-500/30">
                <p className="text-red-400 font-black text-xl mb-2 uppercase italic">Խաղացող 2</p>
                <p className="text-7xl font-black">{scores.p2}</p>
              </div>
            </div>

            <button 
              onClick={resetGame}
              className="w-full py-8 bg-white text-slate-900 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl flex items-center justify-center gap-4"
            >
              <RefreshCw className="w-8 h-8" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #0f172a; }
      `}} />
    </div>
  );
}
