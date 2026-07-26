import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import './Events.css';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "The Visionary Leader Masterclass",
      type: "Masterclass",
      date: "September 15, 2026",
      time: "10:00 AM - 12:00 PM EST",
      location: "Virtual (Zoom)",
      desc: "Join Pooja Sharma for a deep dive into the frameworks used by top CEOs to cast vision and align teams. Ideal for founders and senior directors.",
      price: "Free for Members | $99 Non-Members",
      image: "/community.png"
    },
    {
      id: 2,
      title: "Executive Presence Retreat",
      type: "Retreat",
      date: "October 12-14, 2026",
      time: "3-Day Immersive",
      location: "Carmel Valley, California",
      desc: "An exclusive, intimate retreat focused entirely on the neuroscience and application of executive presence, communication, and emotional regulation.",
      price: "$2,500 (All-Inclusive)",
      image: "/community.png"
    },
    {
      id: 3,
      title: "Navigating Career Pivots",
      type: "Webinar",
      date: "October 28, 2026",
      time: "1:00 PM - 2:00 PM EST",
      location: "Virtual (Zoom)",
      desc: "A panel discussion with executives who have successfully transitioned industries, discussing positioning, networking, and skill translation.",
      price: "Free",
      image: "/hero.png"
    },
    {
      id: 4,
      title: "London Alumni Mixer",
      type: "Networking",
      date: "November 5, 2026",
      time: "6:30 PM - 9:30 PM BST",
      location: "The Shard, London",
      desc: "An exclusive evening of networking and insights for The Growth Project alumni and special guests in the UK region.",
      price: "Invitation Only",
      image: "/coaching.png"
    }
  ];

  return (
    <div className="events-page">
      <section className="events-hero bg-surface">
        <div className="container text-center">
          <h1>Upcoming Experiences</h1>
          <p className="hero-sub">
            Join our expert-led masterclasses, immersive retreats, and exclusive networking events.
          </p>
        </div>
      </section>

      <section className="section events-list-section">
        <div className="container">
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className="event-type">{event.type}</span>
                </div>
                <div className="event-content">
                  <div className="event-date-box">
                    <span className="ed-month">{event.date.split(' ')[0].substring(0,3)}</span>
                    <span className="ed-day">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="event-details">
                    <h2>{event.title}</h2>
                    <div className="event-meta">
                      <span><Calendar size={14}/> {event.date}</span>
                      <span><Clock size={14}/> {event.time}</span>
                      <span><MapPin size={14}/> {event.location}</span>
                    </div>
                    <p>{event.desc}</p>
                    <div className="event-footer">
                      <span className="event-price">{event.price}</span>
                      <button className="btn btn-secondary">Register Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section bg-primary text-white text-center">
        <div className="container">
          <h2>Host a Private Workshop</h2>
          <p>Bring The Growth Project's transformative frameworks to your corporate team.</p>
          <a href="/contact" className="btn btn-accent">Inquire About Corporate <ArrowRight size={18}/></a>
        </div>
      </section>
    </div>
  );
};

export default Events;
