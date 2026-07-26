import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, X, Minimize2, Maximize2 } from 'lucide-react';
import './UnfoldingWidget.css';

export default function UnfoldingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="unfolding-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open Unfolding"
          >
            <Leaf size={24} />
            <span className="fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`unfolding-panel ${isMaximized ? 'maximized' : ''}`}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Panel Header */}
            <div className="unfolding-panel-header">
              <div className="panel-title">
                <Leaf size={18} />
                <span>Growth Companion</span>
              </div>
              <div className="panel-controls">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  aria-label={isMaximized ? 'Minimize' : 'Maximize'}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => { setIsOpen(false); setIsMaximized(false); }} aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="unfolding-panel-body">
              <iframe
                src="/unfolding/index.html"
                title="Growth Companion"
                className="unfolding-iframe"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
