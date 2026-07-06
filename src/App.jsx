import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { puzzles } from './puzzlesData';

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

// --- Shared CSS Styling Theme ---
const theme = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '30px',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    textAlign: 'center',
    color: '#2c3e50'
  },
  button: {
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#e67e22',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px rgba(230, 126, 34, 0.2)'
  },
  input: {
    width: '100%',
    maxWidth: '320px',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #bdc3c7',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '15px',
    transition: 'border-color 0.2s'
  },
  hintImage: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginTop: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  markdown: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#34495e',
    marginBottom: '20px',
    textAlign: 'left'
  }
};

const markdownComponents = {
  p: ({ children }) => (
    <p style={{ margin: '0 0 14px 0' }}>
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 style={{ margin: '0 0 16px 0', fontSize: '24px', lineHeight: '1.2' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', lineHeight: '1.2' }}>
      {children}
    </h2>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: '0 0 14px 20px', paddingLeft: '18px' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: '0 0 14px 20px', paddingLeft: '18px' }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: '6px' }}>
      {children}
    </li>
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
    <div style={theme.container}>
      <span style={{ fontSize: '64px' }}>🦊</span>
      <h1 style={{ fontSize: '32px', margin: '10px 0 20px 0', color: '#2c3e50' }}>Foxtrail Adventure</h1>
      <p style={{ fontSize: '16px', color: '#7f8c8d', lineHeight: '1.6', marginBottom: '30px' }}>
        Track down the clues, explore your surroundings, and solve the riddles to find the hidden path.
      </p>
      <button onClick={startTrail} style={theme.button}>
        Start Hunt
      </button>
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
    <div style={theme.container}>
      <span style={{ fontSize: '14px', textTransform: 'uppercase', tracking: '1px', color: '#95a5a6', fontWeight: 'bold' }}>
        Stage {currentStepIndex + 1} of {trailOrder.length}
      </span>
      <h2 style={{ marginTop: '5px', marginBottom: '15px', color: '#2c3e50' }}>{puzzle.title}</h2>
      
      <div style={theme.markdown}>
        <ReactMarkdown components={markdownComponents}>{puzzle.description}</ReactMarkdown>
      </div>

      {/* Render Image hint if present */}
      {puzzle.image && (
        <img 
          src={puzzle.image} 
          alt={`Clue for ${puzzle.title}`} 
          style={theme.hintImage} 
        />
      )}

      {puzzle.afterImageText && (
        <div style={theme.markdown}>
          <ReactMarkdown components={markdownComponents}>{puzzle.afterImageText}</ReactMarkdown>
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="text" 
          value={inputAnswer} 
          onChange={(e) => setInputAnswer(e.target.value)} 
          placeholder="Type your discovery here..." 
          style={theme.input}
          onFocus={(e) => e.target.style.borderColor = '#e67e22'}
          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
        />
        <button type="submit" style={{ ...theme.button, backgroundColor: '#2ecc71', boxShadow: '0 4px 6px rgba(46, 204, 113, 0.2)' }}>
          Verify Answer
        </button>
      </form>
      
      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fdeae8', color: '#c0392b', borderRadius: '8px', fontWeight: '500' }}>
          {error}
        </div>
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
    <div style={theme.container}>
      <h1 style={{ color: '#c70808', margin: '10px 0' }}>Fast Fertig!</h1>

      <div style={{ ...theme.markdown, backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px' }}>
        <ReactMarkdown components={markdownComponents}>{finishInstructions}</ReactMarkdown>
      </div>
      <button 
        onClick={() => window.location.hash = '/'} 
        style={{ ...theme.button, backgroundColor: '#34495e', boxShadow: '0 4px 6px rgba(52, 73, 94, 0.2)' }}
      >
        Return Home
      </button>
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
      <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '10px', boxSizing: 'border-box' }}>
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