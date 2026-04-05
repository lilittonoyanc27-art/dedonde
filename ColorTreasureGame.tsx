import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  Target, 
  RefreshCw, 
  User, 
  Map as MapIcon, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Gem,
  Compass,
  Flag,
  Palette
} from 'lucide-react';

// --- Data ---
const CHALLENGES = [
  // Colors
  { q: "La manzana es ___", hy: "Խնձորը կարմիր է:", options: ["roja", "rojo"], correct: "roja", gender: "feminine" },
  { q: "El coche es ___", hy: "Մեքենան կարմիր է:", options: ["rojo", "roja"], correct: "rojo", gender: "masculine" },
  { q: "La casa es ___", hy: "Տունը սպիտակ է:", options: ["blanca", "blanco"], correct: "blanca", gender: "feminine" },
  { q: "El libro es ___", hy: "Գիրքը սպիտակ է:", options: ["blanco", "blanca"], correct: "blanco", gender: "masculine" },
  { q: "La silla es ___", hy: "Աթոռը սև է:", options: ["negra", "negro"], correct: "negra", gender: "feminine" },
  { q: "El perro es ___", hy: "Շունը սև է:", options: ["negro", "negra"], correct: "negro", gender: "masculine" },
  { q: "La flor es ___", hy: "Ծաղիկը դեղին է:", options: ["amarilla", "amarillo"], correct: "amarilla", gender: "feminine" },
  { q: "El sol es ___", hy: "Արևը դեղին է:", options: ["amarillo", "amarilla"], correct: "amarillo", gender: "masculine" },
  
  // Sizes & Qualities
  { q: "La niña es ___", hy: "Աղջիկը փոքր է:", options: ["pequeña", "pequeño"], correct: "pequeña", gender: "feminine" },
  { q: "El niño es ___", hy: "Տղան փոքր է:", options: ["pequeño", "pequeña"], correct: "pequeño", gender: "masculine" },
  { q: "La gata es ___", hy: "Կատուն (էգ) գեղեցիկ է:", options: ["bonita", "bonito"], correct: "bonita", gender: "feminine" },
  { q: "El gato es ___", hy: "Կատուն (արու) գեղեցիկ է:", options: ["bonito", "bonita"], correct: "bonito", gender: "masculine" },
  { q: "La sopa está ___", hy: "Ապուրը տաք է:", options: ["caliente", "calienta"], correct: "caliente", gender: "neutral" },
  { q: "El café está ___", hy: "Սուրճը տաք է:", options: ["caliente", "caliento"], correct: "caliente", gender: "neutral" },
  { q: "La comida es ___", hy: "Ուտելիքը լավն է:", options: ["buena", "bueno"], correct: "buena", gender: "feminine" },
  { q: "El helado es ___", hy: "Պաղպաղակը լավն է:", options: ["bueno", "buena"], correct: "bueno", gender: "masculine" },
  { q: "La película es ___", hy: "Ֆիլմը զվարճալի է:", options: ["divertida", "divertido"], correct: "divertida", gender: "feminine" },
  { q: "El juego es ___", hy: "Խաղը զվարճալի է:", options: ["divertido", "divertida"], correct: "divertido", gender: "masculine" },
  { q: "La bicicleta es ___", hy: "Հեծանիվը նոր է:", options: ["nueva", "nuevo"], correct: "nueva", gender: "feminine" },
  { q: "El reloj es ___", hy: "Ժամացույցը նոր է:", options: ["nuevo", "nueva"], correct: "nuevo", gender: "masculine" },
  
  // More Adjectives
  { q: "La puerta está ___", hy: "Դուռը փակ է:", options: ["cerrada", "cerrado"], correct: "cerrada", gender: "feminine" },
  { q: "El garaje está ___", hy: "Ավտոտնակը փակ է:", options: ["cerrado", "cerrada"], correct: "cerrado", gender: "masculine" },
  { q: "La ventana está ___", hy: "Պատուհանը բաց է:", options: ["abierta", "abierto"], correct: "abierta", gender: "feminine" },
  { q: "El libro está ___", hy: "Գիրքը բաց է:", options: ["abierto", "abierta"], correct: "abierto", gender: "masculine" },
  { q: "La maleta es ___", hy: "Ճամպրուկը ծանր է:", options: ["pesada", "pesado"], correct: "pesada", gender: "feminine" },
  { q: "El camión es ___", hy: "Բեռնատարը ծանր է:", options: ["pesado", "pesada"], correct: "pesado", gender: "masculine" },
  { q: "La ropa está ___", hy: "Հագուստը մաքուր է:", options: ["limpia", "limpio"], correct: "limpia", gender: "feminine" },
  { q: "El coche está ___", hy: "Մեքենան մաքուր է:", options: ["limpio", "limpia"], correct: "limpio", gender: "masculine" },
  { q: "La calle es ___", hy: "Փողոցը երկար է:", options: ["larga", "largo"], correct: "larga", gender: "feminine" },
  { q: "El camino es ___", hy: "Ճանապարհը երկար է:", options: ["largo", "larga"], correct: "largo", gender: "masculine" },
  { q: "La mesa es ___", hy: "Սեղանը կլոր է:", options: ["redonda", "redondo"], correct: "redonda", gender: "feminine" },
  { q: "El plato es ___", hy: "Ափսեն կլոր է:", options: ["redondo", "redonda"], correct: "redondo", gender: "masculine" },
  { q: "La tarta es ___", hy: "Տորթը քաղցր է:", options: ["dulce", "dulca"], correct: "dulce", gender: "neutral" },
  { q: "El caramelo es ___", hy: "Կոնֆետը քաղցր է:", options: ["dulce", "dulco"], correct: "dulce", gender: "neutral" },
  { q: "La música es ___", hy: "Երաժշտությունը բարձր է:", options: ["alta", "alto"], correct: "alta", gender: "feminine" },
  { q: "El sonido es ___", hy: "Ձայնը բարձր է:", options: ["alto", "alta"], correct: "alto", gender: "masculine" },
  { q: "La cama es ___", hy: "Մահճակալը փափուկ է:", options: ["blanda", "blando"], correct: "blanda", gender: "feminine" },
  { q: "El cojín es ___", hy: "Բարձը փափուկ է:", options: ["blando", "blanda"], correct: "blando", gender: "masculine" },
  { q: "La respuesta es ___", hy: "Պատասխանը ճիշտ է:", options: ["correcta", "correcto"], correct: "correcta", gender: "feminine" },
  { q: "El ejercicio es ___", hy: "Վարժությունը ճիշտ է:", options: ["correcto", "correcta"], correct: "correcto", gender: "masculine" },
];

