import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea,
  CompletionCelebration, SectionDivider, KeyTakeaways, LockedOverlay
} from './components/ShikharComponents';
import './Sessions.css';

const BELIEF_PAIRS = [
  { blocker: 'I need to be involved in everything', productive: 'I can do anything, but I can\'t do everything' },
  { blocker: 'I need it done now', productive: 'I need to focus on what truly matters' },
  { blocker: 'I know I\'m right', productive: 'My role is to help others find solutions, not to always give them answers' },
  { blocker: 'I can\'t make a mistake', productive: 'My focus is excellence, not avoiding failure' },
  { blocker: 'I can\'t say no', productive: 'I can say no to some things' },
  { blocker: 'I don\'t belong here', productive: 'I belong wherever I am' },
];

const REFLECTION_PROMPTS = [
  'What is something that felt scary before you did it? How did it feel after you began? What lesson did you learn?',
  'What is that one belief that without fail continues to motivate you?',
  'List 5 ways that you are different from others. Think about characteristics, thoughts, beliefs, values and unique perspectives.',
  'Reflect on 3 occasions where you persevered through something you didn\'t think you had the strength for. What traits, strengths, support systems did you leverage?',
  'Write 5 thoughts that routinely bring you to a place of self-doubt. Now replace each with a motivating thought filled with hope.',
  'What is something that feels out of reach? Why? What can you do to make it possible?',
];

const STEPS = ['Beliefs', '5 Whys', 'Reframe', 'Reflect'];

