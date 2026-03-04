   npm install lucide-react

   import KScoreApp from './KScoreApp'
   
   export default function App() {
     return <KScoreApp />
   }
   import React, { useState, useEffect } from 'react';
import { 
  Brain, Zap, Target, BookOpen, Heart, Lightbulb, 
  ChevronRight, Award, Flame, TrendingUp, CheckCircle,
  MessageSquare, Play, BarChart3, Home, GraduationCap,
  Compass, Sparkles, Lock, Unlock
} from 'lucide-react';

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
  {
    id: 'lesson_001',
    title: 'Stoicism: The Art of Control',
    author: 'Marcus Aurelius & Epictetus',
    category: 'Philosophy',
    duration: '8 min',
    difficulty: 'Intermediate',
    excerpt: 'Some things are within your control (thoughts, actions), others are not (outcomes, opinions).',
    content: 'The Stoic dichotomy of control teaches that suffering comes from trying to control what we cannot. Learn to focus energy on what lies within your power: your judgments, desires, and actions. This ancient wisdom predates modern psychology but aligns perfectly with cognitive behavioral therapy.',
    reflection: 'What aspect of your life have you been trying to control that's beyond your reach?',
    color: '#8B5CF6',
    relatedDimensions: ['emotionalRegulation', 'discipline']
  },
  {
    id: 'lesson_002',
    title: 'Kant\'s Categorical Imperative',
    author: 'Immanuel Kant',
    category: 'Philosophy',
    duration: '10 min',
    difficulty: 'Advanced',
    excerpt: 'Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.',
    content: 'Kant\'s moral framework asks: "Would I want everyone to do what I\'m about to do?" This simple question reveals the ethical foundation of our choices. Unlike utilitarianism (focused on outcomes), Kant emphasizes duty and universal principles as the basis of morality.',
    reflection: 'Describe a recent decision through Kant\'s lens: Would you want everyone to make the same choice?',
    color: '#3B82F6',
    relatedDimensions: ['integrity', 'logic']
  },
  {
    id: 'lesson_003',
    title: 'Mill\'s Utilitarianism',
    author: 'John Stuart Mill',
    category: 'Philosophy',
    duration: '9 min',
    difficulty: 'Advanced',
    excerpt: 'Actions are right in proportion as they tend to promote happiness, wrong as they tend to produce the reverse.',
    content: 'Mill refines Bentham\'s utilitarianism: not all pleasures are equal—intellectual and moral pleasures rank higher than physical ones. The best action maximizes overall well-being. This framework helps analyze complex decisions with multiple stakeholders.',
    reflection: 'How would you apply Mill\'s framework to a recent decision affecting multiple people?',
    color: '#10B981',
    relatedDimensions: ['empathy', 'logic']
  },
  {
    id: 'lesson_004',
    title: 'Aristotle\'s Virtue Ethics',
    author: 'Aristotle',
    category: 'Philosophy',
    duration: '11 min',
    difficulty: 'Advanced',
    excerpt: 'Virtue is a habit, formed by the repetition of virtuous acts. Excellence is not an act but a habit.',
    content: 'Unlike duty-based or consequence-based ethics, virtue ethics asks: "What would a virtuous person do?" Character development through practice is central. Aristotle identifies virtues as the golden mean between extremes—courage between cowardice and recklessness.',
    reflection: 'Which virtue would you like to develop more deeply? How can you practice it this week?',
    color: '#F59E0B',
    relatedDimensions: ['discipline', 'integrity']
  },
  {
    id: 'lesson_005',
    title: 'Cognitive Biases & Heuristics',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    duration: '12 min',
    difficulty: 'Intermediate',
    excerpt: 'Our minds use mental shortcuts that often lead us astray. Understanding these biases improves decision-making.',
    content: 'Kahneman\'s research reveals we have two thinking systems: System 1 (fast, intuitive) and System 2 (slow, deliberate). We default to System 1, which leads to confirmation bias, anchoring, availability bias, and more. Awareness of these patterns is the first step to overcoming them.',
    reflection: 'Identify one cognitive bias you notice in yourself. How does it affect your decisions?',
    color: '#EC4899',
    relatedDimensions: ['logic', 'emotionalRegulation']
  },
  {
    id: 'lesson_006',
    title: 'Rogers\' Unconditional Positive Regard',
    author: 'Carl Rogers',
    category: 'Psychology',
    duration: '10 min',
    difficulty: 'Beginner',
    excerpt: 'Growth happens in an environment of acceptance, empathy, and genuine understanding.',
    content: 'Rogers revolutionized psychology by emphasizing the therapeutic power of accepting others without judgment. This "unconditional positive regard" applies to self-compassion too. Self-criticism blocks growth; self-acceptance enables it. Learn to extend this to yourself and others.',
    reflection: 'Who in your life shows you unconditional positive regard? How can you offer this to yourself?',
    color: '#10B981',
    relatedDimensions: ['empathy', 'emotionalRegulation']
  }
];

