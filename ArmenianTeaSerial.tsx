import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  CupSoda, 
  User, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Sparkles,
  Smile,
  Frown,
  Laugh,
  Heart
} from 'lucide-react';

const SCRIPT = [
  {
    character: "Francisco",
    mood: "important",
    es: "Sabes, María... ahora soy el gerente y tengo mucho trabajo. Ya no bebo solo té. ¡Ahora bebo café! ¡El café es para la gente importante!",
    hy: "Գիտես, Մարիա... հիմա ես մենեջերն եմ և շատ աշխատանք ունեմ: Այլևս միայն թեյ չեմ խմում: Հիմա ես սուրճ եմ խմում: Սուրճը կարևոր մարդկանց համար է:",
    icon: <User className="w-12 h-12 text-blue-500" />,
    bg: "bg-blue-50"
  },
  {
    character: "Pablo",
    mood: "laughing",
    es: "¡¿Qué?! ¡¿Tú bebes café, Francisco?! ¡Pero si ayer llorabas porque el café estaba muy amargo! ¡Sos un mentiroso!",
    hy: "Ի՞նչ: Դո՞ւ ես սուրճ խմում, Ֆրանսիսկո: Բայց չէ՞ որ երեկ լաց էիր լինում, որովհետև սուրճը շատ դառն էր: Դու ստախոս ես (արժենտինական ոճով):",
    icon: <Laugh className="w-12 h-12 text-red-500" />,
    bg: "bg-red-50"
  },
  {
    character: "Ignacio",
    mood: "dying laughing",
    es: "¡Mirá, Pablo! ¡Se cree el modelo de la oficina con su tacita de café! ¡Che, Francisco! ¿Cómo bebes eso si no te gusta?",
    hy: "Նայիր, Պաբլո՛: Իրեն գրասենյակի մոդելն է կարծում իր փոքրիկ սուրճի բաժակով: Է՛յ, Ֆրանսիսկո՛, ինչպե՞ս ես դա խմում, եթե դուրդ չի գալիս:",
    icon: <Laugh className="w-12 h-12 text-orange-500" />,
    bg: "bg-orange-50"
  },
  {
    character: "María",
    mood: "smiling",
    es: "Francisco... ¿Cómo puedes ser el gerente y mentir así? ¡El té armenio es muy rico! No necesitas café para ser importante.",
    hy: "Ֆրանսիսկո... ինչպե՞ս կարող ես մենեջեր լինել ու այսպես ստել: Հայկական թեյը շատ համեղ է: Քեզ սուրճ պետք չէ կարևոր լինելու համար:",
    icon: <Smile className="w-12 h-12 text-pink-500" />,
    bg: "bg-pink-50"
  },
  {
    character: "Francisco",
    mood: "ashamed",
    es: "Bueno... es verdad. El café es horrible. ¡No hay café rico! ¡Solo hay té armenio enfrente de mí!",
    hy: "Դե լավ... ճիշտ է: Սուրճը սարսափելի է: Համեղ սուրճ չկա (No hay): Միայն հայկական թեյ կա իմ դիմաց:",
    icon: <Frown className="w-12 h-12 text-slate-500" />,
    bg: "bg-slate-100"
  },
  {
    character: "Pablo",
    mood: "happy",
    es: "¡Eso! ¡Y hay gata! ¡La gata está muy rica! ¡Vamos a comer, chicos!",
    hy: "Այո՛: Եվ գաթա կա: Գաթան շատ համեղ է (Rica): Գնացինք ուտելու, տղանե՛ր:",
    icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
    bg: "bg-yellow-50"
  },
  {
    character: "Todos",
    mood: "celebrating",
    es: "¡¡¡SALUD!!!",
    hy: "ԿԵՑՑԵ՜Ք",
    icon: <Heart className="w-12 h-12 text-red-600" />,
    bg: "bg-emerald-50"
  }
];

export default function ArmenianTeaSerial() {
  const [step, setStep] = useState(0);
  const [showArmenian, setShowArmenian] = useState(true);

  const next = () => setStep((s) => Math.min(s + 1, SCRIPT.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => setStep(0);

  const current = SCRIPT[step];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10"><Coffee className="w-24 h-24 rotate-12" /></div>
        <div className="absolute bottom-10 right-10"><CupSoda className="w-24 h-24 -rotate-12" /></div>
        <div className="absolute top-1/2 left-1/4"><Sparkles className="w-16 h-16" /></div>
      </div>

      <div className="w-full max-w-3xl z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block bg-amber-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4 shadow-lg"
          >
            Մաս 4 — Գործնական սուրճը
          </motion.div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
            Հայկական թեյի <span className="text-amber-600">գաղտնիքը</span>
          </h1>
        </div>

        {/* Serial Container */}
        <div className={`relative ${current.bg} rounded-[3rem] p-12 shadow-2xl border-4 border-white transition-colors duration-500 min-h-[500px] flex flex-col justify-between`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="flex flex-col gap-8"
            >
              {/* Character Info */}
              <div className="flex items-center gap-6">
                <div className="bg-white p-4 rounded-3xl shadow-xl border-2 border-slate-100">
                  {current.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">
                    {current.character}
                  </h2>
                  <p className="text-slate-400 font-bold italic uppercase text-sm">
                    {current.mood}
                  </p>
                </div>
              </div>

              {/* Dialogue */}
              <div className="flex flex-col gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-white shadow-sm">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-8 h-8 text-slate-300 shrink-0 mt-1" />
                    <p className="text-3xl font-bold leading-relaxed text-slate-800">
                      {current.es}
                    </p>
                  </div>
                </div>

                {showArmenian && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-100/50 p-6 rounded-3xl border-2 border-amber-200/30 italic"
                  >
                    <p className="text-xl font-medium text-amber-900 leading-relaxed">
                      {current.hy}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t-2 border-white/50">
            <div className="flex gap-4">
              <button 
                onClick={prev}
                disabled={step === 0}
                className="p-4 bg-white rounded-2xl shadow-md hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ArrowLeft className="w-8 h-8 text-slate-600" />
              </button>
              <button 
                onClick={next}
                disabled={step === SCRIPT.length - 1}
                className="p-4 bg-white rounded-2xl shadow-md hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ArrowRight className="w-8 h-8 text-slate-600" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowArmenian(!showArmenian)}
                className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${showArmenian ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-500'}`}
              >
                {showArmenian ? 'Թաքցնել թարգմանությունը' : 'Ցույց տալ թարգմանությունը'}
              </button>
              
              {step === SCRIPT.length - 1 && (
                <button 
                  onClick={restart}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl"
                >
                  <Play className="w-4 h-4" />
                  ՆՈՐԻՑ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 flex gap-2 justify-center">
          {SCRIPT.map((_, i) => (
            <div 
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-12 bg-amber-500' : 'w-4 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}} />
    </div>
  );
}
