import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea, QuadrantGrid,
  CompletionCelebration, SectionDivider, KeyTakeaways, LockedOverlay
} from './components/ShikharComponents';
import './Sessions.css';

const QUIZ_QUESTIONS = [
  { q: 'I speak clearly and concisely in meetings', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I maintain calm composure under pressure', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I actively listen before responding', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I can command attention when presenting ideas', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I tell compelling stories to make points', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I adapt my communication style to the audience', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I project confidence even when uncertain', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
  { q: 'I give and receive feedback gracefully', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
];

const STEPS = ['Presence', 'Plan', 'Quiz'];

export default function Session5() {
  const navigate = useNavigate();
  const { updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(5);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(5, key, value);
  }, [updateExerciseData]);

  // Data
  const presenceQuadrant = (data.presenceQuadrant as string) || '';
  const presenceReflection = (data.presenceReflection as string) || '';
  const planVision = (data.planVision as string) || '';
  const planGoals = (data.planGoals as string) || '';
  const planMilestones = (data.planMilestones as string) || '';
  const planStrengths = (data.planStrengths as string) || '';
  const planBeliefs = (data.planBeliefs as string) || '';
  const planSkills = (data.planSkills as string) || '';
  const planStakeholders = (data.planStakeholders as string) || '';
  const planSuccess = (data.planSuccess as string) || '';
  const planAccountability = (data.planAccountability as string) || '';
  const quizAnswers = (data.quizAnswers as Record<number, number>) || {};

  const quadrantOptions = [
    { id: 'calm', label: 'Calm Reserved Presence', emoji: '🧘' },
    { id: 'empowered', label: 'Empowered Impactful Presence', emoji: '🔥' },
    { id: 'compliant', label: 'Compliant Limited Presence', emoji: '📎' },
    { id: 'performative', label: 'Performative Unrooted Presence', emoji: '🎭' },
  ];

  const quizScore = Object.values(quizAnswers).reduce((sum, v) => sum + (v as number), 0);
  const maxScore = QUIZ_QUESTIONS.length * 3;
  const scorePercent = maxScore > 0 ? Math.round((quizScore / maxScore) * 100) : 0;

  const handleComplete = () => {
    completeSession(5);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#556B2F', '#DAA520', '#F0C75E'] });
    setShowCelebration(true);
  };

  const progress = Math.min(
    Math.round(
      ((presenceQuadrant ? 15 : 0) + (planVision ? 15 : 0) + (planGoals ? 15 : 0) +
        (planMilestones ? 10 : 0) + (planStakeholders ? 10 : 0) +
        (Object.keys(quizAnswers).length >= 5 ? 20 : 0) + (planSuccess ? 15 : 0))
    ),
    100
  );

  if (!isSessionUnlocked(5)) return <LockedOverlay sessionNumber={5} />;

  return (
    <SessionLayout
      sessionNumber={5}
      title="Communication for Impact"
      subtitle="Build executive presence through communication. Develop your inner and outer game."
      icon={<MessageCircle size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <KeyTakeaways items={[
        'Leaders with strong presence inspire, energize, build trust, and influence',
        'Impactful presence comes from inner poise - not just outer performance',
        'Key skills: Public Speaking, Storytelling, Managing Public Presence',
        'Communicate with confidence, clarity, authenticity, energy, empathy, courage, and poise',
        'Executive presence is the intersection of strong inner game + strong outer game'
      ]} />

      <SectionDivider title="Interactive Exercise: Presence Builder" />
      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Presence Matrix */}
      {step === 0 && (
        <ExerciseCard
          title="Executive Presence Matrix"
          description="Where do you currently sit on the presence matrix? Be honest."
          icon={<span>📐</span>}
        >
          <QuadrantGrid
            yLabel="Inner Game"
            xLabel="Outer Game"
            topLeft={{
              label: '🧘 Calm Reserved',
              content: (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    Strong inner game, weak outer game
                  </p>
                  <button
                    className={`quadrant-select-btn ${presenceQuadrant === 'calm' ? 'active' : ''}`}
                    onClick={() => save('presenceQuadrant', 'calm')}
                  >
                    {presenceQuadrant === 'calm' ? '✓ This is me' : 'Select'}
                  </button>
                </div>
              ),
            }}
            topRight={{
              label: '🔥 Empowered Impactful',
              content: (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    Strong inner game, strong outer game - THE GOAL
                  </p>
                  <button
                    className={`quadrant-select-btn ${presenceQuadrant === 'empowered' ? 'active' : ''}`}
                    onClick={() => save('presenceQuadrant', 'empowered')}
                  >
                    {presenceQuadrant === 'empowered' ? '✓ This is me' : 'Select'}
                  </button>
                </div>
              ),
            }}
            bottomLeft={{
              label: '📎 Compliant Limited',
              content: (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    Weak inner game, weak outer game
                  </p>
                  <button
                    className={`quadrant-select-btn ${presenceQuadrant === 'compliant' ? 'active' : ''}`}
                    onClick={() => save('presenceQuadrant', 'compliant')}
                  >
                    {presenceQuadrant === 'compliant' ? '✓ This is me' : 'Select'}
                  </button>
                </div>
              ),
            }}
            bottomRight={{
              label: '🎭 Performative Unrooted',
              content: (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    Weak inner game, strong outer game
                  </p>
                  <button
                    className={`quadrant-select-btn ${presenceQuadrant === 'performative' ? 'active' : ''}`}
                    onClick={() => save('presenceQuadrant', 'performative')}
                  >
                    {presenceQuadrant === 'performative' ? '✓ This is me' : 'Select'}
                  </button>
                </div>
              ),
            }}
          />

          {presenceQuadrant && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem' }}>
              <div className="presence-result">
                <span className="presence-emoji">{quadrantOptions.find(q => q.id === presenceQuadrant)?.emoji}</span>
                <span>You identified as: <strong>{quadrantOptions.find(q => q.id === presenceQuadrant)?.label}</strong></span>
              </div>
              <InteractiveTextArea
                label="Reflection: Why did you choose this quadrant?"
                value={presenceReflection}
                onChange={v => save('presenceReflection', v)}
                placeholder="What makes you feel you're in this quadrant? What would it take to move to Empowered Impactful?"
                rows={3}
              />
            </motion.div>
          )}

          <div className="step-nav">
            <div />
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>Plan →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: 6-12 Month Plan */}
      {step === 1 && (
        <ExerciseCard
          title="Your 6-12 Month Plan"
          description="Refine and create a comprehensive plan for the next 6-12 months"
          icon={<span>📋</span>}
        >
          <InteractiveTextArea
            label="Vision & Goals"
            value={planVision}
            onChange={v => save('planVision', v)}
            placeholder="Refine your vision and core goals for the next 6-12 months..."
            rows={3}
          />

          <InteractiveTextArea
            label="Clear Measurable Milestones"
            value={planMilestones}
            onChange={v => save('planMilestones', v)}
            placeholder="What specific, achievable milestones will mark your progress?"
            rows={3}
          />

          <InteractiveTextArea
            label="Strengths to Leverage"
            value={planStrengths}
            onChange={v => save('planStrengths', v)}
            placeholder="What strengths will you leverage to achieve your goals?"
            rows={2}
          />

          <InteractiveTextArea
            label="Beliefs to Overcome"
            value={planBeliefs}
            onChange={v => save('planBeliefs', v)}
            placeholder="What limiting beliefs do you still need to overcome?"
            rows={2}
          />

          <InteractiveTextArea
            label="Skills Gaps to Fulfill"
            value={planSkills}
            onChange={v => save('planSkills', v)}
            placeholder="What specific skills will you develop?"
            rows={2}
          />

          <InteractiveTextArea
            label="Stakeholder Engagement Plan"
            value={planStakeholders}
            onChange={v => save('planStakeholders', v)}
            placeholder="How will you engage with your key stakeholders?"
            rows={3}
          />

          <InteractiveTextArea
            label="What Counts as Success?"
            value={planSuccess}
            onChange={v => save('planSuccess', v)}
            placeholder="Define what success looks like at the 6 and 12 month marks..."
            rows={3}
          />

          <InteractiveTextArea
            label="How Will You Stay True to Your Plan?"
            value={planAccountability}
            onChange={v => save('planAccountability', v)}
            placeholder="What accountability systems will you put in place?"
            rows={2}
          />

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Presence</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>Quiz →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: Communication Quiz */}
      {step === 2 && (
        <ExerciseCard
          title="Communication Style Self-Assessment"
          description="Rate yourself honestly on these communication competencies"
          icon={<span>📊</span>}
        >
          <div className="quiz-container">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <motion.div
                key={qi}
                className="quiz-question"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: qi * 0.05 }}
              >
                <p className="quiz-q-text">{qi + 1}. {q.q}</p>
                <div className="quiz-options">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={`quiz-option ${quizAnswers[qi] === oi ? 'selected' : ''}`}
                      onClick={() => save('quizAnswers', { ...quizAnswers, [qi]: oi })}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {Object.keys(quizAnswers).length >= QUIZ_QUESTIONS.length && (
            <motion.div className="quiz-results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="quiz-score-circle">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border)" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={scorePercent >= 70 ? 'var(--shikhar-olive)' : scorePercent >= 40 ? 'var(--shikhar-gold)' : '#e74c3c'}
                    strokeWidth="6"
                    strokeDasharray={`${scorePercent * 2.83} ${283 - scorePercent * 2.83}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="50" textAnchor="middle" dy="0.35em" fontSize="18" fontWeight="700" fill="var(--shikhar-olive-dark)">
                    {quizScore}/{maxScore}
                  </text>
                </svg>
              </div>
              <p className="quiz-verdict">
                {scorePercent >= 70 ? '🌟 Strong communicator! Focus on refinement.' :
                  scorePercent >= 40 ? '📈 Good foundation. Room for growth in specific areas.' :
                    '💪 Great self-awareness. This program will help you grow significantly.'}
              </p>
            </motion.div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {sessionData.completed ? (
                <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  Return to Dashboard
                </button>
              ) : (
                <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  ✨ Complete Session 5
                </button>
              )}
            </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← Plan</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration show={showCelebration} sessionNumber={5} onContinue={() => navigate('/shikhar')} />
    </SessionLayout>
  );
}
