import React, { useState } from 'react';
import { Info, RefreshCcw, HelpCircle } from 'lucide-react';

type BrailleDot = boolean;
type BraillePattern = BrailleDot[];

interface BrailleCharacter {
  letter: string;
  pattern: BraillePattern;
  description?: string;
}

const BRAILLE_CHARS: BrailleCharacter[] = [
  { letter: 'A', pattern: [true, false, false, false, false, false], description: 'Dot 1' },
  { letter: 'B', pattern: [true, true, false, false, false, false], description: 'Dots 1-2' },
  { letter: 'C', pattern: [true, false, false, true, false, false], description: 'Dots 1-4' },
  { letter: 'D', pattern: [true, false, false, true, true, false], description: 'Dots 1-4-5' },
  { letter: 'E', pattern: [true, false, false, false, true, false], description: 'Dots 1-5' },
  { letter: 'F', pattern: [true, true, false, true, false, false], description: 'Dots 1-2-4' },
];

function App() {
  const [currentPattern, setCurrentPattern] = useState<BraillePattern>(Array(6).fill(false));
  const [currentChar, setCurrentChar] = useState<BrailleCharacter>(BRAILLE_CHARS[0]);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const toggleDot = (index: number) => {
    const newPattern = [...currentPattern];
    newPattern[index] = !newPattern[index];
    setCurrentPattern(newPattern);
    
    // Check if the pattern matches the current character
    const correct = newPattern.every((dot, i) => dot === currentChar.pattern[i]);
    setIsCorrect(correct);
  };

  const getNewCharacter = () => {
    const newChar = BRAILLE_CHARS[Math.floor(Math.random() * BRAILLE_CHARS.length)];
    setCurrentChar(newChar);
    setCurrentPattern(Array(6).fill(false));
    setIsCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Braille Learning
          </h1>
          <p className="text-xl text-gray-600">
            Learn Braille patterns by toggling dots to match the given letter
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Current Letter Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {currentChar.letter}
            </div>
            <p className="text-gray-600">Create this letter in Braille</p>
          </div>

          {/* Braille Grid */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              {currentPattern.map((dot, index) => (
                <button
                  key={index}
                  onClick={() => toggleDot(index)}
                  className={`w-16 h-16 rounded-lg transition-all transform hover:scale-105 
                    ${dot 
                      ? 'bg-indigo-600 shadow-lg' 
                      : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                  aria-label={`Dot ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`text-center mb-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✨ Correct! Well done!' : 'Try again!'}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <HelpCircle className="w-5 h-5" />
              {showHint ? 'Hide' : 'Show'} Hint
            </button>
            <button
              onClick={getNewCharacter}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
            >
              <RefreshCcw className="w-5 h-5" />
              New Letter
            </button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Hint:</span> {currentChar.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    The standard Braille cell consists of six dots arranged in two columns of three dots each.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h2>
          <ul className="space-y-2 text-gray-600">
            <li>1. Look at the displayed letter above</li>
            <li>2. Click the dots to create the corresponding Braille pattern</li>
            <li>3. Get instant feedback on your pattern</li>
            <li>4. Use hints if you need help</li>
            <li>5. Click "New Letter" to practice with a different character</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;