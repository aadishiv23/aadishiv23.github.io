import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Archive, ArrowLeft, ArrowRight, BatteryFull, BookOpen, ChevronRight, CircleUserRound, FlaskConical, Folder, Github, Grid2X2, Landmark, List, Mail, Newspaper, Search, Share, Wifi } from 'lucide-react';
import { earlierWork, education, experiences, interviews, profile, projects, research } from '../data/portfolio';
import '../styles/portfolio.css';

const sections = ['About', 'Experience', 'Research', 'Projects', 'Archive', 'Writing'];

export default function PortfolioMac() {
  const [section, setSection] = useState('About');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="desktop">
      <header className="mac-menubar">
        <div><img className="menubar-apple" src="/images/icons/apple_logo.svg" alt="" /><strong>Finder</strong><span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Window</span><span>Help</span></div>
        <div><Wifi /><BatteryFull /><span>{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span><span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span></div>
      </header>

      <div className="desktop-files">
        <a href={profile.github} target="_blank" rel="noreferrer"><span className="desktop-folder"><Github /></span><small>GitHub</small></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="desktop-folder blue-folder">in</span><small>LinkedIn</small></a>
        <a href="/minimal"><span className="desktop-file"><i /><b>MIN</b></span><small>Minimal site</small></a>
      </div>

      <main className="finder">
        <div className="finder-toolbar">
          <div className="traffic"><i /><i /><i /></div>
          <div className="history"><button aria-label="Back"><ArrowLeft /></button><button aria-label="Forward"><ArrowRight /></button></div>
          <strong><span className="folder-glyph">⌄</span> Aadi — {section}</strong>
          <div className="finder-actions"><button aria-label="List view"><List /></button><button aria-label="Grid view"><Grid2X2 /></button><button aria-label="Share"><Share /></button><button className="search"><Search /><span>Search</span></button></div>
        </div>

        <div className="finder-body">
          <aside className="finder-sidebar">
            <p>Favorites</p>
            {sections.map(item => (
              <button className={section === item ? 'selected' : ''} onClick={() => setSection(item)} key={item}>
                {item === 'About' ? <CircleUserRound /> : item === 'Experience' ? <List /> : item === 'Research' ? <FlaskConical /> : item === 'Archive' ? <Archive /> : item === 'Writing' ? <Newspaper /> : <Folder />}<span>{item}</span>
              </button>
            ))}
            <p>Locations</p>
            <a href={profile.github} target="_blank" rel="noreferrer"><Github /><span>GitHub</span></a>
            <a href={`mailto:${profile.email}`}><Mail /><span>Email</span></a>
          </aside>

          <div className="finder-content">
            {section === 'About' && (
              <div className="about-pane">
                <div className="about-header"><div className="profile-icon">A</div><div><span>About this portfolio</span><h1>{profile.name}</h1><p className="current-role">Software Engineer at Apple · Special Projects</p></div></div>
                <p className="plain-intro">{profile.intro}</p>
                <dl>
                  <div><dt>Location</dt><dd>{profile.location}</dd></div>
                  <div><dt>Education</dt><dd>{education.degree}, {education.school} · 2025</dd></div>
                  <div><dt>Interests</dt><dd>{profile.interests.join(' · ')}</dd></div>
                  <div><dt>Languages</dt><dd>{profile.languages.join(' · ')}</dd></div>
                </dl>
                <div className="about-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${profile.email}`}>Email</a></div>
              </div>
            )}

            {section === 'Experience' && (
              <div className="experience-browser">
                <div className="experience-list">
                  {experiences.map(item => (
                    <button className={selectedExperience === item ? 'active' : ''} onClick={() => setSelectedExperience(item)} key={`${item.company}-${item.period}`}>
                      <span className={`row-logo ${item.company === 'Apple' ? 'apple-logo-wrap' : ''}`}><img src={item.logo} alt="" /></span>
                      <span><strong>{item.company}</strong><small>{item.role}</small><em>{item.period}</em></span>
                    </button>
                  ))}
                </div>
                <article className="experience-detail">
                  <div className="detail-heading"><span className={`detail-logo ${selectedExperience.company === 'Apple' ? 'apple-logo-wrap' : ''}`}><img src={selectedExperience.logo} alt="" /></span><div><span>{selectedExperience.kind}</span><h2>{selectedExperience.role}</h2><p>{selectedExperience.company}</p></div></div>
                  <div className="detail-meta"><span>{selectedExperience.period}</span><span>{selectedExperience.location}</span></div>
                  <p className="detail-description">{selectedExperience.description}</p>
                  {selectedExperience.highlights?.length > 0 && <ul>{selectedExperience.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
                  {selectedExperience.gallery?.length > 0 && <div className="fetch-gallery">{selectedExperience.gallery.map(image => <figure key={image.src}><img src={image.src} alt={image.label} /><figcaption>{image.label}</figcaption></figure>)}</div>}
                </article>
              </div>
            )}

            {section === 'Research' && (
              <div className="research-pane">
                <header><div className="research-icon"><FlaskConical /></div><div><span>{research.institution}</span><h1>{research.lab}</h1><p>{research.role} · {research.location}</p></div><a href={research.labUrl} target="_blank" rel="noreferrer">Lab profile <ChevronRight /></a></header>
                <p className="research-description">{research.description}</p>
                <div className="research-topics">{research.topics.map(topic => <span key={topic}>{topic}</span>)}</div>
                <section className="research-grants"><h2><Landmark /> Lab funding</h2>{research.grants.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.award}><span>{item.year}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.agency} · {item.award}</p><em>{item.amount} · {item.description}</em></div><ChevronRight /></a>)}</section>
                <section className="publications"><h2><BookOpen /> Publications & coverage</h2>{research.publications.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.venue}</p><em>{item.description}</em>{item.doi && <code>doi:{item.doi}</code>}</div><ChevronRight /></a>)}</section>
              </div>
            )}

            {section === 'Projects' && (
              <div className="icon-pane">
                {projects.map(project => (
                  <button key={project.title} onDoubleClick={() => setSelectedProject(project)} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title}`}>
                    <span className={`project-file ${project.title.toLowerCase()}`}>
                      {project.type === 'video' ? <video src={project.media} muted loop autoPlay playsInline preload="metadata" /> : <img src={project.media} alt={`${project.title} preview`} />}
                    </span>
                    <strong>{project.title}</strong><small>{project.kicker}</small>
                  </button>
                ))}
                <p className="finder-hint">Select a project to open Quick Look.</p>
              </div>
            )}

            {section === 'Archive' && (
              <div className="info-list-pane"><header><Archive /><div><span>Earlier work</span><h1>Project archive</h1><p>Selected experiments and prototypes.</p></div></header><div className="info-rows">{earlierWork.map(item => <article key={item.title}><span>{item.title.slice(0, 1)}</span><div><h2>{item.title}</h2><p>{item.description}</p><small>{item.tech.join(' · ')}</small></div></article>)}</div></div>
            )}

            {section === 'Writing' && (
              <div className="info-list-pane"><header><Newspaper /><div><span>Conversations</span><h1>Interviews</h1><p>Long-form conversations about technology and work.</p></div></header><div className="info-rows writing-rows">{interviews.map(item => item.url ? <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><h2>{item.title}</h2><p>{item.subject}</p><small>{item.venue}</small></div><ChevronRight /></a> : <article key={item.title}><span>{item.year}</span><div><h2>{item.title}</h2><p>{item.subject}</p><small>{item.venue}</small></div></article>)}</div></div>
            )}
          </div>
        </div>
        <div className="finder-status">{section === 'Projects' ? '3 items' : section === 'Experience' ? '5 items' : section === 'Research' ? '1 grant · 2 publications' : section === 'Archive' ? '3 items' : section === 'Writing' ? '2 interviews' : '1 item'}<span>◀━━●━━▶</span></div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="quicklook-backdrop" onClick={() => setSelectedProject(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="quicklook" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .94 }}>
              <div className="quicklook-bar"><button onClick={() => setSelectedProject(null)}>×</button><strong>{selectedProject.title}</strong><a href={selectedProject.link} target="_blank" rel="noreferrer">Open <ChevronRight /></a></div>
              <div className={`quicklook-media ${selectedProject.title.toLowerCase()}`}><div className="device-stage">{selectedProject.type === 'video' ? <video src={selectedProject.media} controls autoPlay playsInline /> : <img src={selectedProject.media} alt={`${selectedProject.title} preview`} />}</div></div>
              <div className="quicklook-copy"><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p>{selectedProject.features && <ul>{selectedProject.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}<span>{selectedProject.tech.join(' · ')}</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="dock">
        <button className="dock-running" onClick={() => setSection('About')} title="About"><span className="finder-icon"><i /><b /></span></button>
        <button className="dock-running" onClick={() => setSection('Projects')} title="Projects"><span className="dock-folder"><Folder /></span></button>
        <i />
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub"><Github /></a>
        <a href={`mailto:${profile.email}`} title="Mail"><span className="mail-icon"><Mail /></span></a>
        <a href="/minimal" title="Minimal site"><span className="safari-icon">↗</span></a>
      </nav>
    </div>
  );
}