const literaryLessons = [
  {
    id: 'lesson_lit_001',
    title: 'The Underground Man & Self-Deception',
    author: 'Fyodor Dostoevsky',
    category: 'Literary Masters',
    duration: '13 min',
    difficulty: 'Advanced',
    excerpt: 'I am sick of my own face. The consciousness of one\'s own humiliation will crush the spirit.',
    content: 'Dostoevsky\'s underground man is paralyzed by self-awareness and contradiction. His wisdom: we are irrational, capable of self-sabotage, and often choose suffering over rational happiness. This psychological depth predates modern psychology by a century. Suffering transforms consciousness itself.',
    reflection: 'How do you engage in self-sabotage? What irrational choices do you defend?',
    color: '#1F2937',
    relatedDimensions: ['emotionalRegulation', 'integrity']
  },
  {
    id: 'lesson_lit_002',
    title: 'Suffering as Transformation',
    author: 'Fyodor Dostoevsky',
    category: 'Literary Masters',
    duration: '14 min',
    difficulty: 'Advanced',
    excerpt: 'The soul is healed by torment... pain is creation itself.',
    content: 'In *Crime and Punishment* and *The Brothers Karamazov*, Dostoevsky shows that suffering is inseparable from spiritual growth. Not masochism, but the idea that avoiding all pain leads to spiritual death. Redemption requires facing darkness within.',
    reflection: 'What past suffering has transformed you? How has pain created meaning in your life?',
    color: '#1F2937',
    relatedDimensions: ['discipline', 'integrity']
  },
  {
    id: 'lesson_lit_003',
    title: 'The Double & Shadow Self',
    author: 'Fyodor Dostoevsky',
    category: 'Literary Masters',
    duration: '11 min',
    difficulty: 'Intermediate',
    excerpt: 'We are all doubles—conscious of our contradictions, yet blind to half of ourselves.',
    content: 'Dostoevsky\'s exploration of the shadow self—the disowned aspects of personality—parallels Jung\'s later psychology. Our doubles expose our denial, hypocrisy, and hidden desires. Integration, not rejection, leads to wholeness.',
    reflection: 'What aspects of yourself do you disown or deny? What would it mean to integrate them?',
    color: '#1F2937',
    relatedDimensions: ['emotionalRegulation', 'empathy']
  },
  {
    id: 'lesson_lit_004',
    title: 'The Absurd: Bureaucracy & Anxiety',
    author: 'Franz Kafka',
    category: 'Literary Masters',
    duration: '12 min',
    difficulty: 'Advanced',
    excerpt: 'You are not obliged to complete the work, but neither are you free to abandon it.',
    content: 'Kafka captures the anxiety of modern systems—bureaucratic, incomprehensible, inescapable. In *The Trial* and *The Castle*, characters face judgment and authority without understanding why. This absurdism reflects how we navigate unclear rules and invisible structures in modern life.',
    reflection: 'Where do you feel trapped by systems beyond your control? How do you respond to ambiguity?',
    color: '#1F2937',
    relatedDimensions: ['emotionalRegulation', 'discipline']
  },
  {
    id: 'lesson_lit_005',
    title: 'Metamorphosis & Identity Loss',
    author: 'Franz Kafka',
    category: 'Literary Masters',
    duration: '10 min',
    difficulty: 'Intermediate',
    excerpt: 'As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed into a monstrous insect.',
    content: 'In this masterwork, a man\'s sudden transformation forces the question: what defines identity? Is it the body, the mind, our roles, or our relationships? Kafka explores how we lose ourselves in duty, capitalism, and family expectations.',
    reflection: 'How have you transformed? What defines your identity beyond your roles and relationships?',
    color: '#1F2937',
    relatedDimensions: ['integrity', 'empathy']
  },
  {
    id: 'lesson_lit_006',
    title: 'The Castle & Perfectionism',
    author: 'Franz Kafka',
    category: 'Literary Masters',
    duration: '14 min',
    difficulty: 'Advanced',
    excerpt: 'He had not yet reached the castle; its road lay before him, but at least he would not fail to find it.',
    content: 'K. pursues the castle endlessly but never arrives. Kafka brilliantly captures the perfectionist trap—endless striving toward an unreachable ideal. The castle represents authority, belonging, and completion that we pursue but may never attain. The pursuit itself becomes the prison.',
    reflection: 'What is your "castle"? How does perfectionism drive your choices? When can you stop striving?',
    color: '#1F2937',
    relatedDimensions: ['discipline', 'emotionalRegulation']
  }
];

