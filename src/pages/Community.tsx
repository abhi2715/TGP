import { Link } from 'react-router-dom';
import { Users, Globe, Video, MessageCircle } from 'lucide-react';
import './Community.css';

const Community = () => {
  return (
    <div className="community-page">
      <section className="community-hero bg-primary text-white text-center">
        <div className="container">
          <span className="community-tag">The Growth Network</span>
          <h1>Surround yourself with excellence.</h1>
          <p className="hero-sub">
            Join a vetted, global network of ambitious professionals, founders, and leaders committed to pushing each other further.
          </p>
          <div className="community-stats">
            <div className="c-stat">
              <span className="c-stat-num">5,000+</span>
              <span className="c-stat-label">Active Members</span>
            </div>
            <div className="c-stat">
              <span className="c-stat-num">45</span>
              <span className="c-stat-label">Countries</span>
            </div>
            <div className="c-stat">
              <span className="c-stat-num">120+</span>
              <span className="c-stat-label">Annual Events</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section community-benefits bg-surface">
        <div className="container">
          <div className="section-header text-center">
            <h2>Community Benefits</h2>
          </div>
          <div className="c-benefits-grid">
            <div className="c-benefit-card">
              <Users size={32} />
              <h3>Peer Masterminds</h3>
              <p>Curated, small-group sessions matching you with peers at similar career stages to solve specific challenges.</p>
            </div>
            <div className="c-benefit-card">
              <Globe size={32} />
              <h3>Global Networking</h3>
              <p>Access our private directory to connect with leaders and alumni from top-tier organizations worldwide.</p>
            </div>
            <div className="c-benefit-card">
              <Video size={32} />
              <h3>Exclusive Events</h3>
              <p>Monthly virtual masterclasses, fireside chats with industry titans, and regional in-person meetups.</p>
            </div>
            <div className="c-benefit-card">
              <MessageCircle size={32} />
              <h3>24/7 Digital Hub</h3>
              <p>A private, distraction-free platform for asynchronous Q&A, resource sharing, and continuous support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section community-gallery">
        <div className="container">
          <div className="section-header text-center">
            <h2>Inside The Network</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="/community.png" alt="Networking Event" />
              <div className="gallery-caption">Annual Leadership Summit 2025</div>
            </div>
            <div className="gallery-item">
              <img src="/community.png" alt="Mastermind Group" />
              <div className="gallery-caption">Founders Mastermind, London</div>
            </div>
            <div className="gallery-item">
              <img src="/coaching.png" alt="Workshop" />
              <div className="gallery-caption">Strategy Workshop</div>
            </div>
            <div className="gallery-item">
              <img src="/hero.png" alt="Virtual Call" />
              <div className="gallery-caption">Monthly Digital Fireside</div>
            </div>
            <div className="gallery-item">
              <img src="/community.png" alt="Retreat" />
              <div className="gallery-caption">Executive Retreat</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta text-center">
        <div className="container">
          <h2>Ready to find your tribe?</h2>
          <p>Community access is included in all our premium programmes and available via separate membership.</p>
          <div className="cta-group center">
            <Link to="/book-consultation" className="btn btn-primary">Book a conversation</Link>
            <Link to="/programmes" className="btn btn-secondary">Explore programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
