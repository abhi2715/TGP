import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea,
  ValueChip, CompletionCelebration, SectionDivider, KeyTakeaways
} from './components/ShikharComponents';
import './Sessions.css';

const VALUES = [
  { label: 'Integrity', icon: '🛡️' },
  { label: 'Courage', icon: '🦁' },
  { label: 'Empathy', icon: '💛' },
  { label: 'Innovation', icon: '💡' },
  { label: 'Excellence', icon: '⭐' },
  { label: 'Resilience', icon: '🏔️' },
  { label: 'Authenticity', icon: '🌿' },
  { label: 'Collaboration', icon: '🤝' },
  { label: 'Vision', icon: '🔭' },
  { label: 'Accountability', icon: '✅' },
  { label: 'Growth', icon: '🌱' },
  { label: 'Compassion', icon: '🕊️' },
  { label: 'Curiosity', icon: '🔍' },
  { label: 'Discipline', icon: '⚡' },
  { label: 'Gratitude', icon: '🙏' },
  { label: 'Humility', icon: '🌊' },
];

const STEPS = ['Vision', 'Values', 'Milestones', 'Summary'];

export default function Session1() {
  const navigate = useNavigate();
  const { updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(1);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Data getters with defaults
  const vision5yr = (data.vision5yr as string) || '';
  const vision10yr = (data.vision10yr as string) || '';
  const leadershipMeaning = (data.leadershipMeaning as string) || '';
  const selectedValues = (data.selectedValues as string[]) || [];
  const milestones = (data.milestones as string[]) || Array(8).fill('');
  const valuesConflict = (data.valuesConflict as string) || '';

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(1, key, value);
  }, [updateExerciseData]);

  const toggleValue = (val: string) => {
    const current = [...selectedValues];
    const idx = current.indexOf(val);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else if (current.length < 5) {
      current.push(val);
    }
    save('selectedValues', current);
  };

  const updateMilestone = (index: number, value: string) => {
    const updated = [...milestones];
    updated[index] = value;
    save('milestones', updated);
  };

  const handleComplete = () => {
    completeSession(1);
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
      ((vision5yr ? 20 : 0) + (vision10yr ? 20 : 0) + (selectedValues.length >= 3 ? 20 : 0) +
        (milestones.filter(m => m.trim()).length >= 4 ? 20 : 0) + (leadershipMeaning ? 20 : 0)) 
    ),
    100
  );

  if (!isSessionUnlocked(1)) {
    return (
      <div className="shikhar-session-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p>Session locked.</p>
      </div>
    );
  }

  return (
    <SessionLayout
      sessionNumber={1}
      title="Leadership Vision"
      subtitle="Define your leadership purpose and values. Set intentions for the program and articulate your personal vision."
      icon={<Compass size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <KeyTakeaways items={[
        'Leadership is about authenticity — lead with your own style, not someone else\'s',
        'The 5C Framework: Competence, Creativity, Courage, Communication, Compass',
        'Work-life balance is a myth — it\'s a constant juggling act of radical prioritization',
        'Direction is more important than speed',
        'Choose consciously where to invest your time and energy'
      ]} />

      <SectionDivider title="Interactive Exercise: Vision Builder" />

      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Vision */}
      {step === 0 && (
        <ExerciseCard
          title="Your Leadership Vision"
          description="Articulate your vision of yourself 5 and 10 years from now"
          icon={<span>🔭</span>}
        >
          <InteractiveTextArea
            label="What does leadership mean to you?"
            value={leadershipMeaning}
            onChange={v => save('leadershipMeaning', v)}
            placeholder="Take a moment to reflect... What does leadership mean to you personally?"
            rows={3}
            maxLength={500}
          />

          <InteractiveTextArea
            label="Your 5-Year Vision"
            value={vision5yr}
            onChange={v => save('vision5yr', v)}
            placeholder="Where do you see yourself in 5 years? What role, impact, and life do you envision?"
            rows={4}
            maxLength={800}
          />

          <InteractiveTextArea
            label="Your 10-Year Vision"
            value={vision10yr}
            onChange={v => save('vision10yr', v)}
            placeholder="Expand your horizons — what does your 10-year vision look like? Dream big."
            rows={4}
            maxLength={800}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>
              Next: Values →
            </button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: Values */}
      {step === 1 && (
        <ExerciseCard
          title="Your Core Values"
          description="Select the top 5 values you hold and will continue to hold no matter what"
          icon={<span>💎</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1rem' }}>
            Select up to <strong>5 values</strong> that define who you are ({selectedValues.length}/5 selected)
          </p>

          <div className="values-grid">
            {VALUES.map(v => (
              <ValueChip
                key={v.label}
                label={v.label}
                icon={v.icon}
                selected={selectedValues.includes(v.label)}
                onClick={() => toggleValue(v.label)}
              />
            ))}
          </div>

          {selectedValues.length > 0 && (
            <div className="selected-values-summary">
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--shikhar-olive-dark)' }}>
                Your chosen values:
              </p>
              <div className="selected-values-row">
                {selectedValues.map(v => {
                  const val = VALUES.find(x => x.label === v);
                  return (
                    <span key={v} className="selected-value-tag">
                      {val?.icon} {v}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <InteractiveTextArea
            label="Values vs. Ambition"
            value={valuesConflict}
            onChange={v => save('valuesConflict', v)}
            placeholder="Where & when do you expect you might have to choose between values and achieving your ambition?"
            rows={3}
            maxLength={500}
          />

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Vision</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>Milestones →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: Milestones */}
      {step === 2 && (
        <ExerciseCard
          title="Milestone Timeline"
          description="Create 8-10 specific milestones leading up to your vision"
          icon={<span>🗺️</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            Map out key milestones on your journey. Think in terms of roles, skills, achievements, and personal growth markers.
          </p>

          <div className="milestones-list">
            {milestones.map((m, i) => (
              <div key={i} className="milestone-item">
                <div className="milestone-number">{i + 1}</div>
                <input
                  type="text"
                  className="shikhar-input"
                  value={m}
                  onChange={e => updateMilestone(i, e.target.value)}
                  placeholder={`Milestone ${i + 1}...`}
                />
              </div>
            ))}
            {milestones.length < 10 && (
              <button
                className="shikhar-btn secondary sm"
                onClick={() => save('milestones', [...milestones, ''])}
                style={{ marginTop: '0.5rem' }}
              >
                + Add Milestone
              </button>
            )}
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← Values</button>
            <button className="shikhar-btn primary" onClick={() => setStep(3)}>Summary →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 3: Summary */}
      {step === 3 && (
        <ExerciseCard
          title="Your Vision Board Summary"
          description="Review everything you've created in this session"
          icon={<span>📋</span>}
        >
          <div className="summary-section">
            <h4>🔭 What Leadership Means to You</h4>
            <p className="summary-text">{leadershipMeaning || <em>Not yet defined</em>}</p>
          </div>

          <div className="summary-section">
            <h4>🌟 5-Year Vision</h4>
            <p className="summary-text">{vision5yr || <em>Not yet defined</em>}</p>
          </div>

          <div className="summary-section">
            <h4>🚀 10-Year Vision</h4>
            <p className="summary-text">{vision10yr || <em>Not yet defined</em>}</p>
          </div>

          <div className="summary-section">
            <h4>💎 Core Values</h4>
            <div className="selected-values-row" style={{ marginTop: '0.5rem' }}>
              {selectedValues.length > 0 ? selectedValues.map(v => {
                const val = VALUES.find(x => x.label === v);
                return <span key={v} className="selected-value-tag">{val?.icon} {v}</span>;
              }) : <em style={{ color: '#999' }}>No values selected yet</em>}
            </div>
          </div>

          <div className="summary-section">
            <h4>🗺️ Milestones</h4>
            <ol className="summary-milestones">
              {milestones.filter(m => m.trim()).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
              {milestones.filter(m => m.trim()).length === 0 && (
                <em style={{ color: '#999' }}>No milestones added yet</em>
              )}
            </ol>
          </div>

          <div className="summary-quote">
            <em>"Direction is more important than Speed!"</em>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {sessionData.completed ? (
                <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  Return to Dashboard
                </button>
              ) : (
                <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  ✨ Complete Session 1
                </button>
              )}
            </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(2)}>← Milestones</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration
        show={showCelebration}
        sessionNumber={1}
        onContinue={() => navigate('/shikhar')}
      />
    </SessionLayout>
  );
}
