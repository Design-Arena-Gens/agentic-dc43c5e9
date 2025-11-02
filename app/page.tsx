'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const designs = [
  { id: 1, type: 'Poster', color: 'from-pink-500 to-purple-600', ai: 'AI Model A' },
  { id: 2, type: 'Website', color: 'from-cyan-500 to-blue-600', ai: 'AI Model B' },
  { id: 3, type: 'Logo', color: 'from-green-500 to-teal-600', ai: 'AI Model A' },
  { id: 4, type: '3D Art', color: 'from-orange-500 to-red-600', ai: 'AI Model B' },
];

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [showBattle, setShowBattle] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setCurrentScene(1) },
      { delay: 2000, action: () => setShowBattle(true) },
      { delay: 5000, action: () => { setCurrentScene(2); setShowVoting(true); } },
      { delay: 8000, action: () => { setCurrentScene(3); setShowLeaderboard(true); } },
      { delay: 11000, action: () => { setCurrentScene(4); setShowTagline(true); } },
      { delay: 13000, action: () => setShowLogo(true) },
    ];

    const timers = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 animate-pulse-slow" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-pink-900 via-transparent to-blue-900"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scene 1: Opening Text */}
      <AnimatePresence>
        {currentScene >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-center glitch-effect"
              data-text="Ab design karega AI vs AI!"
              animate={{
                textShadow: [
                  '0 0 20px #ff00ff, 0 0 40px #ff00ff',
                  '0 0 20px #00f0ff, 0 0 40px #00f0ff',
                  '0 0 20px #ff00ff, 0 0 40px #ff00ff',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Ab design karega AI vs AI!
              </span>
              <span className="ml-4 text-5xl">🔥</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: Design Battle */}
      <AnimatePresence>
        {showBattle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-8 z-20"
          >
            {designs.map((design, idx) => (
              <motion.div
                key={design.id}
                initial={{ x: idx % 2 === 0 ? -1000 : 1000, rotateY: 180 }}
                animate={{ x: 0, rotateY: 0 }}
                transition={{ delay: idx * 0.3, type: 'spring', stiffness: 100 }}
                className="relative"
              >
                <motion.div
                  className={`w-48 h-64 bg-gradient-to-br ${design.color} rounded-lg neon-border shadow-2xl`}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 20px currentColor',
                      '0 0 40px currentColor',
                      '0 0 20px currentColor',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                >
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div className="text-white font-bold text-xl">{design.type}</div>
                    <div className="text-white text-sm opacity-80">{design.ai}</div>
                  </div>
                </motion.div>

                {/* Glitch Overlay */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3 + 2
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Voting Interface */}
      <AnimatePresence>
        {showVoting && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/80"
          >
            <motion.h2
              className="text-5xl font-bold mb-8 text-glow"
              animate={{
                scale: [1, 1.1, 1],
                color: ['#ff00ff', '#00f0ff', '#ff00ff'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Kaunsa model banayega best look?
            </motion.h2>

            <motion.div
              className="text-4xl font-bold text-cyan-400 mb-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tum decide karoge — vote do!
            </motion.div>

            <div className="flex gap-8">
              {['Vote', 'Compare', 'Discover'].map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.3 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-2xl font-bold neon-border cursor-pointer hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 4: Leaderboard */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-40 bg-black/90"
          >
            <div className="w-96">
              <motion.h2
                className="text-4xl font-bold text-center mb-8 text-cyan-400 text-glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Rising Leaderboard
              </motion.h2>

              {['AI Model A', 'AI Model B', 'AI Model C'].map((name, idx) => (
                <motion.div
                  key={name}
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.3 }}
                  className="mb-4 p-4 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg neon-border"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">#{idx + 1} {name}</span>
                    <motion.span
                      className="text-3xl font-bold text-green-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {1000 - idx * 200}
                    </motion.span>
                  </div>

                  <motion.div
                    className="mt-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - idx * 20}%` }}
                    transition={{ delay: idx * 0.3 + 0.5, duration: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 5: Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black"
          >
            <motion.div
              className="text-6xl font-bold mb-8"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {['Vote.', 'Compare.', 'Discover.'].map((word, idx) => (
                <motion.span
                  key={word}
                  className="inline-block mx-4"
                  style={{
                    background: 'linear-gradient(45deg, #ff00ff, #00f0ff, #00ff41)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ delay: idx * 0.3, duration: 1, repeat: Infinity }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 6: Logo Animation */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-60 bg-black"
          >
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="relative"
            >
              <motion.h1
                className="text-8xl font-bold mb-8 glitch-effect"
                data-text="DesignArena.ai"
                style={{
                  background: 'linear-gradient(45deg, #ff00ff, #00f0ff, #ff00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px #ff00ff)',
                    'drop-shadow(0 0 40px #00f0ff)',
                    'drop-shadow(0 0 20px #ff00ff)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DesignArena.ai
              </motion.h1>

              {/* Particle effects around logo */}
              {[...Array(20)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 400],
                    y: [0, (Math.random() - 0.5) * 400],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.1,
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              className="text-4xl text-cyan-400 font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Where AIs Compete, Creativity Wins.
            </motion.p>

            {/* Electric energy lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              {[...Array(5)].map((_, idx) => (
                <motion.line
                  key={idx}
                  x1={`${idx * 20}%`}
                  y1="0%"
                  x2={`${idx * 20}%`}
                  y2="100%"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </main>
  );
}
