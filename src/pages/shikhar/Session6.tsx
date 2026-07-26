import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea,
  CompletionCelebration, SectionDivider, KeyTakeaways, LockedOverlay
} from './components/ShikharComponents';
import './Sessions.css';

const PRINCIPLES = [
  'Radical Prioritisation — Boundaries — Visible Leadership',
  'Allyship — Leaning In',
  'Heightened Self-Awareness — Strengths, Self-Limiting Beliefs',
  'What will you be remembered for?',
  'People bet on people — have at least 5 people who will bet on you',
  'What\'s your superpower?',
  'Walk, talk & dress as a top leader',
  'Social media counts',
  'Reflection — Recalibrate — Action',
];

const SESSION_SUMMARIES = [
  { num: 1, title: 'Leadership Vision', icon: '🧭' },
  { num: 2, title: 'Leading Self', icon: '🧠' },
  { num: 3, title: 'Career Strategy', icon: '🚀' },
  { num: 4, title: 'Influence & Visibility', icon: '👥' },
  { num: 5, title: 'Communication for Impact', icon: '💬' },
  { num: 6, title: 'Networking & Future Path', icon: '🏆' },
];

const STEPS = ['Reflect', 'Action Plan', 'Commitments'];

export default function Session6() {
  const navigate = useNavigate();
  const { state, updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(6);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(6, key, value);
  }, [updateExerciseData]);

  // Data
  const sessionReflections = (data.sessionReflections as Record<number, string>) || {};
  const checkedPrinciples = (data.checkedPrinciples as number[]) || [];
  const actionPlan = (data.actionPlan as string) || '';
  const superpower = (data.superpower as string) || '';
  const remembered = (data.remembered as string) || '';
  const commitments = (data.commitments as string[]) || ['', '', '', '', ''];
  const signature = (data.signature as string) || '';
  const gratitude = (data.gratitude as string) || '';

  const togglePrinciple = (i: number) => {
    const updated = checkedPrinciples.includes(i)
      ? checkedPrinciples.filter(p => p !== i)
      : [...checkedPrinciples, i];
    save('checkedPrinciples', updated);
  };

  const updateCommitment = (i: number, value: string) => {
    const updated = [...commitments];
    updated[i] = value;
    save('commitments', updated);
  };

  const exportCareerCompass = () => {
    // Gather data from all sessions
    const allData: string[] = [];
    allData.push(`SHIKHAR PROGRAM — CAREER COMPASS`);
    allData.push(`Participant: ${state.userName}`);
    allData.push(`Date: ${new Date().toLocaleDateString()}`);
    allData.push(`${'='.repeat(50)}`);

    for (let i = 1; i <= 6; i++) {
      const sd = state.sessions[i];
      allData.push(`\n--- Session ${i}: ${SESSION_SUMMARIES[i-1].title} ---`);
      allData.push(`Status: ${sd.completed ? 'Completed' : 'In Progress'}`);
      if (sd.exerciseData) {
        const entries = Object.entries(sd.exerciseData);
        entries.forEach(([key, value]) => {
          if (typeof value === 'string' && value.trim()) {
            allData.push(`${key}: ${value}`);
          } else if (Array.isArray(value)) {
            allData.push(`${key}: ${value.filter(v => typeof v === 'string' ? v.trim() : v).join(', ')}`);
          }
        });
      }
    }

    allData.push(`\n${'='.repeat(50)}`);
    allData.push(`\nCommitments:`);
    commitments.filter(c => c.trim()).forEach((c, i) => allData.push(`${i+1}. ${c}`));
    if (signature) allData.push(`\nSigned: ${signature}`);

    const blob = new Blob([allData.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shikhar_Career_Compass_${state.userName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleComplete = () => {
    completeSession(6);
    // Big celebration!
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#556B2F', '#DAA520', '#F0C75E', '#6B8E23', 'var(--color-bg)'];
    
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    
    setShowCelebration(true);
  };

  const progress = Math.min(
    Math.round(
      ((Object.values(sessionReflections).filter(r => (r as string).trim()).length >= 3 ? 25 : 0) +
        (checkedPrinciples.length >= 5 ? 15 : 0) +
        (actionPlan ? 20 : 0) +
        (commitments.filter(c => c.trim()).length >= 3 ? 25 : 0) +
        (signature ? 15 : 0))
    ),
    100
  );

  if (!isSessionUnlocked(6)) return <LockedOverlay sessionNumber={6} />;

  return (
    <SessionLayout
      sessionNumber={6}
      title="Networking & Future Path"
      subtitle="Reflect on your journey, build your action plan, and celebrate your growth."
      icon={<Award size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <KeyTakeaways items={[
        'Radical prioritisation, boundaries, and visible leadership are essential',
        'People bet on people — have at least 5 who will bet on you',
        'Know your superpower and what you want to be remembered for',
        'Walk, talk & dress as the leader you aspire to be',
        'LIFE LONG: Reflection → Recalibrate → Action'
      ]} />

      <SectionDivider title="Interactive Exercise: Growth Reflector" />
      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Journey Reflection */}
      {step === 0 && (
        <ExerciseCard
          title="Program Reflection Timeline"
          description="Look back at each session and capture your key takeaway"
          icon={<span>🗓️</span>}
        >
          <div className="journey-timeline">
            {SESSION_SUMMARIES.map((session, i) => (
              <motion.div
                key={session.num}
                className={`timeline-item ${state.sessions[session.num]?.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-dot">
                  <span className="timeline-icon">{session.icon}</span>
                </div>
                <div className="timeline-content">
                  <h4>Session {session.num}: {session.title}</h4>
                  <span className={`timeline-status ${state.sessions[session.num]?.completed ? 'done' : 'pending'}`}>
                    {state.sessions[session.num]?.completed ? '✓ Completed' : 'In Progress'}
                  </span>
                  <textarea
                    className="shikhar-textarea"
                    value={(sessionReflections[session.num] as string) || ''}
                    onChange={e => save('sessionReflections', { ...sessionReflections, [session.num]: e.target.value })}
                    placeholder={`What was your biggest takeaway from Session ${session.num}?`}
                    rows={2}
                    style={{ marginTop: '0.5rem' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="principles-checklist">
            <h4 style={{ color: 'var(--shikhar-olive-dark)', marginBottom: '1rem' }}>
              📋 Key Principles Checklist — "The Silly Things... Not So Silly"
            </h4>
            {PRINCIPLES.map((principle, i) => (
              <label key={i} className={`principle-item ${checkedPrinciples.includes(i) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checkedPrinciples.includes(i)}
                  onChange={() => togglePrinciple(i)}
                />
                <span className="checkmark" />
                <span className="principle-text">{principle}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1.5rem' }}>
            <InteractiveTextArea
              label="What's your superpower?"
              value={superpower}
              onChange={v => save('superpower', v)}
              placeholder="Identify your unique superpower..."
              rows={2}
            />
            <InteractiveTextArea
              label="What will you be remembered for?"
              value={remembered}
              onChange={v => save('remembered', v)}
              placeholder="Your legacy statement..."
              rows={2}
            />
          </div>

          <div className="step-nav">
            <div />
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>Action Plan →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: Action Plan */}
      {step === 1 && (
        <ExerciseCard
          title="Comprehensive Action Plan"
          description="Combine insights from all sessions into a unified action plan"
          icon={<span>📝</span>}
        >
          <InteractiveTextArea
            label="Your Integrated Action Plan"
            value={actionPlan}
            onChange={v => save('actionPlan', v)}
            placeholder="Bring together your vision, values, career compass, stakeholder strategy, communication plan, and growth goals into one comprehensive action plan..."
            rows={8}
            maxLength={3000}
          />

          <InteractiveTextArea
            label="Gratitude & Acknowledgments"
            value={gratitude}
            onChange={v => save('gratitude', v)}
            placeholder="Who helped you during this program? What are you grateful for?"
            rows={3}
          />

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button className="shikhar-btn secondary" onClick={exportCareerCompass}>
              <Download size={16} /> Export Career Compass
            </button>
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Reflect</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>Commitments →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: Commitments */}
      {step === 2 && (
        <ExerciseCard
          title="Commitment Board"
          description="Make 5 commitments to yourself for the future"
          icon={<span>✍️</span>}
        >
          <div className="commitment-board">
            {commitments.map((c, i) => (
              <motion.div
                key={i}
                className="commitment-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="commitment-num">{i + 1}</div>
                <input
                  type="text"
                  className="shikhar-input"
                  value={c}
                  onChange={e => updateCommitment(i, e.target.value)}
                  placeholder={`Commitment #${i + 1}...`}
                />
              </motion.div>
            ))}
          </div>

          <div className="signature-section">
            <h4 style={{ color: 'var(--shikhar-olive-dark)', marginBottom: '0.5rem' }}>Your Digital Signature</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginBottom: '1rem' }}>
              Sign below to seal your commitment to your Shikhar journey:
            </p>
            <input
              type="text"
              className="signature-input"
              value={signature}
              onChange={e => save('signature', e.target.value)}
              placeholder="Type your name as signature..."
            />
            {signature && (
              <motion.p
                className="signature-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {signature}
              </motion.p>
            )}
          </div>

          {/* Celebration Wall */}
          <div className="celebration-wall">
            <h4>🎉 Celebration Wall</h4>
            <div className="celebration-cards">
              {[
                { emoji: '🏔️', text: 'You reached the Shikhar summit!' },
                { emoji: '🌟', text: '6 sessions of transformation' },
                { emoji: '💪', text: 'New beliefs, new you' },
                { emoji: '🧭', text: 'Career compass set' },
                { emoji: '🤝', text: 'Village assembled' },
                { emoji: '🔥', text: 'Ready to lead with impact' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="celebration-mini-card"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                >
                  <span className="cell-emoji">{card.emoji}</span>
                  <span>{card.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {sessionData.completed ? (
              <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>
                Return to Dashboard
              </button>
            ) : (
              <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>
                🏔️ Complete Shikhar Program
              </button>
            )}
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← Action Plan</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration show={showCelebration} sessionNumber={6} onContinue={() => navigate('/shikhar')} />
    </SessionLayout>
  );
}
