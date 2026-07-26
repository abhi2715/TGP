import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea,
  CompletionCelebration, SectionDivider, KeyTakeaways, LockedOverlay
} from './components/ShikharComponents';
import './Sessions.css';

const DECISION_FRAMEWORKS = [
  { name: 'One-Way vs. Two-Way Door', desc: 'Reversible decisions should be made quickly. Irreversible ones deserve deep thought.', icon: '🚪' },
  { name: 'Regret Minimization', desc: 'Choose the path that minimizes future regret when you look back at 80.', icon: '⏳' },
  { name: 'Asymmetric Payoff Analysis', desc: 'Take risks with limited downside and huge upside potential.', icon: '📈' },
  { name: 'Growth vs. Security Pendulum', desc: 'Balance periods of growth with periods of stability intentionally.', icon: '⚖️' },
  { name: 'Small Bets Approach', desc: 'Test big ideas with small, low-risk experiments before going all in.', icon: '🎯' },
];

const STEPS = ['Compass', 'Decisions', 'SMART Goals', 'Skill Gaps'];

export default function Session3() {
  const navigate = useNavigate();
  const { updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(3);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(3, key, value);
  }, [updateExerciseData]);

  // Data
  const specialization = (data.specialization as string) || '';
  const differentiation = (data.differentiation as string) || '';
  const segmentation = (data.segmentation as string) || '';
  const alignment = (data.alignment as string) || '';
  const selectedFrameworks = (data.selectedFrameworks as string[]) || [];
  const frameworkExamples = (data.frameworkExamples as Record<string, string>) || {};
  const shortTermGoals = (data.shortTermGoals as Array<{specific: string; measurable: string; achievable: string; relevant: string; timeBound: string}>) || [
    { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' }
  ];
  const medTermGoals = (data.medTermGoals as Array<{specific: string; measurable: string; achievable: string; relevant: string; timeBound: string}>) || [
    { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' }
  ];
  const currentSkills = (data.currentSkills as string) || '';
  const requiredSkills = (data.requiredSkills as string) || '';
  const gapPlan = (data.gapPlan as string) || '';

  const toggleFramework = (name: string) => {
    const updated = selectedFrameworks.includes(name)
      ? selectedFrameworks.filter(f => f !== name)
      : [...selectedFrameworks, name];
    save('selectedFrameworks', updated);
  };

  const updateGoal = (type: 'shortTermGoals' | 'medTermGoals', index: number, field: string, value: string) => {
    const goals = type === 'shortTermGoals' ? [...shortTermGoals] : [...medTermGoals];
    goals[index] = { ...goals[index], [field]: value };
    save(type, goals);
  };

  const addGoal = (type: 'shortTermGoals' | 'medTermGoals') => {
    const goals = type === 'shortTermGoals' ? [...shortTermGoals] : [...medTermGoals];
    goals.push({ specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' });
    save(type, goals);
  };

  const handleComplete = () => {
    completeSession(3);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#556B2F', '#DAA520', '#F0C75E'] });
    setShowCelebration(true);
  };

  const progress = Math.min(
    Math.round(
      ((specialization ? 15 : 0) + (differentiation ? 15 : 0) + (segmentation ? 10 : 0) +
        (alignment ? 10 : 0) + (selectedFrameworks.length > 0 ? 15 : 0) +
        (shortTermGoals[0]?.specific ? 15 : 0) + (currentSkills ? 10 : 0) + (gapPlan ? 10 : 0))
    ),
    100
  );

  if (!isSessionUnlocked(3)) return <LockedOverlay sessionNumber={3} />;

  return (
    <SessionLayout
      sessionNumber={3}
      title="Career Strategy"
      subtitle="Map your career trajectory, set SMART goals, and build your personal brand strategy."
      icon={<Rocket size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <KeyTakeaways items={[
        'Focus on strategic growth through your Personal Brand',
        '3-Dimensional Leadership: Lead self, influence others, drive innovation',
        'Focus on building horizontal visibility and connections, not just upward movement',
        'Use decision-making frameworks to navigate career crossroads',
        'Create SMART goals — Specific, Measurable, Achievable, Relevant, Time-bound'
      ]} />

      <SectionDivider title="Interactive Exercise: Career Compass" />
      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Career Compass */}
      {step === 0 && (
        <ExerciseCard
          title="Career Compass Quadrants"
          description="Define your strategic positioning across four key areas"
          icon={<span>🧭</span>}
        >
          <div className="compass-grid">
            <motion.div className="compass-quadrant spec" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="compass-q-header">
                <span className="compass-q-icon">🎯</span>
                <h4>Specialization</h4>
              </div>
              <p className="compass-q-desc">Pick an area where you can shine</p>
              <InteractiveTextArea
                value={specialization}
                onChange={v => save('specialization', v)}
                placeholder="What is your unique area of expertise? Where can you become the go-to person?"
                rows={3}
              />
            </motion.div>

            <motion.div className="compass-quadrant diff" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="compass-q-header">
                <span className="compass-q-icon">⭐</span>
                <h4>Differentiation</h4>
              </div>
              <p className="compass-q-desc">Distinguish yourself through exceptional work</p>
              <InteractiveTextArea
                value={differentiation}
                onChange={v => save('differentiation', v)}
                placeholder="What makes your approach unique? How do you stand out from peers?"
                rows={3}
              />
            </motion.div>

            <motion.div className="compass-quadrant seg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <div className="compass-q-header">
                <span className="compass-q-icon">👥</span>
                <h4>Segmentation</h4>
              </div>
              <p className="compass-q-desc">Identify & delight your key stakeholders</p>
              <InteractiveTextArea
                value={segmentation}
                onChange={v => save('segmentation', v)}
                placeholder="Who are the key people you need to serve and impress? What do they need most?"
                rows={3}
              />
            </motion.div>

            <motion.div className="compass-quadrant align" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
              <div className="compass-q-header">
                <span className="compass-q-icon">🧭</span>
                <h4>Alignment</h4>
              </div>
              <p className="compass-q-desc">Align with your personal purpose & values</p>
              <InteractiveTextArea
                value={alignment}
                onChange={v => save('alignment', v)}
                placeholder="How does your career path align with your deeper purpose and values?"
                rows={3}
              />
            </motion.div>
          </div>

          <div className="step-nav">
            <div />
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>Decisions →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: Decision Frameworks */}
      {step === 1 && (
        <ExerciseCard
          title="Decision-Making Frameworks"
          description="Select the frameworks that resonate with you and provide personal examples"
          icon={<span>🧠</span>}
        >
          <div className="frameworks-list">
            {DECISION_FRAMEWORKS.map((fw, i) => (
              <motion.div
                key={fw.name}
                className={`framework-card ${selectedFrameworks.includes(fw.name) ? 'selected' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toggleFramework(fw.name)}
              >
                <div className="framework-header">
                  <span className="framework-icon">{fw.icon}</span>
                  <div>
                    <h4>{fw.name}</h4>
                    <p>{fw.desc}</p>
                  </div>
                  <div className={`framework-check ${selectedFrameworks.includes(fw.name) ? 'checked' : ''}`}>
                    {selectedFrameworks.includes(fw.name) ? '✓' : ''}
                  </div>
                </div>
                {selectedFrameworks.includes(fw.name) && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                    <textarea
                      className="shikhar-textarea"
                      value={frameworkExamples[fw.name] || ''}
                      onChange={e => save('frameworkExamples', { ...frameworkExamples, [fw.name]: e.target.value })}
                      placeholder={`Share a personal example of using the "${fw.name}" framework...`}
                      rows={2}
                      onClick={e => e.stopPropagation()}
                      style={{ marginTop: '0.75rem' }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Compass</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>SMART Goals →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: SMART Goals */}
      {step === 2 && (
        <ExerciseCard
          title="SMART Goals Builder"
          description="Create structured goals for short-term (<1yr) and medium-term (1-3yrs)"
          icon={<span>🎯</span>}
        >
          <h4 style={{ color: 'var(--shikhar-olive-dark)', marginBottom: '1rem' }}>📅 Short-Term Goals (&lt;1 Year)</h4>
          {shortTermGoals.map((goal, i) => (
            <div key={i} className="smart-goal-card">
              <div className="smart-goal-num">Goal {i + 1}</div>
              <div className="smart-fields">
                {(['specific', 'measurable', 'achievable', 'relevant', 'timeBound'] as const).map(field => (
                  <div key={field} className="smart-field">
                    <label className="shikhar-label">{field.charAt(0).toUpperCase() + field.slice(1).replace('Bound', '-Bound')}</label>
                    <input
                      type="text"
                      className="shikhar-input"
                      value={goal[field]}
                      onChange={e => updateGoal('shortTermGoals', i, field, e.target.value)}
                      placeholder={field === 'specific' ? 'What exactly will you achieve?' : field === 'measurable' ? 'How will you measure success?' : field === 'achievable' ? 'Is it realistic given resources?' : field === 'relevant' ? 'How does it align with vision?' : 'By when?'}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {shortTermGoals.length < 3 && (
            <button className="shikhar-btn secondary sm" onClick={() => addGoal('shortTermGoals')}>+ Add Short-Term Goal</button>
          )}

          <h4 style={{ color: 'var(--shikhar-olive-dark)', margin: '2rem 0 1rem' }}>📆 Medium-Term Goals (1-3 Years)</h4>
          {medTermGoals.map((goal, i) => (
            <div key={i} className="smart-goal-card">
              <div className="smart-goal-num">Goal {i + 1}</div>
              <div className="smart-fields">
                {(['specific', 'measurable', 'achievable', 'relevant', 'timeBound'] as const).map(field => (
                  <div key={field} className="smart-field">
                    <label className="shikhar-label">{field.charAt(0).toUpperCase() + field.slice(1).replace('Bound', '-Bound')}</label>
                    <input
                      type="text"
                      className="shikhar-input"
                      value={goal[field]}
                      onChange={e => updateGoal('medTermGoals', i, field, e.target.value)}
                      placeholder={field === 'timeBound' ? 'Target date (1-3 years)' : ''}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {medTermGoals.length < 3 && (
            <button className="shikhar-btn secondary sm" onClick={() => addGoal('medTermGoals')}>+ Add Medium-Term Goal</button>
          )}

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← Decisions</button>
            <button className="shikhar-btn primary" onClick={() => setStep(3)}>Skill Gaps →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 3: Skill Gaps */}
      {step === 3 && (
        <ExerciseCard
          title="Skill Gap Analyzer"
          description="Identify what skills you have vs. what you need for the next stage"
          icon={<span>📊</span>}
        >
          <div className="skill-gap-section">
            <InteractiveTextArea
              label="Current Skills & Strengths"
              value={currentSkills}
              onChange={v => save('currentSkills', v)}
              placeholder="List your current strengths, skills, competencies, and experiences..."
              rows={4}
            />

            <InteractiveTextArea
              label="Required Skills for Next Stage"
              value={requiredSkills}
              onChange={v => save('requiredSkills', v)}
              placeholder="What skills, attributes, and competencies do you need for your target role?"
              rows={4}
            />

            <InteractiveTextArea
              label="Gap-Closing Plan"
              value={gapPlan}
              onChange={v => save('gapPlan', v)}
              placeholder="How will you bridge the gaps? Courses, mentors, projects, stretch assignments..."
              rows={4}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {sessionData.completed ? (
                <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  Return to Dashboard
                </button>
              ) : (
                <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  ✨ Complete Session 3
                </button>
              )}
            </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(2)}>← SMART Goals</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration show={showCelebration} sessionNumber={3} onContinue={() => navigate('/shikhar')} />
    </SessionLayout>
  );
}