const dilemmas = [
  {
    id: 'dilemma_001',
    title: 'The Trolley Problem',
    scenario: 'A runaway trolley is heading toward five people who will be killed if it continues on its track. You can pull a lever to redirect it to a side track, but there is one person on that track who will be killed. Do you pull the lever?',
    philosophers: [
      { name: 'Kant', view: 'Pulling the lever violates the categorical imperative—you treat one person as a means to save five. You cannot universalize sacrificing one for many.' },
      { name: 'Mill', view: 'Pull the lever. The utilitarian calculus is clear: 5 lives saved minus 1 life lost equals a net gain of 4 lives. Maximize overall happiness.' },
      { name: 'Aristotle', view: 'A virtuous person acts with practical wisdom (phronesis). Both inaction and action result in harm. The virtuous response is to act with humility about the complexity.' }
    ],
    color: '#EF4444',
    relatedDimensions: ['logic', 'integrity']
  },
  {
    id: 'dilemma_002',
    title: 'The Lie That Saves',
    scenario: 'You are hiding a refugee in your home during a persecution. Government agents arrive and ask directly: "Are you harboring anyone?" A lie would save the refugee\'s life. What do you do?',
    philosophers: [
      { name: 'Kant', view: 'Never lie, even to save a life. Lying violates the categorical imperative and treats truth-telling as conditional. Morality is absolute, not situational.' },
      { name: 'Mill', view: 'Lie without hesitation. The consequence—saving a human life—far outweighs the consequence of honesty. Utility is maximized by deception here.' },
      { name: 'Virtue Ethics', view: 'A person of courage and compassion would find the path that honors both truth and human dignity. Sometimes this means accepting tragedy; sometimes it means breaking unjust rules.' }
    ],
    color: '#F59E0B',
    relatedDimensions: ['integrity', 'empathy']
  },
  {
    id: 'dilemma_003',
    title: 'The Wealth Paradox',
    scenario: 'You\'ve built a successful business and become wealthy. Should you donate most of it to charity, knowing it could transform lives? But it could also rob your family of financial security or your children of learning resilience through struggle.',
    philosophers: [
      { name: 'Mill', view: 'Donation produces the most good. Marginal utility of wealth decreases—your additional millions help you less than they help those in poverty.' },
      { name: 'Stoicism', view: 'Wealth is indifferent. Your duty is to use it virtuously. Give what aligns with reason and virtue, not guilt or social pressure. Your children\'s character matters more than their comfort.' },
      { name: 'Aristotle', view: 'Generosity is a virtue of the mean between stinginess and profligacy. A virtuous person gives thoughtfully, in right amounts, at right times, with right motives.' }
    ],
    color: '#10B981',
    relatedDimensions: ['empathy', 'discipline']
  }
];

