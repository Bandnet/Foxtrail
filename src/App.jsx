import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
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
  }
};

// --- Home/Start Page Component ---
const Home = ({ setMaxUnlocked }) => {
  const navigate = useNavigate();

  const startTrail = () => {
    setMaxUnlocked(1);
    localStorage.setItem('foxtrail_progress', '1');
    navigate('/puzzle/1');
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
      
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#34495e', marginBottom: '20px' }}>
        {puzzle.description}
      </p>

      {/* Render Image hint if present */}
      {puzzle.image && (
        <img 
          src={puzzle.image} 
          alt={`Clue for ${puzzle.title}`} 
          style={theme.hintImage} 
        />
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
  return (
    <div style={theme.container}>
      <span style={{ fontSize: '64px' }}>🏆</span>
      <h1 style={{ color: '#27ae60', margin: '10px 0' }}>Success!</h1>
      <p style={{ fontSize: '18px', color: '#34495e', marginBottom: '30px' }}>
        Fantastic job! You solved every single mystery along the trail and finished the hunt.
      </p>
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
    return saved ? parseInt(saved, 10) : 1;
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