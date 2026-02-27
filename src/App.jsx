import { useState, useEffect, useRef } from 'react'
import {
  Home, Building2, Mountain, Coffee, Hammer, Compass,
  Shield, Heart, ChevronDown, Phone, Mail, MapPin,
  ArrowRight, Menu, X, CheckCircle2, Instagram, Facebook
} from 'lucide-react'
import './App.css'

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = ref.current?.querySelectorAll('.fade-up')
    elements?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

function Logo({ color = '#1C1C1C', size = 40 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none">
      <path d="M20 70 L20 40 L50 20 L80 40 L80 70" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="20" x2="50" y2="70" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <path d="M35 70 L35 48" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M65 70 L65 48" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    </svg>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', projectType: '', message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const sectionRef = useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <div ref={sectionRef}>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={() => scrollTo('hero')}>
            <Logo color={scrolled ? '#1C1C1C' : '#FFFFFF'} size={36} />
            <div className="nav-logo-text" style={{ color: scrolled ? '#1C1C1C' : '#FFFFFF' }}>
              Abide
              <span style={{ color: scrolled ? '#8A8A8A' : 'rgba(255,255,255,0.5)' }}>Build Co</span>
            </div>
          </a>
          <div className="nav-links" style={{ display: mobileOpen ? 'flex' : undefined }}>
            {['Services', 'Projects', 'Story', 'Process', 'Contact'].map(item => (
              <a
                key={item}
                className="nav-link"
                style={{ color: scrolled ? undefined : 'rgba(255,255,255,0.7)' }}
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </a>
            ))}
            <button className="nav-cta" onClick={() => scrollTo('contact')}>Start Your Build</button>
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: scrolled ? '#1C1C1C' : '#FFFFFF' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={14} />
            Now Building Across Virginia
          </div>
          <h1>
            We Build Homes<br />
            That <span className="accent">Abide</span>
          </h1>
          <p className="hero-sub">
            Spec homes, custom builds, mountain retreats, and commercial spaces — crafted with integrity, built to last generations.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Start Your Project <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('projects')}>
              View Our Work <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          Scroll
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { num: '7+', label: 'Spec Homes in 2026' },
            { num: '3', label: 'Mountain Airbnbs' },
            { num: '100%', label: 'Client Satisfaction' },
            { num: '∞', label: 'Commitment to Quality' },
          ].map((s, i) => (
            <div key={i} className="stat-item fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="section">
        <div className="section-header fade-up">
          <span className="section-label">What We Build</span>
          <h2 className="section-title">Crafted for Every Vision</h2>
          <p className="section-subtitle">
            From spec homes to mountain retreats, we bring the same standard of excellence to every project.
          </p>
        </div>
        <div className="services-grid">
          {[
            {
              icon: <Home size={24} />,
              title: 'Spec Homes',
              desc: 'Thoughtfully designed move-in ready homes built with premium materials and modern floor plans that today\'s buyers are looking for.'
            },
            {
              icon: <Compass size={24} />,
              title: 'Custom Homes',
              desc: 'Your dream, our craftsmanship. We partner with you from concept to completion to create a home that\'s uniquely yours.'
            },
            {
              icon: <Mountain size={24} />,
              title: 'Mountain Retreats',
              desc: 'Stunning Airbnb-ready properties nestled in the mountains — designed for unforgettable getaways and strong rental returns.'
            },
            {
              icon: <Coffee size={24} />,
              title: 'Commercial Builds',
              desc: 'Coffee shops, retail spaces, and beyond. We bring the same residential attention to detail to select commercial projects.'
            },
          ].map((service, i) => (
            <div key={i} className="service-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section section-cream">
        <div className="section-header fade-up">
          <span className="section-label">Our Portfolio</span>
          <h2 className="section-title">Built With Purpose</h2>
          <p className="section-subtitle">
            Every project tells a story. Here's a glimpse of what we're building.
          </p>
        </div>
        <div className="projects-grid">
          {[
            { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', type: 'Spec Home', name: 'The Ridgeline', tall: true },
            { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', type: 'Custom Build', name: 'Oakwood Estate' },
            { img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', type: 'Spec Home', name: 'Cedar Creek' },
            { img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80', type: 'Mountain Retreat', name: 'Summit Lodge' },
            { img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', type: 'Mountain Airbnb', name: 'Blue Ridge Cabin', tall: true },
            { img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80', type: 'Commercial', name: 'Roasted & Co Café' },
          ].map((project, i) => (
            <div key={i} className={`project-card fade-up ${project.tall ? 'tall' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <img className="project-img" src={project.img} alt={project.name} loading="lazy" />
              <div className="project-overlay">
                <div className="project-type">{project.type}</div>
                <div className="project-name">{project.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="section section-dark">
        <div className="story-grid">
          <div className="story-image fade-up">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction craftsmanship"
            />
            <div className="story-image-accent" />
          </div>
          <div className="story-content fade-up">
            <span className="section-label">Our Story</span>
            <h2>Built on a Foundation<br />of <span className="accent">Integrity</span></h2>
            <p>
              Abide Build Co was born from a simple conviction: that the homes and spaces we create should reflect the values we live by. Every nail driven, every beam raised, every detail finished — it's all done with a commitment to excellence that goes beyond the blueprint.
            </p>
            <p>
              We're not just building structures. We're building trust, community, and spaces where life happens — from the family gathering in a custom home to the traveler finding rest in a mountain retreat.
            </p>
            <div className="story-values">
              {[
                { icon: <Shield size={18} />, title: 'Integrity First', desc: 'We do what we say' },
                { icon: <Hammer size={18} />, title: 'Quality Craft', desc: 'Excellence in every detail' },
                { icon: <Heart size={18} />, title: 'Community Driven', desc: 'Building neighborhoods' },
                { icon: <Building2 size={18} />, title: 'Built to Last', desc: 'Generational quality' },
              ].map((v, i) => (
                <div key={i} className="value-item">
                  <span className="value-icon">{v.icon}</span>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section">
        <div className="section-header fade-up">
          <span className="section-label">How We Work</span>
          <h2 className="section-title">From Vision to Reality</h2>
          <p className="section-subtitle">
            A transparent, collaborative process from day one.
          </p>
        </div>
        <div className="process-grid">
          {[
            { num: '01', title: 'Discover', desc: 'We listen to your vision, understand your goals, and evaluate the possibilities.' },
            { num: '02', title: 'Design', desc: 'Collaborative planning with detailed blueprints, timelines, and transparent budgeting.' },
            { num: '03', title: 'Build', desc: 'Expert craftsmanship with consistent communication and uncompromising quality standards.' },
            { num: '04', title: 'Deliver', desc: 'A finished space that exceeds expectations, backed by our commitment to lasting quality.' },
          ].map((step, i) => (
            <div key={i} className="process-step fade-up" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="process-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section">
        <div className="testimonial-content fade-up">
          <div className="testimonial-quote">
            The quality and attention to detail Abide Build Co brings to every project is unmatched. They don't just build houses — they build homes you're proud to live in.
          </div>
          <div className="testimonial-author">Future Homeowners</div>
          <div className="testimonial-role">Virginia</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content fade-up">
          <h2>Ready to Build<br />Something <span className="accent">Extraordinary</span>?</h2>
          <p>Whether it's a spec home, custom build, mountain retreat, or commercial space — let's bring your vision to life.</p>
          <button className="btn-primary" onClick={() => scrollTo('contact')}>
            Let's Talk <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="contact-grid">
          <div className="contact-info fade-up">
            <span className="section-label">Get In Touch</span>
            <h2>Let's Build<br />Together</h2>
            <p>Have a project in mind? We'd love to hear about it. Reach out and let's start the conversation.</p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon"><MapPin size={18} /></div>
                <div>
                  <h4>Location</h4>
                  <p>Virginia</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><Phone size={18} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>Contact us for details</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><Mail size={18} /></div>
                <div>
                  <h4>Email</h4>
                  <p>info@abidebuildco.com</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form fade-up" onSubmit={handleSubmit}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <CheckCircle2 size={48} color="#C4884D" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                  Message Sent
                </h3>
                <p style={{ color: '#5A5A5A' }}>We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={e => setFormData({...formData, projectType: e.target.value})}
                    required
                  >
                    <option value="">Select a project type</option>
                    <option value="spec">Spec Home</option>
                    <option value="custom">Custom Home</option>
                    <option value="airbnb">Mountain Airbnb / Retreat</option>
                    <option value="commercial">Commercial Build</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tell Us About Your Project</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Share your vision..."
                  />
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Logo color="#FFFFFF" size={36} />
            <p>
              Building homes and spaces with integrity, craftsmanship, and purpose. Based in Virginia.
            </p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a onClick={() => scrollTo('services')}>Spec Homes</a>
            <a onClick={() => scrollTo('services')}>Custom Homes</a>
            <a onClick={() => scrollTo('services')}>Mountain Retreats</a>
            <a onClick={() => scrollTo('services')}>Commercial</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a onClick={() => scrollTo('story')}>Our Story</a>
            <a onClick={() => scrollTo('projects')}>Projects</a>
            <a onClick={() => scrollTo('process')}>Process</a>
            <a onClick={() => scrollTo('contact')}>Contact</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Houzz</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Abide Build Co. All rights reserved.</span>
          <div className="footer-socials">
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Facebook size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