const MAP_STEPS = 15; // Increased steps for a longer race

// Shuffle array utility
const shuffle = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function ColorTreasureGame() {
  const [view, setView] = useState<'intro' | 'playing' | 'finish'>('intro');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [positions, setPositions] = useState({ p1: 0, p2: 0 });
  const [shuffledChallenges, setShuffledChallenges] = useState<typeof CHALLENGES>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<typeof CHALLENGES[0] | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [winner, setWinner] = useState<number | null>(null);

  // Initialize game
  const startGame = () => {
    const newShuffled = shuffle(CHALLENGES);
    setShuffledChallenges(newShuffled);
    setQuestionIndex(0);
    setCurrentQuestion(newShuffled[0]);
    setShuffledOptions(shuffle(newShuffled[0].options));
    setPositions({ p1: 0, p2: 0 });
    setCurrentPlayer(1);
    setWinner(null);
    setFeedback(null);
    setView('playing');
  };

  const generateNewQuestion = () => {
    setQuestionIndex(prev => {
      let nextIndex = prev + 1;
      let nextShuffled = shuffledChallenges;

      if (nextIndex >= shuffledChallenges.length) {
        nextShuffled = shuffle(CHALLENGES);
        // Ensure the first question of the new deck isn't the same as the last one
        if (nextShuffled[0].q === currentQuestion?.q) {
          [nextShuffled[0], nextShuffled[nextShuffled.length - 1]] = [nextShuffled[nextShuffled.length - 1], nextShuffled[0]];
        }
        setShuffledChallenges(nextShuffled);
        nextIndex = 0;
      }

      const nextQ = nextShuffled[nextIndex];
      setCurrentQuestion(nextQ);
      setShuffledOptions(shuffle(nextQ.options));
      return nextIndex;
    });
  };

  const handleAnswer = (option: string) => {
    if (feedback || !currentQuestion) return;

    const isCorrect = option === currentQuestion.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      const playerKey = currentPlayer === 1 ? 'p1' : 'p2';
      const newPos = positions[playerKey] + 1;
      
      setPositions(prev => ({
        ...prev,
        [playerKey]: newPos
      }));

      if (newPos >= MAP_STEPS) {
        setWinner(currentPlayer);
        setTimeout(() => setView('finish'), 1500);
        return;
      }
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
      generateNewQuestion();
    }, 1500);
  };

  const resetGame = () => {
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 max-w-2xl bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-2xl border-4 border-amber-200"
          >
            <div className="flex justify-center gap-4 mb-8">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="bg-amber-500 p-6 rounded-full shadow-xl"
              >
                <Compass className="w-16 h-16 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-tight text-amber-900">
              Գույների <span className="text-amber-600">Գանձը</span>
            </h1>
            <p className="text-2xl text-amber-800/70 mb-12 font-medium">
              Գտիր թաքնված գանձը քարտեզի վրա: <br />
              Ճիշտ պատասխանիր գույների մասին հարցերին և առաջ շարժվիր:
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-100 p-6 rounded-3xl border-2 border-blue-300">
                <User className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                <p className="font-bold text-blue-800 uppercase tracking-widest">Խաղացող 1</p>
              </div>
              <div className="bg-red-100 p-6 rounded-3xl border-2 border-red-300">
                <User className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-red-800 uppercase tracking-widest">Խաղացող 2</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="group relative px-16 py-6 bg-amber-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-amber-700 transition-all shadow-2xl active:scale-95 flex items-center gap-4 mx-auto"
            >
              <MapIcon className="w-10 h-10" />
              ՍԿՍԵԼ ՈՐՈՆՈՒՄԸ
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
            {/* Map Area */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-amber-200 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentPlayer === 1 ? 'bg-blue-500 shadow-lg' : 'bg-slate-200'}`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className={`font-black uppercase tracking-widest ${currentPlayer === 1 ? 'text-blue-600' : 'text-slate-400'}`}>Խաղացող 1</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full border border-amber-200">
                  <Compass className="w-5 h-5 text-amber-600" />
                  <span className="font-black text-amber-900 uppercase italic">Ճանապարհ դեպի գանձը</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-black uppercase tracking-widest ${currentPlayer === 2 ? 'text-red-600' : 'text-slate-400'}`}>Խաղացող 2</span>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentPlayer === 2 ? 'bg-red-500 shadow-lg' : 'bg-slate-200'}`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Visual Map Path */}
              <div className="relative h-32 flex items-center px-12 mb-4">
                <div className="absolute left-12 right-12 h-4 bg-amber-100 rounded-full border-2 border-amber-200" />
                
                {/* Steps markers */}
                {Array.from({ length: MAP_STEPS + 1 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute h-6 w-1 bg-amber-300 rounded-full"
                    style={{ left: `${(i / MAP_STEPS) * 100}%`, transform: 'translateX(-50%)' }}
                  />
                ))}

                {/* Player 1 Avatar */}
                <motion.div 
                  animate={{ left: `${(positions.p1 / MAP_STEPS) * 100}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-8"
                >
                  <div className="bg-blue-500 p-3 rounded-full shadow-xl border-4 border-white">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rotate-45" />
                </motion.div>

                {/* Player 2 Avatar */}
                <motion.div 
                  animate={{ left: `${(positions.p2 / MAP_STEPS) * 100}%` }}
                  className="absolute z-20 -translate-x-1/2 translate-y-8"
                >
                  <div className="bg-red-500 p-3 rounded-full shadow-xl border-4 border-white">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rotate-45" />
                </motion.div>

                {/* Treasure Chest */}
                <div className="absolute right-0 translate-x-1/2">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-yellow-400 p-4 rounded-3xl shadow-2xl border-4 border-amber-600"
                  >
                    <Gem className="w-10 h-10 text-amber-900" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Quiz Arena */}
            <div className="bg-white/95 backdrop-blur-md rounded-[4rem] p-12 border-4 border-amber-200 shadow-2xl min-h-[450px] flex flex-col items-center justify-center text-center relative">
              <AnimatePresence mode="wait">
                {currentQuestion && !feedback ? (
                  <motion.div 
                    key={currentQuestion.q}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 mb-8">
                      <Palette className="w-8 h-8 text-amber-600" />
                      <h2 className="text-4xl font-black text-slate-800 leading-tight">
                        {currentQuestion.q}
                      </h2>
                      <p className="text-2xl text-slate-500 font-bold italic">
                        {currentQuestion.hy}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {shuffledOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="group relative py-8 px-4 bg-amber-50 hover:bg-amber-100 rounded-3xl border-4 border-amber-200 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                          <span className="text-3xl font-black text-amber-900">{option}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="feedback"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    {feedback === 'correct' ? (
                      <>
                        <div className="w-40 h-40 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                          <CheckCircle2 className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-7xl font-black italic uppercase text-emerald-600 tracking-tighter animate-bounce">ՃԻՇՏ Է:</h3>
                        <p className="text-2xl font-bold text-slate-500 mt-4 italic">Դու առաջ ես շարժվում դեպի գանձը:</p>
                      </>
                    ) : (
                      <>
                        <div className="w-40 h-40 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                          <XCircle className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-7xl font-black italic uppercase text-red-600 tracking-tighter">ՍԽԱԼ Է:</h3>
                        <p className="text-2xl font-bold text-slate-500 mt-4 italic">Ճիշտ պատասխանն էր՝ <span className="text-amber-600 font-black">{currentQuestion?.correct}</span></p>
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
            className="text-center z-10 bg-white p-16 rounded-[5rem] border-8 border-amber-400 shadow-2xl max-w-3xl relative"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-yellow-400 p-8 rounded-full shadow-2xl border-8 border-white"
              >
                <Gem className="w-20 h-20 text-amber-900" />
              </motion.div>
            </div>

            <h2 className="text-7xl font-black italic uppercase mb-4 mt-8 text-amber-900">ԳԱՆՁԸ ԳՏՆՎԱԾ Է:</h2>
            <p className="text-3xl text-amber-800/70 mb-12 font-bold">
              {winner === 1 ? (
                <span className="text-blue-600 uppercase tracking-widest">Խաղացող 1-ը հաղթեց և գտավ գանձը:</span>
              ) : (
                <span className="text-red-600 uppercase tracking-widest">Խաղացող 2-ը հաղթեց և գտավ գանձը:</span>
              )}
            </p>

            <button 
              onClick={resetGame}
              className="w-full py-8 bg-amber-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-amber-700 transition-all shadow-2xl flex items-center justify-center gap-4"
            >
              <RefreshCw className="w-8 h-8" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #fffbeb; }
      `}} />
    </div>
  );
}
