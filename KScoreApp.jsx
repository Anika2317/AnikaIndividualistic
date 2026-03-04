// Note: Imports are handled by the index.html CDN scripts
const { useState, useEffect } = React;

// Helper to render Lucide icons in the browser without a bundler
const Icon = ({ name, className }) => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);
  return <i data-lucide={window.lucideIcons[name] || 'circle'} className={className}></i>;
};

// ============================================================
// DATA & STATE MANAGEMENT
// ============================================================

const initialUserState = {
  id: 'user_001',
  name: 'You',
  kScore: 527,
  level: 8,
  totalXP: 4200,
  xpToNextLevel: 800,
  streak: 12,
  lastActive: new Date().toISOString(),
  dimensions: {
    logic: { value: 78, color: '#3B82F6' },
    empathy: { value: 92, color: '#EC4899' },
    discipline: { value: 65, color: '#F59E0B' },
    emotionalRegulation: { value: 74, color: '#10B981' },
    integrity: { value: 88, color: '#8B5CF6' }
  }
};

const philosophyLessons = [
  { id: 'lesson_001', title: 'Stoicism: The Art of Control', author: 'Marcus Aurelius', category: 'Philosophy', duration: '8 min', difficulty: 'Intermediate', excerpt: 'Some things are within your control...', content: 'The Stoic dichotomy of control teaches that suffering comes from trying to control what we cannot.', reflection: 'What aspect of your life have you been trying to control?', color: '#8B5CF6' },
  { id: 'lesson_002', title: 'Kant\'s Categorical Imperative', author: 'Immanuel Kant', category: 'Philosophy', duration: '10 min', difficulty: 'Advanced', excerpt: 'Act only according to that maxim...', content: 'Kant asks: Would I want everyone to do what I\'m about to do?', reflection: 'Would you want everyone to make your recent choice?', color: '#3B82F6' }
];

const literaryLessons = [
  { id: 'lit_001', title: 'The Underground Man', author: 'Fyodor Dostoevsky', category: 'Literary Masters', duration: '13 min', difficulty: 'Advanced', excerpt: 'I am sick of my own face...', content: 'Dostoevsky explores the irrationality of the human spirit.', reflection: 'How do you engage in self-sabotage?', color: '#1F2937' }
];

const dilemmas = [
  { id: 'dilemma_001', title: 'The Trolley Problem', scenario: 'A runaway trolley is heading toward five people. Pull the lever to save five but kill one?', philosophers: [{ name: 'Mill', view: 'Pull it. Save the most lives.' }, { name: 'Kant', view: 'Don\'t pull it. Don\'t use a person as a means.' }], color: '#EF4444' }
];

const challenges = [
  { id: 'ch_001', title: 'Daily Reflection', description: 'Journal for 5 minutes.', difficulty: 'Easy', xp: 50 }
];

const affirmations = [
  { text: 'My mind is capable of growth.', category: 'neuroplasticity' }
];

// ============================================================
// COMPONENTS
// ============================================================

const DimensionRadar = ({ dimensions }) => {
  const dimensionAngles = { logic: 0, empathy: 72, discipline: 144, emotionalRegulation: 216, integrity: 288 };
  return (
    <svg width="200" height="200" viewBox="0 0 160 160" className="mx-auto">
      {[20, 40, 60].map(r => <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />)}
      <path
        d={Object.entries(dimensionAngles).map(([key, angle], i) => {
          const r = (dimensions[key].value / 100) * 60;
          const rad = (angle * Math.PI) / 180;
          return `${i === 0 ? 'M' : 'L'} ${80 + r * Math.cos(rad)} ${80 + r * Math.sin(rad)}`;
        }).join(' ') + ' Z'}
        fill="#06B6D4" fillOpacity="0.2" stroke="#06B6D4" strokeWidth="2"
      />
    </svg>
  );
};

const Dashboard = ({ user, setCurrentPage }) => {
  const xpProgress = ((user.totalXP % user.xpToNextLevel) / user.xpToNextLevel) * 100;
  return (
    <div className="space-y-6 pb-24">
      <div className="rounded-2xl bg-slate-900 p-8 border border-cyan-500/20">
        <div className="flex justify-between mb-4">
          <div><p className="text-gray-400 text-sm">K-Score</p><p className="text-5xl font-black text-cyan-400">{user.kScore}</p></div>
          <div className="text-right"><p className="text-gray-400 text-sm">Level</p><p className="text-4xl font-black text-amber-400">{user.level}</p></div>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-700">
          <div className="h-full bg-cyan-500" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
        <DimensionRadar dimensions={user.dimensions} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setCurrentPage('dilemmas')} className="bg-cyan-600 rounded-lg py-3 px-4 text-sm font-bold flex items-center justify-center gap-2"><Icon name="Lightbulb" className="w-4 h-4" /> Dilemma</button>
        <button onClick={() => setCurrentPage('lessons')} className="bg-purple-600 rounded-lg py-3 px-4 text-sm font-bold flex items-center justify-center gap-2"><Icon name="BookOpen" className="w-4 h-4" /> Lesson</button>
      </div>
    </div>
  );
};

// Export to window so index.html can find it
window.KScoreApp = function KScoreApp() {
  const [user, setUser] = useState(initialUserState);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between py-4 mb-6">
            <h1 className="text-2xl font-black text-cyan-400">K-Score</h1>
            <button onClick={() => setCurrentPage('home')}><Icon name="Home" className="w-6 h-6 text-gray-400" /></button>
        </div>

        {currentPage === 'home' && <Dashboard user={user} setCurrentPage={setCurrentPage} />}
        {currentPage === 'dilemmas' && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Ethical Dilemmas</h2>
                {dilemmas.map(d => (
                    <div key={d.id} className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
                        <h3 className="font-bold text-cyan-400">{d.title}</h3>
                        <p className="text-sm text-gray-400 mt-2">{d.scenario}</p>
                    </div>
                ))}
            </div>
        )}
        {currentPage === 'lessons' && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Lessons</h2>
                {philosophyLessons.map(l => (
                    <div key={l.id} className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
                        <h3 className="font-bold text-purple-400">{l.title}</h3>
                        <p className="text-xs text-gray-500">{l.author}</p>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
window.KScoreApp = KScoreApp;