const challenges = [
  { id: 'ch_001', title: 'Daily Reflection', description: 'Spend 5 minutes journaling about one decision and its consequences', difficulty: 'Easy', xp: 50, relatedDimension: 'logic' },
  { id: 'ch_002', title: 'Empathy Walk', description: 'Have a genuine conversation with someone from a different background', difficulty: 'Medium', xp: 100, relatedDimension: 'empathy' },
  { id: 'ch_003', title: 'Cold Discipline', description: 'Take a cold shower or exercise without music/distraction', difficulty: 'Hard', xp: 150, relatedDimension: 'discipline' },
  { id: 'ch_004', title: 'Emotion Labeling', description: 'Identify and name 5 emotions you experience today without judgment', difficulty: 'Easy', xp: 75, relatedDimension: 'emotionalRegulation' },
  { id: 'ch_005', title: 'Integrity Check', description: 'Notice a moment where values and actions aligned; celebrate it', difficulty: 'Easy', xp: 60, relatedDimension: 'integrity' }
];

const affirmations = [
  { text: 'My mind is capable of growth. Every lesson rewires my neural pathways.', category: 'neuroplasticity' },
  { text: 'I choose growth over comfort. Discomfort is where transformation happens.', category: 'resilience' },
  { text: 'I am learning to be wise, not just smart. Wisdom comes from experience and reflection.', category: 'wisdom' },
  { text: 'My emotions are data, not destiny. I can observe them without being controlled by them.', category: 'emotionalIntelligence' },
  { text: 'I align my actions with my values. Integrity is my greatest strength.', category: 'integrity' }
];

// ============================================================
// COMPONENTS
// ============================================================

