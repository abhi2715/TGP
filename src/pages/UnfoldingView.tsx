import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UnfoldingView() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="unfolding-view-page" style={{ 
      minHeight: '100vh', 
      background: 'var(--color-surface)',
      padding: isFullscreen ? '0' : '11rem 0 0',
      display: 'flex',
      flexDirection: 'column',
      transition: 'padding 0.3s ease'
    }}>
      {/* Top Bar - Hidden when fullscreen */}
      {!isFullscreen && (
        <div className="container" style={{ paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/shikhar" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--shikhar-olive-dark)', fontWeight: 600 }}>
            <Leaf size={20} /> Unfolding
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 500 }}
          >
            <Maximize2 size={18} /> Fullscreen
          </button>
        </div>
      )}

      {/* Fullscreen restore button */}
      {isFullscreen && (
        <button 
          onClick={() => setIsFullscreen(false)}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
            background: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: '100px',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontWeight: 600,
            color: 'var(--color-primary)'
          }}
        >
          <Minimize2 size={16} /> Exit Fullscreen
        </button>
      )}

      {/* Iframe Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          flexGrow: 1, 
          width: '100%', 
          maxWidth: isFullscreen ? '100%' : '1200px', 
          margin: '0 auto', 
          background: 'white',
          borderRadius: isFullscreen ? '0' : '16px 16px 0 0',
          boxShadow: isFullscreen ? 'none' : '0 -10px 40px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          display: 'flex'
        }}
      >
        <iframe
          src="/unfolding/index.html"
          title="Unfolding Growth Companion"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </motion.div>
    </div>
  );
}
