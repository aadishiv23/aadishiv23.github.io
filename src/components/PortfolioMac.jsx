import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Archive, ArrowLeft, ArrowRight, BatteryFull, BookOpen, ChevronRight, CircleUserRound, FlaskConical, Folder, Github, Grid2X2, Landmark, List, Mail, Newspaper, Search, Share, Wifi } from 'lucide-react';
import { earlierWork, education, experiences, interviews, profile, projects, research } from '../data/portfolio';
import '../styles/portfolio.css';

const sections = ['About', 'Experience', 'Research', 'Projects', 'Archive', 'Writing'];
const sectionIcons = { About: CircleUserRound, Experience: List, Research: FlaskConical, Projects: Folder, Archive, Writing: Newspaper };

export default function PortfolioMac() {
  const [section, setSection] = useState('About');
  const [selectedProject, setSelectedProject] = useState(null);
  const [highlightedProject, setHighlightedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
  const [time, setTime] = useState(new Date());
  const [windowState, setWindowState] = useState('open');
  const [maximized, setMaximized] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [wallpaper, setWallpaper] = useState(0);
  const [navHistory, setNavHistory] = useState(['About']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const dragControls = useDragControls();

  const showToast = message => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 2200);
  };

  const navigateTo = next => {
    setSection(next);
    setQuery('');
    setHighlightedProject(null);
    setNavHistory(current => [...current.slice(0, historyIndex + 1), next]);
    setHistoryIndex(index => index + 1);
  };

  const goBack = () => {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setSection(navHistory[nextIndex]);
  };

  const goForward = () => {
    if (historyIndex >= navHistory.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setSection(navHistory[nextIndex]);
  };

  const restoreFinder = target => {
    setWindowState('open');
    if (target) navigateTo(target);
  };

  const sharePortfolio = async () => {
    try {
      if (navigator.share) await navigator.share({ title: `${profile.name} — Portfolio`, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Portfolio link copied');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Could not open Share');
    }
  };

  const menuAction = async action => {
    setActiveMenu(null);
    if (action === 'about') setAboutOpen(true);
    if (action === 'search') document.querySelector('.finder-search-input')?.focus();
    if (action === 'new') { setWindowState('open'); navigateTo('About'); showToast('New Finder window'); }
    if (action === 'projects') navigateTo('Projects');
    if (action === 'close') setWindowState('closed');
    if (action === 'minimize') setWindowState('minimized');
    if (action === 'zoom') setMaximized(value => !value);
    if (action === 'grid') { setViewMode('grid'); navigateTo('Projects'); }
    if (action === 'list') { setViewMode('list'); navigateTo('Projects'); }
    if (action === 'share') sharePortfolio();
    if (action === 'copy') {
      await navigator.clipboard.writeText(`${profile.name} — ${profile.intro}\n${window.location.href}`);
      showToast('Profile copied');
    }
    if (action === 'wallpaper') { setWallpaper(value => (value + 1) % 3); showToast('Wallpaper changed'); }
    if (action === 'shortcuts') setShortcutsOpen(true);
    if (action === 'egg') showToast('⌘ + Shift + A: you found the secret');
    if (action === 'trash') showToast('Trash is already empty');
    if (action === 'restart') { setWindowState('minimized'); window.setTimeout(() => setWindowState('open'), 650); showToast('Finder relaunched'); }
  };

  const menuItems = {
    apple: [['About This Portfolio', 'about'], ['System Search…', 'search'], ['Change Wallpaper', 'wallpaper'], ['—'], ['Restart Finder…', 'restart']],
    Finder: [['About Finder', 'about'], ['New Finder Window', 'new', '⌘N'], ['—'], ['Hide Finder', 'minimize', '⌘H'], ['Empty Trash…', 'trash']],
    File: [['New Finder Window', 'new', '⌘N'], ['Open Projects', 'projects', '⌘O'], ['Share Portfolio…', 'share'], ['—'], ['Close Window', 'close', '⌘W']],
    Edit: [['Copy Profile', 'copy', '⌘C'], ['—'], ['Find…', 'search', '⌘F']],
    View: [['as Icons', 'grid', '⌘1'], ['as List', 'list', '⌘2'], ['—'], ['Enter Full Screen', 'zoom', '⌃⌘F']],
    Go: sections.map(item => [item, `go:${item}`]),
    Window: [['Minimize', 'minimize', '⌘M'], ['Zoom', 'zoom'], ['—'], ['Bring All to Front', 'new']],
    Help: [['Keyboard Shortcuts', 'shortcuts'], ['Search Portfolio', 'search'], ['—'], ['One More Thing…', 'egg']],
  };

  const runMenuAction = action => action?.startsWith('go:') ? navigateTo(action.slice(3)) : menuAction(action);

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const results = [
      ...sections.map(item => ({ title: item, detail: `Open ${item}`, section: item })),
      ...experiences.map(item => ({ title: item.company, detail: `${item.role} · ${item.period}`, section: 'Experience' })),
      ...projects.map(item => ({ title: item.title, detail: item.kicker, section: 'Projects', project: item })),
      { title: research.lab, detail: research.role, section: 'Research' },
      ...interviews.map(item => ({ title: item.title, detail: item.subject, section: 'Writing' })),
    ];
    return results.filter(item => `${item.title} ${item.detail}`.toLowerCase().includes(needle)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = event => {
      const command = event.metaKey || event.ctrlKey;
      if (event.key === 'Escape') { setSelectedProject(null); setAboutOpen(false); setShortcutsOpen(false); setActiveMenu(null); }
      if (event.code === 'Space' && highlightedProject && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) { event.preventDefault(); setSelectedProject(highlightedProject); }
      if (command && event.key.toLowerCase() === 'w') { event.preventDefault(); setWindowState('closed'); }
      if (command && event.key.toLowerCase() === 'm') { event.preventDefault(); setWindowState('minimized'); }
      if (command && event.key.toLowerCase() === 'f') { event.preventDefault(); document.querySelector('.finder-search-input')?.focus(); }
      if (command && event.key === '1') { event.preventDefault(); setViewMode('grid'); navigateTo('Projects'); }
      if (command && event.key === '2') { event.preventDefault(); setViewMode('list'); navigateTo('Projects'); }
      if (command && event.shiftKey && event.key.toLowerCase() === 'a') { event.preventDefault(); setAboutOpen(true); showToast('Secret About panel unlocked'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [highlightedProject, historyIndex]);

  return (
    <div className={`desktop wallpaper-${wallpaper}`} onClick={() => setActiveMenu(null)}>
      <header className="mac-menubar" onClick={event => event.stopPropagation()}>
        <div className="menu-left">
          <button className="menu-trigger apple-trigger" aria-label="Apple menu" onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}><img className="menubar-apple" src="/images/icons/apple_logo.svg" alt="" /></button>
          {['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => <button key={item} className={`menu-trigger ${item === 'Finder' ? 'app-name' : ''} ${activeMenu === item ? 'active' : ''}`} onClick={() => setActiveMenu(activeMenu === item ? null : item)}>{item}</button>)}
        </div>
        <div><Wifi /><BatteryFull /><span>{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span><span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span></div>
        <AnimatePresence>{activeMenu && <motion.div className={`mac-menu menu-${activeMenu.toLowerCase()}`} initial={{ opacity: 0, y: -5, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4 }} onClick={event => event.stopPropagation()}>{menuItems[activeMenu].map((item, index) => item[0] === '—' ? <hr key={index} /> : <button key={`${item[0]}-${index}`} onClick={() => runMenuAction(item[1])}><span>{item[0]}</span>{item[2] && <kbd>{item[2]}</kbd>}</button>)}</motion.div>}</AnimatePresence>
      </header>

      <div className="desktop-files">
        <a href={profile.github} target="_blank" rel="noreferrer"><span className="desktop-folder"><Github /></span><small>GitHub</small></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="desktop-folder blue-folder">in</span><small>LinkedIn</small></a>
        <a href="/minimal"><span className="desktop-file"><i /><b>MIN</b></span><small>Minimal site</small></a>
      </div>

      <AnimatePresence>
        {windowState === 'open' && (
          <motion.main
            className={`finder ${maximized ? 'maximized' : ''}`}
            drag={!maximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={{ left: -340, right: 340, top: -220, bottom: 220 }}
            initial={{ opacity: 0, scale: .84, y: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .32, y: 420, transition: { duration: .32, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: 'spring', stiffness: 390, damping: 32 }}
            onClick={event => event.stopPropagation()}
          >
            <div className="finder-toolbar" onPointerDown={event => { if (!event.target.closest('button,input')) dragControls.start(event); }} onDoubleClick={() => setMaximized(value => !value)}>
              <div className="traffic">
                <button className="traffic-close" aria-label="Close Finder" title="Close" onClick={() => setWindowState('closed')}>×</button>
                <button className="traffic-minimize" aria-label="Minimize Finder" title="Minimize" onClick={() => setWindowState('minimized')}>−</button>
                <button className="traffic-zoom" aria-label={maximized ? 'Restore Finder' : 'Maximize Finder'} title="Zoom" onClick={() => setMaximized(value => !value)}>+</button>
              </div>
              <div className="history"><button aria-label="Back" disabled={historyIndex === 0} onClick={goBack}><ArrowLeft /></button><button aria-label="Forward" disabled={historyIndex >= navHistory.length - 1} onClick={goForward}><ArrowRight /></button></div>
              <strong><span className="folder-glyph">⌄</span> Aadi — {section}</strong>
              <div className="finder-actions">
                <button aria-label="List view" className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List /></button>
                <button aria-label="Grid view" className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid2X2 /></button>
                <button aria-label="Share" onClick={sharePortfolio}><Share /></button>
                <label className="search"><Search /><input className="finder-search-input" aria-label="Search portfolio" placeholder="Search" value={query} onChange={event => setQuery(event.target.value)} /></label>
              </div>
            </div>

            <div className="finder-body">
              <aside className="finder-sidebar">
                <p>Favorites</p>
                {sections.map(item => { const Icon = sectionIcons[item]; return <button aria-label={item} title={item} className={section === item ? 'selected' : ''} onClick={() => navigateTo(item)} key={item}><Icon /><span>{item}</span></button>; })}
                <p>Locations</p>
                <a aria-label="GitHub" title="GitHub" href={profile.github} target="_blank" rel="noreferrer"><Github /><span>GitHub</span></a>
                <a aria-label="Email" title="Email" href={`mailto:${profile.email}`}><Mail /><span>Email</span></a>
              </aside>

              <div className="finder-content">
                {query && <div className="search-results"><header><Search /><div><span>Search Results</span><h1>{query}</h1></div></header>{searchResults.length ? searchResults.map((item, index) => <button key={`${item.title}-${index}`} onClick={() => { navigateTo(item.section); if (item.project) { setHighlightedProject(item.project); setSelectedProject(item.project); } }}><span className="search-result-icon">{item.title.slice(0, 1)}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div><ChevronRight /></button>) : <p>No results. Try Apple, Fetch, research, or Traace.</p>}</div>}

                {!query && section === 'About' && (
                  <div className="about-pane">
                    <div className="about-header"><div className="profile-icon">A</div><div><span>About this portfolio</span><h1>{profile.name}</h1><p className="current-role">Software Engineer at Apple · Special Projects</p></div></div>
                    <p className="plain-intro">{profile.intro}</p>
                    <dl><div><dt>Location</dt><dd>{profile.location}</dd></div><div><dt>Education</dt><dd>{education.degree}, {education.school} · 2025</dd></div><div><dt>Interests</dt><dd>{profile.interests.join(' · ')}</dd></div><div><dt>Languages</dt><dd>{profile.languages.join(' · ')}</dd></div></dl>
                    <div className="about-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${profile.email}`}>Email</a></div>
                  </div>
                )}

                {!query && section === 'Experience' && (
                  <div className="experience-browser">
                    <div className="experience-list">{experiences.map(item => <button className={selectedExperience === item ? 'active' : ''} onClick={() => setSelectedExperience(item)} key={`${item.company}-${item.period}`}><span className={`row-logo ${item.company === 'Apple' ? 'apple-logo-wrap' : ''}`}><img src={item.logo} alt="" /></span><span><strong>{item.company}</strong><small>{item.role}</small><em>{item.period}</em></span></button>)}</div>
                    <article className="experience-detail"><div className="detail-heading"><span className={`detail-logo ${selectedExperience.company === 'Apple' ? 'apple-logo-wrap' : ''}`}><img src={selectedExperience.logo} alt="" /></span><div><span>{selectedExperience.kind}</span><h2>{selectedExperience.role}</h2><p>{selectedExperience.company}</p></div></div><div className="detail-meta"><span>{selectedExperience.period}</span><span>{selectedExperience.location}</span></div><p className="detail-description">{selectedExperience.description}</p>{selectedExperience.highlights?.length > 0 && <ul>{selectedExperience.highlights.map(point => <li key={point}>{point}</li>)}</ul>}{selectedExperience.gallery?.length > 0 && <div className="fetch-gallery">{selectedExperience.gallery.map(image => <figure key={image.src}><img src={image.src} alt={image.label} /><figcaption>{image.label}</figcaption></figure>)}</div>}</article>
                  </div>
                )}

                {!query && section === 'Research' && <div className="research-pane"><header><div className="research-icon"><FlaskConical /></div><div><span>{research.institution}</span><h1>{research.lab}</h1><p>{research.role} · {research.location}</p></div><a href={research.labUrl} target="_blank" rel="noreferrer">Lab profile <ChevronRight /></a></header><p className="research-description">{research.description}</p><div className="research-topics">{research.topics.map(topic => <span key={topic}>{topic}</span>)}</div><section className="research-grants"><h2><Landmark /> Lab funding</h2>{research.grants.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.award}><span>{item.year}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.agency} · {item.award}</p><em>{item.amount} · {item.description}</em></div><ChevronRight /></a>)}</section><section className="publications"><h2><BookOpen /> Publications & coverage</h2>{research.publications.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.venue}</p><em>{item.description}</em>{item.doi && <code>doi:{item.doi}</code>}</div><ChevronRight /></a>)}</section></div>}

                {!query && section === 'Projects' && <div className={`icon-pane ${viewMode === 'list' ? 'list-view' : ''}`}>{projects.map(project => <button key={project.title} className={highlightedProject === project ? 'file-selected' : ''} onDoubleClick={() => setSelectedProject(project)} onClick={() => setHighlightedProject(project)} aria-label={`Select ${project.title}`}><span className={`project-file ${project.title.toLowerCase()}`}>{project.type === 'video' ? <video src={project.media} muted loop autoPlay playsInline preload="metadata" /> : <img src={project.media} alt={`${project.title} preview`} />}</span><strong>{project.title}</strong><small>{project.kicker}</small></button>)}<p className="finder-hint">Select a project, then press Space for Quick Look.</p></div>}

                {!query && section === 'Archive' && <div className="info-list-pane"><header><Archive /><div><span>Earlier work</span><h1>Project archive</h1><p>Selected experiments and prototypes.</p></div></header><div className="info-rows">{earlierWork.map(item => <article key={item.title}><span>{item.title.slice(0, 1)}</span><div><h2>{item.title}</h2><p>{item.description}</p><small>{item.tech.join(' · ')}</small></div></article>)}</div></div>}
                {!query && section === 'Writing' && <div className="info-list-pane"><header><Newspaper /><div><span>Conversations</span><h1>Interviews</h1><p>Long-form conversations about technology and work.</p></div></header><div className="info-rows writing-rows">{interviews.map(item => item.url ? <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><h2>{item.title}</h2><p>{item.subject}</p><small>{item.venue}</small></div><ChevronRight /></a> : <article key={item.title}><span>{item.year}</span><div><h2>{item.title}</h2><p>{item.subject}</p><small>{item.venue}</small></div></article>)}</div></div>}
              </div>
            </div>
            <div className="finder-status">{highlightedProject && section === 'Projects' ? `${highlightedProject.title} selected · Space to preview` : section === 'Projects' ? '3 items' : section === 'Experience' ? '5 items' : section === 'Research' ? '1 grant · 2 publications' : section === 'Archive' ? '3 items' : section === 'Writing' ? '2 interviews' : '1 item'}<span>◀━━●━━▶</span></div>
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && <motion.div className="quicklook-backdrop" onClick={() => setSelectedProject(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="quicklook" onClick={event => event.stopPropagation()} initial={{ opacity: 0, scale: .88, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 12 }} transition={{ type: 'spring', stiffness: 420, damping: 32 }}><div className="quicklook-bar"><button onClick={() => setSelectedProject(null)}>×</button><strong>{selectedProject.title}</strong><a href={selectedProject.link} target="_blank" rel="noreferrer">Open <ChevronRight /></a></div><div className={`quicklook-media ${selectedProject.title.toLowerCase()}`}><div className="device-stage">{selectedProject.type === 'video' ? <video src={selectedProject.media} controls autoPlay playsInline /> : <img src={selectedProject.media} alt={`${selectedProject.title} preview`} />}</div></div><div className="quicklook-copy"><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p>{selectedProject.features && <ul>{selectedProject.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}<span>{selectedProject.tech.join(' · ')}</span></div></motion.div></motion.div>}
        {aboutOpen && <motion.div className="system-modal-backdrop" onClick={() => setAboutOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="about-mac" onClick={event => event.stopPropagation()} initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }}><button className="modal-close" aria-label="Close About" onClick={() => setAboutOpen(false)}>×</button><div className="about-mac-icon">A</div><h1>macOS Portfolio</h1><p>Version 1.0 (Aadi Edition)</p><dl><div><dt>Engineer</dt><dd>{profile.name}</dd></div><div><dt>Current</dt><dd>Apple · Special Projects</dd></div><div><dt>Memory</dt><dd>Michigan, Fetch, Apple, and a lot of Swift</dd></div></dl><small>Designed in California. Built on the web.</small></motion.section></motion.div>}
        {shortcutsOpen && <motion.div className="system-modal-backdrop" onClick={() => setShortcutsOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="shortcut-card" onClick={event => event.stopPropagation()} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}><button className="modal-close" aria-label="Close Shortcuts" onClick={() => setShortcutsOpen(false)}>×</button><h1>Keyboard Shortcuts</h1><p><kbd>Space</kbd><span>Quick Look selected project</span></p><p><kbd>⌘ 1 / ⌘ 2</kbd><span>Grid or list view</span></p><p><kbd>⌘ F</kbd><span>Search portfolio</span></p><p><kbd>⌘ M / ⌘ W</kbd><span>Minimize or close Finder</span></p><p><kbd>Esc</kbd><span>Close menus and previews</span></p></motion.section></motion.div>}
      </AnimatePresence>

      <AnimatePresence>{toast && <motion.div className="mac-toast" initial={{ opacity: 0, y: -12, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}>{toast}</motion.div>}</AnimatePresence>

      <nav className="dock">
        <motion.button className={windowState === 'open' ? 'dock-running' : ''} whileTap={{ scale: .88 }} onClick={() => restoreFinder('About')} title={windowState === 'open' ? 'Finder' : 'Open Finder'}><span className="finder-icon"><i /><b /></span></motion.button>
        <motion.button className={windowState === 'open' ? 'dock-running' : ''} whileTap={{ scale: .88 }} onClick={() => restoreFinder('Projects')} title="Projects"><span className="dock-folder"><Folder /></span></motion.button>
        <i />
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub"><Github /></a>
        <a href={`mailto:${profile.email}`} title="Mail"><span className="mail-icon"><Mail /></span></a>
        <a href="/minimal" title="Minimal site"><span className="safari-icon">↗</span></a>
      </nav>
    </div>
  );
}