const DimensionRadar = ({ dimensions }) => {
  const radius = 60;
  const center = 80;
  
  const dimensionAngles = {
    logic: 0,
    empathy: 72,
    discipline: 144,
    emotionalRegulation: 216,
    integrity: 288
  };

  return (
    <svg width="200" height="200" viewBox="0 0 160 160" className="mx-auto">
      {[20, 40, 60].map(r => (
        <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
      ))}
      
      {Object.entries(dimensionAngles).map(([_, angle]) => {
        const rad = (angle * Math.PI) / 180;
        const x = 80 + 65 * Math.cos(rad);
        const y = 80 + 65 * Math.sin(rad);
        return <line key={angle} x1="80" y1="80" x2={x} y2={y} stroke="#4B5563" strokeWidth="0.5" />;
      })}

      <path
        d={Object.entries(dimensionAngles).map(([key, angle], i) => {
          const value = dimensions[key].value;
          const rad = (angle * Math.PI) / 180;
          const r = (value / 100) * 60;
          const x = 80 + r * Math.cos(rad);
          const y = 80 + r * Math.sin(rad);
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ') + ' Z'}
        fill="#06B6D4"
        fillOpacity="0.2"
        stroke="#06B6D4"
        strokeWidth="2"
      />

      {Object.entries(dimensionAngles).map(([key, angle]) => {
        const value = dimensions[key].value;
        const rad = (angle * Math.PI) / 180;
        const r = (value / 100) * 60;
        const x = 80 + r * Math.cos(rad);
        const y = 80 + r * Math.sin(rad);
        return (
          <circle key={key} cx={x} cy={y} r="3" fill={dimensions[key].color} stroke="white" strokeWidth="1" />
        );
      })}

      {Object.entries(dimensionAngles).map(([key, angle]) => {
        const rad = (angle * Math.PI) / 180;
        const x = 80 + 75 * Math.cos(rad);
        const y = 80 + 75 * Math.sin(rad);
        const labels = { logic: 'Logic', empathy: 'Empathy', discipline: 'Discipline', emotionalRegulation: 'ER', integrity: 'Integrity' };
        return (
          <text key={`label-${key}`} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#9CA3AF" fontWeight="600">
            {labels[key]}
          </text>
        );
      })}
    </svg>
  );
};

const SkillBar = ({ dimension, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-300">{dimension}</span>
      <span className="text-sm font-bold" style={{ color }}>{value}/100</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div
        className="h-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      />
    </div>
  </div>
);

const Dashboard = ({ user }) => {
  const xpProgress = (user.totalXP % user.xpToNextLevel) / user.xpToNextLevel * 100;

  return (
    <div className="space-y-6 pb-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-cyan-500/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">K-Score</p>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {user.kScore}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Level</p>
              <p className="text-4xl font-black text-amber-400">{user.level}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>XP Progress</span>
              <span>{user.totalXP.toLocaleString()} / {(user.totalXP + user.xpToNextLevel).toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                style={{ width: `${xpProgress}%`, boxShadow: '0 0 12px rgba(34, 211, 238, 0.6)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <p className="text-gray-400 text-sm">Streak</p>
          </div>
          <p className="text-3xl font-black text-amber-300">{user.streak}</p>
          <p className="text-xs text-gray-500">days in a row</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <p className="text-gray-400 text-sm">Total XP</p>
          </div>
          <p className="text-3xl font-black text-purple-300">{(user.totalXP / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-500">lifetime</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Cognitive Dimensions</h3>
        <DimensionRadar dimensions={user.dimensions} />
        <div className="mt-6 space-y-3">
          {Object.entries(user.dimensions).map(([key, data]) => {
            const labels = { logic: 'Logic', empathy: 'Empathy', discipline: 'Discipline', emotionalRegulation: 'Emotional Regulation', integrity: 'Integrity' };
            return <SkillBar key={key} dimension={labels[key]} value={data.value} color={data.color} />;
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg py-3 px-4 text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Dilemma
        </button>
        <button className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg py-3 px-4 text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          Lesson
        </button>
      </div>
    </div>
  );
};

const DilemmaCard = ({ dilemma, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(dilemma)}
      className="w-full text-left bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: dilemma.color }}
        />
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors">{dilemma.title}</h3>
      </div>
      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{dilemma.scenario}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Philosophers: {dilemma.philosophers.map(p => p.name).join(', ')}</span>
        <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
};

const DilemmaModal = ({ dilemma, onClose, onAnswer }) => {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto border-t border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-100">{dilemma.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-2xl">×</button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed">{dilemma.scenario}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Philosophical Perspectives</h3>
            <div className="space-y-3">
              {dilemma.philosophers.map((phil) => (
                <button
                  key={phil.name}
                  onClick={() => setSelectedPhilosopher(selectedPhilosopher === phil.name ? null : phil.name)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    selectedPhilosopher === phil.name
                      ? 'bg-slate-700 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <p className="font-bold text-cyan-400 mb-2">{phil.name}</p>
                  {selectedPhilosopher === phil.name && (
                    <p className="text-gray-300 text-sm">{phil.view}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Your Response</h3>
            <textarea
              value={userChoice || ''}
              onChange={(e) => setUserChoice(e.target.value)}
              placeholder="How would you handle this dilemma? What matters most to you?"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none h-24"
            />
          </div>

          <button
            onClick={() => {
              onAnswer(dilemma.id, userChoice);
              onClose();
            }}
            disabled={!userChoice}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Submit Response & Earn XP
          </button>
        </div>
      </div>
    </div>
  );
};

const LessonCard = ({ lesson, isLiterary, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(lesson)}
      className={`w-full text-left rounded-xl p-5 transition-all duration-300 group border ${
        isLiterary
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-amber-900/50 hover:border-amber-700/50 hover:shadow-lg hover:shadow-amber-700/10'
          : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{lesson.category}</p>
          <h3 className={`text-base font-bold leading-tight transition-colors ${
            isLiterary
              ? 'text-amber-200 group-hover:text-amber-100'
              : 'text-gray-100 group-hover:text-cyan-400'
          }`}>
            {lesson.title}
          </h3>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2 italic">"{lesson.excerpt}"</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex gap-3">
          <span>{lesson.duration}</span>
          <span>•</span>
          <span>{lesson.difficulty}</span>
        </div>
        <ChevronRight className={`w-4 h-4 transition-all ${isLiterary ? 'text-amber-600' : 'text-cyan-400'} opacity-0 group-hover:opacity-100`} />
      </div>
    </button>
  );
};

const LessonModal = ({ lesson, onClose, onComplete }) => {
  const [phase, setPhase] = useState('read');
  const [reflection, setReflection] = useState('');
  const [depth, setDepth] = useState(0);

  const depthMultipliers = [0.5, 1, 1.5, 2];
  const baseXP = 150;
  const baseKScore = 20;
  const earnedXP = Math.round(baseXP * depthMultipliers[depth]);
  const earnedKScore = Math.round(baseKScore * depthMultipliers[depth]);

  const depthLabels = ['Surface Level', 'Understood', 'Resonated', 'Mind-Shifting'];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto border-t border-slate-700">
        {phase === 'read' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-100">{lesson.title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-2xl">×</button>
            </div>
            <div className="space-y-4 mb-6">
              <p className="text-gray-400 text-sm">By <span className="text-cyan-400 font-bold">{lesson.author}</span></p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed">{lesson.content}</p>
              </div>
            </div>
            <button
              onClick={() => setPhase('reflect')}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Continue to Reflection
            </button>
          </>
        )}

        {phase === 'reflect' && (
          <>
            <h2 className="text-2xl font-black text-gray-100 mb-6">Reflect on Your Learning</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-gray-400 font-bold mb-2">Reflection Question:</p>
                <p className="text-gray-300 italic">"{lesson.reflection}"</p>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your honest reflection. There are no wrong answers."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none h-32"
              />
            </div>
            <button
              onClick={() => setPhase('rate')}
              disabled={!reflection}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-300 mb-3"
            >
              Rate Your Insight
            </button>
            <button
              onClick={() => setPhase('read')}
              className="w-full text-cyan-400 font-bold py-3 hover:text-cyan-300 transition-colors"
            >
              Back
            </button>
          </>
        )}

        {phase === 'rate' && (
          <>
            <h2 className="text-2xl font-black text-gray-100 mb-6">Rate Your Insight</h2>
            <p className="text-gray-400 mb-6 text-center">How deeply did this lesson resonate with you?</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {depthLabels.map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setDepth(idx)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 font-bold text-center ${
                    depth === idx
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                      : 'border-slate-700 bg-slate-800/30 text-gray-400 hover:border-slate-600'
                  }`}
                >
                  {label}
                  <div className="text-xs mt-2 opacity-75">+{earnedXP} XP</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6 text-center">
              <p className="text-gray-400 text-sm mb-2">You'll earn</p>
              <p className="text-2xl font-black text-cyan-400">{earnedXP} XP</p>
              <p className="text-sm text-purple-400 mt-2">+{earnedKScore} K-Score</p>
            </div>

            <button
              onClick={() => {
                onComplete(lesson.id, earnedXP, earnedKScore);
                onClose();
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Complete Lesson
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ChallengeCard = ({ challenge, onComplete }) => {
  return (
    <button
      onClick={() => onComplete(challenge)}
      className="w-full text-left bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{challenge.difficulty}</p>
          <h3 className="text-base font-bold text-gray-100 group-hover:text-purple-400 transition-colors">{challenge.title}</h3>
        </div>
        <Award className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
      </div>
      <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-purple-400 font-bold">+{challenge.xp} XP</span>
        <ChevronRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
};

const AffirmationCard = ({ affirmation, index }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/30 transition-colors group">
      <div className="flex items-start gap-3 mb-3">
        <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
        <p className="text-gray-100 leading-relaxed">{affirmation.text}</p>
      </div>
      <p className="text-xs text-gray-500 ml-8">Focus: {affirmation.category}</p>
    </div>
  );
};

export default function KScoreApp() {
  const [user, setUser] = useState(initialUserState);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDilemma, setSelectedDilemma] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleCompleteLessonModal = (lessonId, xp, kScore) => {
    setUser(prev => ({
      ...prev,
      totalXP: prev.totalXP + xp,
      kScore: prev.kScore + kScore,
      streak: prev.streak + 1
    }));
    setSelectedLesson(null);
  };

  const handleAnswerDilemma = (dilemmaId, answer) => {
    const xpGain = 120;
    const kScoreGain = 25;
    setUser(prev => ({
      ...prev,
      totalXP: prev.totalXP + xpGain,
      kScore: prev.kScore + kScoreGain,
      streak: prev.streak + 1
    }));
    setSelectedDilemma(null);
  };

  const handleCompleteChallenge = (challenge) => {
    const multiplier = { Easy: 1, Medium: 1.5, Hard: 2 }[challenge.difficulty] || 1;
    const xpGain = Math.round(challenge.xp * multiplier);
    const kScoreGain = Math.round(15 * multiplier);
    
    setUser(prev => ({
      ...prev,
      totalXP: prev.totalXP + xpGain,
      kScore: prev.kScore + kScoreGain,
      streak: prev.streak + 1
    }));
    setSelectedChallenge(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <div className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/0 z-40 backdrop-blur-sm border-b border-slate-800/50 flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            K-Score
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span>{user.kScore}</span>
          </div>
        </div>

        <div className="pt-20 px-6">
          {currentPage === 'home' && <Dashboard user={user} />}

          {currentPage === 'dilemmas' && (
            <div className="space-y-4 pb-24">
              <h2 className="text-2xl font-black mb-6">Ethical Dilemmas</h2>
              {dilemmas.map(d => (
                <DilemmaCard key={d.id} dilemma={d} onSelect={setSelectedDilemma} />
              ))}
            </div>
          )}

          {currentPage === 'lessons' && (
            <div className="space-y-8 pb-24">
              <div>
                <h2 className="text-2xl font-black mb-4">Philosophy & Psychology</h2>
                <div className="space-y-3">
                  {philosophyLessons.map(l => (
                    <LessonCard key={l.id} lesson={l} isLiterary={false} onSelect={setSelectedLesson} />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border-l-4 border-amber-700 rounded-lg p-4">
                  <h2 className="text-2xl font-black text-amber-100 mb-2">Literary Masters</h2>
                  <p className="text-sm text-amber-200/70">Deep wisdom from Dostoevsky & Kafka on human nature, identity, and transformation.</p>
                </div>
                <div className="space-y-3">
                  {literaryLessons.map(l => (
                    <LessonCard key={l.id} lesson={l} isLiterary={true} onSelect={setSelectedLesson} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPage === 'challenges' && (
            <div className="space-y-4 pb-24">
              <h2 className="text-2xl font-black mb-6">Daily Challenges</h2>
              {challenges.map(c => (
                <ChallengeCard key={c.id} challenge={c} onComplete={handleCompleteChallenge} />
              ))}
            </div>
          )}

          {currentPage === 'affirmations' && (
            <div className="space-y-4 pb-24">
              <h2 className="text-2xl font-black mb-6">Today's Affirmations</h2>
              {affirmations.map((a, i) => (
                <AffirmationCard key={i} affirmation={a} index={i} />
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-slate-950 via-slate-950 to-slate-950/80 border-t border-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-around px-4 py-3">
            {[
              { icon: Home, label: 'Home', page: 'home' },
              { icon: Lightbulb, label: 'Dilemmas', page: 'dilemmas' },
              { icon: BookOpen, label: 'Lessons', page: 'lessons' },
              { icon: Target, label: 'Challenges', page: 'challenges' },
              { icon: Heart, label: 'Affirm', page: 'affirmations' }
            ].map(({ icon: Icon, label, page }) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-bold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedDilemma && (
          <DilemmaModal
            dilemma={selectedDilemma}
            onClose={() => setSelectedDilemma(null)}
            onAnswer={handleAnswerDilemma}
          />
        )}

        {selectedLesson && (
          <LessonModal
            lesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
            onComplete={handleCompleteLessonModal}
          />
        )}
      </div>
    </div>
  );
}