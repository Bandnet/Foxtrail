import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { puzzles } from './puzzlesData';
import './foxtrail.css';

const TRAIL_ORDER_STORAGE_KEY = 'foxtrail_trail_order';

const shuffleArray = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
};

const createRouteKey = (index) => {
  const randomPart = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

  return `${index + 1}-${randomPart}`;
};

const createTrailOrder = () => {
  const orderedPuzzleIds = puzzles
    .slice()
    .sort((leftPuzzle, rightPuzzle) => leftPuzzle.id - rightPuzzle.id)
    .map((puzzle) => puzzle.id);

  return orderedPuzzleIds.map((puzzleId, index) => ({
    puzzleId,
    routeKey: createRouteKey(index),
  }));
};

const loadTrailOrder = () => {
  try {
    const savedTrailOrder = localStorage.getItem(TRAIL_ORDER_STORAGE_KEY);

    if (!savedTrailOrder) {
      return null;
    }

    const parsedTrailOrder = JSON.parse(savedTrailOrder);

    if (!Array.isArray(parsedTrailOrder) || parsedTrailOrder.length !== puzzles.length) {
      return null;
    }

    return parsedTrailOrder;
  } catch {
    return null;
  }
};

// Use CSS classes in src/foxtrail.css instead of inline styles
const markdownComponents = {
  p: ({ children }) => (
    <p className="md-p">{children}</p>
  ),
  h1: ({ children }) => (
    <h1 className="md-h1">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="md-h2">{children}</h2>
  ),
  ul: ({ children }) => (
    <ul className="md-ul">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="md-ol">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="md-li">{children}</li>
  )
};

// --- Home/Start Page Component ---
const Home = ({ setMaxUnlocked }) => {
  const navigate = useNavigate();

  const startTrail = () => {
    const freshTrailOrder = createTrailOrder();

    localStorage.setItem(TRAIL_ORDER_STORAGE_KEY, JSON.stringify(freshTrailOrder));
    localStorage.setItem('foxtrail_progress', '0');
    setMaxUnlocked(0);
    navigate(`/puzzle/${freshTrailOrder[0].routeKey}`);
  };

  return (
    <div className="container">
      <span style={{ fontSize: '64px' }}>🦊</span>
      <h1 className="home-title">Foxtrail Adventure</h1>
      <p className="home-desc">Track down the clues, explore your surroundings, and solve the riddles to find the hidden path.</p>
      <button onClick={startTrail} className="button">Start Hunt</button>
    </div>
  );
};

// --- Single Puzzle Template Component ---
const PuzzlePage = ({ maxUnlocked, setMaxUnlocked }) => {
  const { routeKey } = useParams();
  const navigate = useNavigate();
  const trailOrder = loadTrailOrder() ?? createTrailOrder();
  const currentStepIndex = trailOrder.findIndex((step) => step.routeKey === routeKey);
  
  const [inputAnswer, setInputAnswer] = useState('');
  const [error, setError] = useState('');

  const currentStep = trailOrder[currentStepIndex];
  const puzzle = puzzles.find((item) => item.id === currentStep?.puzzleId);

  if (!puzzle || currentStepIndex === -1 || currentStepIndex > maxUnlocked) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputAnswer.trim().toLowerCase() === puzzle.correctAnswer.toLowerCase()) {
      setError('');
      setInputAnswer('');
      
      const nextStep = trailOrder[currentStepIndex + 1];

      if (nextStep) {
        const nextUnlockedStep = currentStepIndex + 1;

        if (nextUnlockedStep > maxUnlocked) {
          setMaxUnlocked(nextUnlockedStep);
          localStorage.setItem('foxtrail_progress', nextUnlockedStep.toString());
        }

        navigate(`/puzzle/${nextStep.routeKey}`);
      } else {
        navigate('/finish');
      }
    } else {
      setError('❌ Incorrect answer. Take a closer look!');
    }
  };

  return (
    <div className="container">
      <span className="stage">Stage {currentStepIndex + 1} of {trailOrder.length}</span>
      <h2>{puzzle.title}</h2>

      <div className="markdown">
        <ReactMarkdown components={markdownComponents}>{puzzle.description}</ReactMarkdown>
      </div>

      {puzzle.image && (
        <img src={puzzle.image} alt={`Clue for ${puzzle.title}`} className="hint-image" />
      )}

      {puzzle.afterImageText && (
        <div className="markdown">
          <ReactMarkdown components={markdownComponents}>{puzzle.afterImageText}</ReactMarkdown>
        </div>
      )}

      <form onSubmit={handleSubmit} className="puzzle-form">
        <input
          type="text"
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
          placeholder="Type your discovery here..."
          className="input"
        />
        <button type="submit" className="button verify">Verify Answer</button>
      </form>

      {error && (
        <div className="error-box">{error}</div>
      )}
    </div>
  );
};

// --- Finish Page Component ---
const Finish = () => {
  const finishInstructions = `**Wie es jetzt weitergeht**

Jedes Bild ist ein Teil eines Swisstranfer Links. Der Link besteht aus 5 Teile und es wird immer mit einem Bindestrich verbunden(-). Z.B https://www.swisstransfer.com/d/abc123-1122-3344-5566-12ab34cd

Es ist auch mit einen Password geschütz, dies ist gleich aufgebaut: string1-string2

Link: 1-1 2-2 3-4 4-3 6-5

PWD: 7-1 5-2

Finde das Beweisvideo und ehre Raul's Tod und bringe Ramirez hinter Gitter!!
`;

  return (
    <div className="container">
      <h1 style={{ color: '#c70808', margin: '10px 0' }}>Fast Fertig!</h1>

      <div className="finish-box markdown">
        <ReactMarkdown components={markdownComponents}>{finishInstructions}</ReactMarkdown>
      </div>
      <button onClick={() => window.location.hash = '/'} className="button return">Return Home</button>
    </div>
  );
};

// --- Main App Setup ---
export default function App() {
  const [maxUnlocked, setMaxUnlocked] = useState(() => {
    const saved = localStorage.getItem('foxtrail_progress');
    return saved ? parseInt(saved, 10) : 0;
  });

  return (
    <HashRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Home setMaxUnlocked={setMaxUnlocked} />} />
          <Route path="/puzzle/:routeKey" element={<PuzzlePage maxUnlocked={maxUnlocked} setMaxUnlocked={setMaxUnlocked} />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}