export default function Session2() {
  const navigate = useNavigate();
  const { updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(2);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(2, key, value);
  }, [updateExerciseData]);

  // Data
  const myBeliefs = (data.myBeliefs as string[]) || ['', '', ''];
  const myReframes = (data.myReframes as string[]) || ['', '', ''];
  const whys = (data.whys as Record<string, string[]>) || {};
  const abcEvent = (data.abcEvent as string) || '';
  const abcBelief = (data.abcBelief as string) || '';
  const abcConsequence = (data.abcConsequence as string) || '';
  const reflections = (data.reflections as Record<number, string>) || {};

  const toggleFlip = (i: number) => {
    const s = new Set(flippedCards);
    if (s.has(i)) s.delete(i); else s.add(i);
    setFlippedCards(s);
  };

  const updateBelief = (i: number, value: string) => {
    const updated = [...myBeliefs];
    updated[i] = value;
    save('myBeliefs', updated);
  };

  const addBelief = () => {
    const updated = [...myBeliefs, ''];
    save('myBeliefs', updated);
  };

  const updateReframe = (i: number, value: string) => {
    const updated = [...myReframes];
    updated[i] = value;
    save('myReframes', updated);
  };

  const updateWhy = (beliefIndex: number, whyIndex: number, value: string) => {
    const key = `belief_${beliefIndex}`;
    const current = whys[key] || ['', '', '', '', ''];
    const updated = [...current];
    updated[whyIndex] = value;
    save('whys', { ...whys, [key]: updated });
  };

  const updateReflection = (promptIndex: number, value: string) => {
    save('reflections', { ...reflections, [promptIndex]: value });
  };

  const handleComplete = () => {
    completeSession(2);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#556B2F', '#DAA520', '#F0C75E', '#6B8E23'],
    });
    setShowCelebration(true);
  };

  const progress = Math.min(
    Math.round(
      ((myBeliefs.filter(b => b.trim()).length >= 2 ? 25 : 0) +
        (myReframes.filter(r => r.trim()).length >= 2 ? 25 : 0) +
        (abcEvent ? 15 : 0) +
        (Object.values(reflections).filter(r => (r as string).trim()).length >= 2 ? 35 : 0))
    ),
    100
  );

  if (!isSessionUnlocked(2)) return <LockedOverlay sessionNumber={2} />;

  return (
    <SessionLayout
      sessionNumber={2}
      title="Leading Self"
      subtitle="Identify your inner strengths and limiting beliefs. Reframe your inner narratives to unlock your potential."
      icon={<Brain size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <KeyTakeaways items={[
        'Self-limiting beliefs are false, self-imposed mental barriers rooted in past experiences or fear',
        'Use the 5 Whys technique to trace negative thoughts to their root cause',
        'The ABC Framework: Activating Event → Beliefs → Consequences',
        'Reframing: Consciously replace negative thoughts with empowering positive statements',
        'Transform hidden blockers into productive beliefs'
      ]} />

      <SectionDivider title="Interactive Exercise: Belief Transformer" />

      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Belief Cards */}
      {step === 0 && (
        <ExerciseCard
          title="From Blockers to Productive Beliefs"
          description="Tap cards to flip between limiting beliefs and their empowering alternatives"
          icon={<span>🔄</span>}
        >
          <div className="belief-cards-grid">
            {BELIEF_PAIRS.map((pair, i) => (
              <motion.div
                key={i}
                className={`belief-flip-card ${flippedCards.has(i) ? 'flipped' : ''}`}
                onClick={() => toggleFlip(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="belief-card-inner">
                  <div className="belief-card-front">
                    <span className="belief-label">❌ Limiting Belief</span>
                    <p>{pair.blocker}</p>
                    <span className="flip-hint">Tap to reframe →</span>
                  </div>
                  <div className="belief-card-back">
                    <span className="belief-label">✅ Empowering Belief</span>
                    <p>{pair.productive}</p>
                    <span className="flip-hint">Tap to see blocker →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="step-nav">
            <div />
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>5 Whys →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: 5 Whys */}
      {step === 1 && (
        <ExerciseCard
          title="The 5 Whys Deep Dive"
          description="Write your own limiting beliefs and drill into their root causes"
          icon={<span>🔍</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            Write your self-limiting beliefs below, then ask "Why?" five times to find the root cause. You can add as many as you need.
          </p>

          {myBeliefs.map((belief, bi) => (
            <div key={bi} className="five-whys-block">
              <input
                type="text"
                className="shikhar-input"
                value={belief}
                onChange={e => updateBelief(bi, e.target.value)}
                placeholder={`Self-limiting belief #${bi + 1}...`}
                style={{ fontWeight: 600, marginBottom: '0.75rem' }}
              />
              {belief.trim() && (
                <div className="whys-chain">
                  {[0, 1, 2, 3, 4].map(wi => (
                    <div key={wi} className="why-item">
                      <div className="why-number">Why {wi + 1}?</div>
                      <input
                        type="text"
                        className="shikhar-input"
                        value={(whys[`belief_${bi}`] || [])[wi] || ''}
                        onChange={e => updateWhy(bi, wi, e.target.value)}
                        placeholder={wi === 0 ? `Why do you believe "${belief.slice(0, 30)}..."?` : 'Why?'}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {myBeliefs.length < 10 && (
            <button 
              onClick={addBelief}
              className="shikhar-btn secondary"
              style={{ marginTop: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>+</span> Add another belief
            </button>
          )}

          <div className="abc-framework">
            <h4 style={{ color: 'var(--shikhar-olive-dark)', marginBottom: '1rem' }}>📐 ABC Framework</h4>
            <div className="abc-grid">
              <div className="abc-item">
                <label className="shikhar-label">A — Activating Event</label>
                <textarea
                  className="shikhar-textarea"
                  value={abcEvent}
                  onChange={e => save('abcEvent', e.target.value)}
                  placeholder="A specific situation that triggered a negative reaction..."
                  rows={2}
                />
              </div>
              <div className="abc-arrow">→</div>
              <div className="abc-item">
                <label className="shikhar-label">B — Beliefs</label>
                <textarea
                  className="shikhar-textarea"
                  value={abcBelief}
                  onChange={e => save('abcBelief', e.target.value)}
                  placeholder="The self-talk and thoughts you had about that event..."
                  rows={2}
                />
              </div>
              <div className="abc-arrow">→</div>
              <div className="abc-item">
                <label className="shikhar-label">C — Consequences</label>
                <textarea
                  className="shikhar-textarea"
                  value={abcConsequence}
                  onChange={e => save('abcConsequence', e.target.value)}
                  placeholder="The emotions and behaviors that resulted..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Beliefs</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>Reframe →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: Reframing Board */}
      {step === 2 && (
        <ExerciseCard
          title="Reframing Board"
          description="Transform your limiting beliefs into empowering ones"
          icon={<span>✨</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            For each of your beliefs from the previous step, write a positive, empowering reframe.
          </p>

          <div className="reframe-board">
            {myBeliefs.map((belief, i) => (
              belief.trim() && (
                <AnimatePresence key={i}>
                  <motion.div
                    className="reframe-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="reframe-from">
                      <span className="reframe-label">❌ Blocker</span>
                      <p>{belief}</p>
                    </div>
                    <div className="reframe-arrow">→</div>
                    <div className="reframe-to">
                      <span className="reframe-label">✅ Transformed</span>
                      <input
                        type="text"
                        className="shikhar-input"
                        value={myReframes[i] || ''}
                        onChange={e => updateReframe(i, e.target.value)}
                        placeholder="Write your empowering reframe..."
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )
            ))}
            {myBeliefs.filter(b => b.trim()).length === 0 && (
              <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
                Go back to the "5 Whys" step and write your beliefs first.
              </p>
            )}
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← 5 Whys</button>
            <button className="shikhar-btn primary" onClick={() => setStep(3)}>Reflect →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 3: Reflection */}
      {step === 3 && (
        <ExerciseCard
          title="Self-Reflection Journal"
          description="Choose any 3 or more prompts and reflect deeply"
          icon={<span>📝</span>}
        >
          {REFLECTION_PROMPTS.map((prompt, i) => (
            <div key={i} className="reflection-prompt-block">
              <p className="prompt-text">{prompt}</p>
              <InteractiveTextArea
                value={(reflections[i] as string) || ''}
                onChange={v => updateReflection(i, v)}
                placeholder="Take your time to reflect..."
                rows={3}
              />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {sessionData.completed ? (
                <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  Return to Dashboard
                </button>
              ) : (
                <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  ✨ Complete Session 2
                </button>
              )}
            </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(2)}>← Reframe</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration
        show={showCelebration}
        sessionNumber={2}
        onContinue={() => navigate('/shikhar')}
      />
    </SessionLayout>
  );
}
