import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Lock, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateSessionTranscript } from '../../../utils/generateTranscript';
import './ShikharComponents.css';

/* ──────── SESSION LAYOUT ──────── */
interface SessionLayoutProps {
  sessionNumber: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  progress: number;
  completed: boolean;
}

export function SessionLayout({ sessionNumber, title, subtitle, icon, children, progress, completed }: SessionLayoutProps) {
  const handleDownloadTranscript = () => {
    generateSessionTranscript(sessionNumber, title);
  };

  return (
    <div className={`shikhar-session-page session-page-${sessionNumber}`}>
      <div className="session-hero">
        <div className="session-hero-bg" />
        <div className="container session-hero-content">
          <Link to="/shikhar" className="session-back-btn">
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <motion.div
            className="session-hero-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="session-number-badge">
              {icon}
              <span>Session {sessionNumber}</span>
            </div>
            <h1>{title}</h1>
            <p className="session-subtitle">{subtitle}</p>
            
            <div className="session-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a 
                href={`/pdfs/session-${sessionNumber}.pdf`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="shikhar-btn light-outline sm"
              >
                <FileText size={16} /> View Session PDF
              </a>
              
              {completed && (
                <button 
                  onClick={handleDownloadTranscript} 
                  className="shikhar-btn gold sm"
                >
                  <Download size={16} /> Download Transcript
                </button>
              )}
            </div>

          </motion.div>
        </div>
      </div>
      <div className="container session-body">
        {children}
      </div>
    </div>
  );
}

/* ──────── EXERCISE CARD ──────── */
interface ExerciseCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ExerciseCard({ title, description, icon, children, className = '', delay = 0 }: ExerciseCardProps) {
  return (
    <motion.div
      className={`shikhar-exercise-card ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="exercise-card-header">
        {icon && <div className="exercise-card-icon">{icon}</div>}
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      <div className="exercise-card-body">
        {children}
      </div>
    </motion.div>
  );
}

/* ──────── PROGRESS STEPPER ──────── */
interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressStepper({ steps, currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <div className="shikhar-stepper">
      {steps.map((step, i) => (
        <div key={i} className={`stepper-item ${i <= currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}>
          <button
            className="stepper-circle"
            onClick={() => onStepClick?.(i)}
            disabled={i > currentStep}
          >
            {i < currentStep ? <CheckCircle2 size={16} /> : i + 1}
          </button>
          <span className="stepper-label">{step}</span>
          {i < steps.length - 1 && <div className="stepper-line" />}
        </div>
      ))}
    </div>
  );
}

/* ──────── INTERACTIVE TEXT AREA ──────── */
interface InteractiveTextAreaProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  maxLength?: number;
}

export function InteractiveTextArea({ value, onChange, placeholder, label, rows = 4, maxLength }: InteractiveTextAreaProps) {
  return (
    <div className="shikhar-textarea-wrap">
      {label && <label className="shikhar-label">{label}</label>}
      <textarea
        className="shikhar-textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
      {maxLength && (
        <span className="shikhar-char-count">{value.length}/{maxLength}</span>
      )}
    </div>
  );
}

/* ──────── VALUE CHIP ──────── */
interface ValueChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: string;
}

export function ValueChip({ label, selected, onClick, icon }: ValueChipProps) {
  return (
    <motion.button
      className={`shikhar-value-chip ${selected ? 'selected' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {icon && <span className="chip-icon">{icon}</span>}
      {label}
      {selected && <CheckCircle2 size={14} />}
    </motion.button>
  );
}

/* ──────── QUADRANT GRID ──────── */
interface QuadrantGridProps {
  topLeft: { label: string; content: ReactNode };
  topRight: { label: string; content: ReactNode };
  bottomLeft: { label: string; content: ReactNode };
  bottomRight: { label: string; content: ReactNode };
  xLabel?: string;
  yLabel?: string;
}

export function QuadrantGrid({ topLeft, topRight, bottomLeft, bottomRight, xLabel, yLabel }: QuadrantGridProps) {
  return (
    <div className="shikhar-quadrant-wrap">
      {yLabel && <div className="quadrant-y-label">{yLabel}</div>}
      <div className="shikhar-quadrant-grid">
        <div className="quadrant-cell tl">
          <div className="quadrant-cell-label">{topLeft.label}</div>
          {topLeft.content}
        </div>
        <div className="quadrant-cell tr">
          <div className="quadrant-cell-label">{topRight.label}</div>
          {topRight.content}
        </div>
        <div className="quadrant-cell bl">
          <div className="quadrant-cell-label">{bottomLeft.label}</div>
          {bottomLeft.content}
        </div>
        <div className="quadrant-cell br">
          <div className="quadrant-cell-label">{bottomRight.label}</div>
          {bottomRight.content}
        </div>
      </div>
      {xLabel && <div className="quadrant-x-label">{xLabel}</div>}
    </div>
  );
}

/* ──────── COMPLETION CELEBRATION ──────── */
interface CompletionCelebrationProps {
  show: boolean;
  sessionNumber: number;
  onContinue: () => void;
}

export function CompletionCelebration({ show, sessionNumber, onContinue }: CompletionCelebrationProps) {
  if (!show) return null;

  return (
    <motion.div
      className="shikhar-celebration-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="celebration-card"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        <div className="celebration-icon">🏔️</div>
        <h2>Session {sessionNumber} Complete!</h2>
        <p>You've taken another step on your Shikhar journey. Your insights have been saved.</p>
        <div className="celebration-stars">
          {['⭐', '🌟', '⭐'].map((s, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
            >
              {s}
            </motion.span>
          ))}
        </div>
        <button className="shikhar-btn primary" onClick={onContinue}>
          Continue to Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ──────── LOCKED SESSION OVERLAY ──────── */
interface LockedOverlayProps {
  sessionNumber: number;
}

export function LockedOverlay({ sessionNumber }: LockedOverlayProps) {
  return (
    <div className="shikhar-locked-overlay">
      <Lock size={48} />
      <h3>Session {sessionNumber} is Locked</h3>
      <p>Complete Session {sessionNumber - 1} to unlock this session.</p>
      <Link to="/shikhar" className="shikhar-btn secondary">
        Back to Dashboard
      </Link>
    </div>
  );
}

/* ──────── SECTION DIVIDER ──────── */
export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="shikhar-section-divider">
      <div className="divider-line" />
      <span>{title}</span>
      <div className="divider-line" />
    </div>
  );
}

/* ──────── KEY TAKEAWAY ──────── */
interface KeyTakeawayProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawayProps) {
  return (
    <motion.div
      className="shikhar-takeaways"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3>📌 Key Takeaways</h3>
      <ul>
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
