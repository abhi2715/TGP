import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useShikharStore } from '../../hooks/useShikharStore';
import {
  SessionLayout, ExerciseCard, ProgressStepper, InteractiveTextArea,
  CompletionCelebration, SectionDivider, KeyTakeaways, LockedOverlay
} from './components/ShikharComponents';
import './Sessions.css';

interface Stakeholder {
  id: number;
  name: string;
  type: 'difficult' | 'supporting' | 'key';
  strategy: string;
}

const STEPS = ['Stakeholders', 'Village', 'Mentor', 'Review'];

export default function Session4() {
  const navigate = useNavigate();
  const { updateExerciseData, completeSession, getSessionData, isSessionUnlocked } = useShikharStore();
  const sessionData = getSessionData(4);
  const data = sessionData.exerciseData as Record<string, unknown>;

  const [step, setStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const save = useCallback((key: string, value: unknown) => {
    updateExerciseData(4, key, value);
  }, [updateExerciseData]);

  // Data
  const stakeholders = (data.stakeholders as Stakeholder[]) || [];
  const villagePeople = (data.villagePeople as Array<{ name: string; role: string; value: string }>) || [];
  const mentors = (data.mentors as Array<{ name: string; why: string; approach: string }>) || (
    (data.mentorName || data.mentorWhy || data.mentorApproach) 
      ? [{ name: data.mentorName || '', why: data.mentorWhy || '', approach: data.mentorApproach || '' }]
      : [{ name: '', why: '', approach: '' }]
  );
  const relationshipScore = (data.relationshipScore as Record<string, number>) || {};
  const relImprovements = (data.relImprovements as string) || '';

  const addStakeholder = (type: 'difficult' | 'supporting' | 'key') => {
    const s: Stakeholder = { id: Date.now(), name: '', type, strategy: '' };
    save('stakeholders', [...stakeholders, s]);
  };

  const updateStakeholder = (id: number, field: string, value: string) => {
    save('stakeholders', stakeholders.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStakeholder = (id: number) => {
    save('stakeholders', stakeholders.filter(s => s.id !== id));
  };

  const addVillagePerson = () => {
    save('villagePeople', [...villagePeople, { name: '', role: '', value: '' }]);
  };

  const updateVillagePerson = (index: number, field: string, value: string) => {
    const updated = [...villagePeople];
    updated[index] = { ...updated[index], [field]: value };
    save('villagePeople', updated);
  };

  const removeVillagePerson = (index: number) => {
    save('villagePeople', villagePeople.filter((_, i) => i !== index));
  };

  const addMentor = () => {
    save('mentors', [...mentors, { name: '', why: '', approach: '' }]);
  };

  const updateMentor = (index: number, field: string, value: string) => {
    const updated = [...mentors];
    updated[index] = { ...updated[index], [field]: value };
    save('mentors', updated);
  };

  const RELATIONSHIP_AREAS = ['Trust Building', 'Active Listening', 'Strategic Networking', 'Giving Value First', 'Follow-through'];

  const handleComplete = () => {
    completeSession(4);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#556B2F', '#DAA520', '#F0C75E'] });
    setShowCelebration(true);
  };

  const progress = Math.min(
    Math.round(
      ((stakeholders.length >= 4 ? 30 : stakeholders.length >= 2 ? 15 : 0) +
        (villagePeople.length >= 3 ? 25 : villagePeople.length >= 1 ? 10 : 0) +
        (mentors.filter(m => m.name.trim()).length > 0 ? 20 : 0) +
        (Object.keys(relationshipScore).length >= 3 ? 25 : 0))
    ),
    100
  );

  if (!isSessionUnlocked(4)) return <LockedOverlay sessionNumber={4} />;

  return (
    <SessionLayout
      sessionNumber={4}
      title="Influence & Visibility"
      subtitle="Develop influence strategies, map your stakeholders, and build your strategic village."
      icon={<Users size={18} />}
      progress={sessionData.completed ? 100 : progress}
      completed={sessionData.completed}
    >
      <ExerciseCard
        title="Session Mind Map"
        description="A visual overview of the concepts covered in this session."
        icon={<span>🧠</span>}
      >
        <img 
          src="/session-4-mindmap.png" 
          alt="Session 4 Mind Map" 
          style={{ width: '100%', height: 'auto', borderRadius: '12px', border: '1px solid var(--color-border)' }}
        />
      </ExerciseCard>
      <KeyTakeaways items={[
        '"If I have seen further, it is by standing on the shoulders of giants" - Isaac Newton',
        'Relationship Banking: Build mutually beneficial connections, not benefit-extracting ones',
        '"It takes a village to raise a child" - identify your village and its key members',
        'Strategic stakeholder analysis is ongoing and continuous',
        'Focus on multi-modal engagement with formal & informal power structures'
      ]} />

      <SectionDivider title="Interactive Exercise: Stakeholder Map" />
      <ProgressStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

      {/* Step 0: Stakeholder Mapping */}
      {step === 0 && (
        <ExerciseCard
          title="Strategic Stakeholder Analysis"
          description="Identify and categorize the key people on your career journey"
          icon={<span>🗺️</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            Against your short-term milestone, identify stakeholders in three categories. Add at least 2 per category.
          </p>

          {/* Difficult Stakeholders */}
          <div className="stakeholder-section">
            <div className="stakeholder-header difficult">
              <span>⚡ Difficult Stakeholders</span>
              <button className="shikhar-btn sm secondary" onClick={() => addStakeholder('difficult')}>
                <Plus size={14} /> Add
              </button>
            </div>
            <AnimatePresence>
              {stakeholders.filter(s => s.type === 'difficult').map(s => (
                <motion.div key={s.id} className="stakeholder-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <button className="remove-btn" onClick={() => removeStakeholder(s.id)}><X size={14} /></button>
                  <input className="shikhar-input" value={s.name} onChange={e => updateStakeholder(s.id, 'name', e.target.value)} placeholder="Name..." style={{ marginBottom: '0.5rem' }} />
                  <textarea className="shikhar-textarea" value={s.strategy} onChange={e => updateStakeholder(s.id, 'strategy', e.target.value)} placeholder="Your plan for managing this stakeholder..." rows={2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Supporting Stakeholders */}
          <div className="stakeholder-section">
            <div className="stakeholder-header supporting">
              <span>💚 Supporting Stakeholders</span>
              <button className="shikhar-btn sm secondary" onClick={() => addStakeholder('supporting')}>
                <Plus size={14} /> Add
              </button>
            </div>
            <AnimatePresence>
              {stakeholders.filter(s => s.type === 'supporting').map(s => (
                <motion.div key={s.id} className="stakeholder-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <button className="remove-btn" onClick={() => removeStakeholder(s.id)}><X size={14} /></button>
                  <input className="shikhar-input" value={s.name} onChange={e => updateStakeholder(s.id, 'name', e.target.value)} placeholder="Name..." style={{ marginBottom: '0.5rem' }} />
                  <textarea className="shikhar-textarea" value={s.strategy} onChange={e => updateStakeholder(s.id, 'strategy', e.target.value)} placeholder="How will you strengthen this relationship?" rows={2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Key Stakeholders */}
          <div className="stakeholder-section">
            <div className="stakeholder-header key-stakeholder">
              <span>🔑 Key Stakeholders</span>
              <button className="shikhar-btn sm secondary" onClick={() => addStakeholder('key')}>
                <Plus size={14} /> Add
              </button>
            </div>
            <AnimatePresence>
              {stakeholders.filter(s => s.type === 'key').map(s => (
                <motion.div key={s.id} className="stakeholder-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <button className="remove-btn" onClick={() => removeStakeholder(s.id)}><X size={14} /></button>
                  <input className="shikhar-input" value={s.name} onChange={e => updateStakeholder(s.id, 'name', e.target.value)} placeholder="Name..." style={{ marginBottom: '0.5rem' }} />
                  <textarea className="shikhar-textarea" value={s.strategy} onChange={e => updateStakeholder(s.id, 'strategy', e.target.value)} placeholder="Your plan for engaging this critical stakeholder..." rows={2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="step-nav">
            <div />
            <button className="shikhar-btn primary" onClick={() => setStep(1)}>Village →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 1: Village Builder */}
      {step === 1 && (
        <ExerciseCard
          title="Build Your Village"
          description="Identify the key members of your support ecosystem"
          icon={<span>🏘️</span>}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            "It takes a village to raise a child." Who are the key people in your professional village?
          </p>

          <div className="village-grid">
            <AnimatePresence>
              {villagePeople.map((person, i) => (
                <motion.div
                  key={i}
                  className="village-person-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button className="remove-btn" onClick={() => removeVillagePerson(i)}><X size={14} /></button>
                  <div className="village-avatar">{person.name ? person.name[0]?.toUpperCase() : '?'}</div>
                  <input className="shikhar-input" value={person.name} onChange={e => updateVillagePerson(i, 'name', e.target.value)} placeholder="Name" />
                  <input className="shikhar-input" value={person.role} onChange={e => updateVillagePerson(i, 'role', e.target.value)} placeholder="Their role/relationship" style={{ marginTop: '0.5rem' }} />
                  <input className="shikhar-input" value={person.value} onChange={e => updateVillagePerson(i, 'value', e.target.value)} placeholder="Value they bring" style={{ marginTop: '0.5rem' }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button className="shikhar-btn secondary" onClick={addVillagePerson} style={{ marginTop: '1rem' }}>
            <Plus size={16} /> Add Person to Village
          </button>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(0)}>← Stakeholders</button>
            <button className="shikhar-btn primary" onClick={() => setStep(2)}>Mentor →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 2: Mentor Identification */}
      {step === 2 && (
        <ExerciseCard
          title="Mentor Identification"
          description="Who can you enlist as a mentor within the organization?"
          icon={<span>🌟</span>}
        >
          {mentors.map((mentor, index) => (
            <div key={index} style={{ marginBottom: '2rem', paddingBottom: index < mentors.length - 1 ? '2rem' : '1rem', borderBottom: index < mentors.length - 1 ? '1px dashed var(--admin-border)' : 'none' }}>
              <InteractiveTextArea
                label={`Potential Mentor Name #${index + 1}`}
                value={mentor.name}
                onChange={v => updateMentor(index, 'name', v)}
                placeholder="Who within your organization could be your mentor?"
                rows={1}
              />
              <InteractiveTextArea
                label="Why This Person?"
                value={mentor.why}
                onChange={v => updateMentor(index, 'why', v)}
                placeholder="What makes them a good mentor? What can you learn from them?"
                rows={2}
              />
              <InteractiveTextArea
                label="Your Approach"
                value={mentor.approach}
                onChange={v => updateMentor(index, 'approach', v)}
                placeholder="How will you approach them? What will you ask for?"
                rows={2}
              />
            </div>
          ))}

          <button 
            onClick={addMentor}
            className="shikhar-btn secondary"
            style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} /> Add Another Mentor
          </button>

          <div className="relationship-scorecard">
            <h4 style={{ color: 'var(--shikhar-olive-dark)', marginBottom: '1rem' }}>💳 Relationship Banking Scorecard</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginBottom: '1rem' }}>
              Rate yourself 1-5 on each relationship skill:
            </p>
            {RELATIONSHIP_AREAS.map(area => (
              <div key={area} className="score-row">
                <span className="score-label">{area}</span>
                <div className="score-dots">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      className={`score-dot ${(relationshipScore[area] || 0) >= n ? 'active' : ''}`}
                      onClick={() => save('relationshipScore', { ...relationshipScore, [area]: n })}
                    >
                      <Star size={24} fill={(relationshipScore[area] || 0) >= n ? 'currentColor' : 'none'} strokeWidth={2.5} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(1)}>← Village</button>
            <button className="shikhar-btn primary" onClick={() => setStep(3)}>Review →</button>
          </div>
        </ExerciseCard>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <ExerciseCard
          title="Review & Improvement Plan"
          description="Reflect on your stakeholder ecosystem and plan improvements"
          icon={<span>📋</span>}
        >
          <div className="review-stats">
            <div className="stat-card">
              <span className="stat-num">{stakeholders.filter(s => s.type === 'difficult').length}</span>
              <span className="stat-label">Difficult</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{stakeholders.filter(s => s.type === 'supporting').length}</span>
              <span className="stat-label">Supporting</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{stakeholders.filter(s => s.type === 'key').length}</span>
              <span className="stat-label">Key</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{villagePeople.length}</span>
              <span className="stat-label">Village</span>
            </div>
          </div>

          <InteractiveTextArea
            label="Relationship Improvement Plan"
            value={relImprovements}
            onChange={v => save('relImprovements', v)}
            placeholder="Based on your scorecard, what specific steps will you take to improve your relationship banking skills?"
            rows={4}
          />

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              {sessionData.completed ? (
                <button className="shikhar-btn gold" onClick={() => navigate('/shikhar')} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  Return to Dashboard
                </button>
              ) : (
                <button className="shikhar-btn gold" onClick={handleComplete} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                  ✨ Complete Session 4
                </button>
              )}
            </div>

          <div className="step-nav">
            <button className="shikhar-btn secondary" onClick={() => setStep(2)}>← Mentor</button>
          </div>
        </ExerciseCard>
      )}

      <CompletionCelebration show={showCelebration} sessionNumber={4} onContinue={() => navigate('/shikhar')} />
    </SessionLayout>
  );
}
