import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { puzzles } from './puzzlesData';

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
    setMaxUnlocked(0);
    localStorage.setItem('foxtrail_progress', '0');
    navigate('/puzzle/0');
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
  const { id } = useParams();
  const navigate = useNavigate();
  const puzzleId = parseInt(id, 10);
  
  const [inputAnswer, setInputAnswer] = useState('');
  const [error, setError] = useState('');

  const puzzle = puzzles.find(p => p.id === puzzleId);

  if (!puzzle || puzzleId > maxUnlocked) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputAnswer.trim().toLowerCase() === puzzle.correctAnswer.toLowerCase()) {
      setError('');
      setInputAnswer('');
      
      const nextPuzzleId = puzzleId + 1;
      
      if (nextPuzzleId <= puzzles.length) {
        if (nextPuzzleId > maxUnlocked) {
          setMaxUnlocked(nextPuzzleId);
          localStorage.setItem('foxtrail_progress', nextPuzzleId.toString());
        }
        navigate(`/puzzle/${nextPuzzleId}`);
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
        Stage {puzzle.id} of {puzzles.length}
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
  const finishInstructions = `## Wie es jetzt weitergeht

Jedes Bild ist ein Hinweis. Schau es dir genau an und vergleiche es mit dem Ort, an dem ihr gerade seid.

1. Lies den Text über dem Bild.
2. Untersuche das Bild und suche nach Details, Objekten oder Markierungen.
3. Gehe zum passenden Ort draußen und finde dort den versteckten Code.
4. Trage den Code im nächsten Rätsel ein.

Wenn du unsicher bist, geh einfach zum vorherigen Rätsel zurück und prüfe Bild und Text noch einmal.`;
  const finishChecklist = [
    'Bild genau anschauen',
    'Text und Bild miteinander vergleichen',
    'Am richtigen Ort den Code suchen',
    'Code im nächsten Rätsel eingeben'
  ];

  return (
    <div style={theme.container}>
      <span style={{ fontSize: '64px' }}>🏆</span>
      <h1 style={{ color: '#27ae60', margin: '10px 0' }}>Success!</h1>
      <p style={{ fontSize: '18px', color: '#34495e', marginBottom: '30px' }}>
        Fantastic job! You solved every single mystery along the trail and finished the hunt.
      </p>
      <div style={{ ...theme.markdown, backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px' }}>
        <ReactMarkdown components={markdownComponents}>{finishInstructions}</ReactMarkdown>
      </div>
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '12px', color: '#2c3e50', fontSize: '20px' }}>To Do</h2>
        <ul style={{ margin: 0, paddingLeft: '22px', color: '#34495e', lineHeight: '1.8' }}>
          {finishChecklist.map((item) => (
            <li key={item} style={{ marginBottom: '6px' }}>{item}</li>
          ))}
        </ul>
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
          <Route path="/puzzle/:id" element={<PuzzlePage maxUnlocked={maxUnlocked} setMaxUnlocked={setMaxUnlocked} />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}