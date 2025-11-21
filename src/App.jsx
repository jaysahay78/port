import React from 'react'
import designerImage from './assets/unnamed.jpg'

const App = () => {
  return (
    <div className="page">
      <div className="portfolio-shell">
        <div className="grid">
          {/* Hero */}
          <section className="card hero">
            <div className="hero-header">
              <h1>Portfolio</h1>
            </div>
            <div className="hero-tags">
              <span>UX</span>
              <span>UI</span>
              <span>WEB</span>
            </div>
            <div className="hero-social">
              <span className="label">Insta:</span>
              <span>@pragyayy_</span>
            </div>
          </section>

          {/* Designer photo */}
          <section className="card designer-photo">
            <div className="designer-overlay">
              <div className="designer-name">Pragya Mishra</div>
              <div className="designer-title">PRODUCT DESIGNER</div>
            </div>
            <img
              src={designerImage}
              alt="Designer headshot"
            />
          </section>

          {/* About */}
          <section className="card about">
            <h2>About Me</h2>
            <p>
              I create thoughtful digital experiences that blend aesthetics with functionality.
              From concept to launch, I focus on user-centered design that drives results.
            </p>
            <div className="about-meta">
              <div>5+ years experience</div>
              <div>50+ satisfied clients</div>
            </div>
          </section>

          {/* Process */}
          <section className="card process">
            <h2>Process</h2>
            <ol>
              <li>
                <span className="step-number">01</span>
                <div>
                  <div className="step-title">Research</div>
                  <div className="step-desc">User &amp; market analysis</div>
                </div>
              </li>
              <li>
                <span className="step-number">02</span>
                <div>
                  <div className="step-title">Design</div>
                  <div className="step-desc">Wireframes &amp; prototypes</div>
                </div>
              </li>
              <li>
                <span className="step-number">03</span>
                <div>
                  <div className="step-title">Testing</div>
                  <div className="step-desc">User feedback &amp; iteration</div>
                </div>
              </li>
            </ol>
          </section>

          {/* Monitor / website preview */}
          <section className="card monitor-preview">
            <img
              src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Website mockup on monitor"
            />
          </section>

          {/* Phone app */}
          <section className="card phone-preview">
            <img
              src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mobile app preview"
            />
          </section>

          {/* Dashboard */}
          <section className="card dashboard-preview">
            <img
              src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Dashboard interface preview"
            />
          </section>

          {/* 60+ projects pill */}
          <section className="projects-pill">
            <div className="pill-circle">
              <div className="pill-number">60+</div>
              <div className="pill-label">Projects</div>
            </div>
          </section>

          {/* Collaborate */}
          <section className="card collaborate">
            <h2>Let&apos;s Collaborate</h2>
            <p>
              Have a project in mind? Let&apos;s create something amazing together.
            </p>
            <div className="collab-actions">
              <button aria-label="Email">✉️</button>
              <button aria-label="Instagram">📷</button>
              <button aria-label="LinkedIn">🔗</button>
            </div>
            <div className="collab-handle">TG: @designer_ui</div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
