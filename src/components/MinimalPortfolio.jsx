import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { earlierWork, education, experiences, interviews, profile, projects, research } from '../data/portfolio';
import '../styles/minimal.css';

export default function MinimalPortfolio() {
  return (
    <div className="clean-site">
      <header className="clean-nav"><a href="#top">Aadi Shiv Malhotra</a><nav><a href="#experience">Experience</a><a href="#details">Details</a><a href="#research">Research</a><a href="#interviews">Interviews</a><a href="#work">Work</a><a href="#archive">Earlier</a><a href={profile.linkedin}>LinkedIn ↗</a><a className="desktop-only-link" href="/">macOS version</a></nav></header>
      <main id="top" className="clean-main">
        <section className="clean-intro">
          <div><span className="clean-status"><i /> Cupertino, CA</span><h1>Aadi Shiv Malhotra</h1><p>Software Engineer at Apple · Special Projects</p></div>
          <p>{profile.intro}</p>
        </section>

        <section id="experience" className="clean-section">
          <h2>Work experience</h2>
          <div className="clean-experience">
            {experiences.map(item => (
              <div key={`${item.company}-${item.period}`}><span>{item.period}</span><div><h3>{item.company}</h3><p>{item.role}</p><small>{item.kind} · {item.location}</small></div></div>
            ))}
            <div><span>{education.period}</span><div><h3>{education.school}</h3><p>{education.degree}</p></div></div>
          </div>
        </section>

        <section id="details" className="clean-section clean-details">
          <h2>Details</h2>
          <dl><div><dt>Interests</dt><dd>{profile.interests.join(', ')}</dd></div><div><dt>Languages</dt><dd>{profile.languages.join(', ')}</dd></div><div><dt>Education</dt><dd>{education.note}; {education.activities.join(', ')}</dd></div></dl>
        </section>

        <section id="research" className="clean-section clean-research">
          <h2>Research</h2>
          <div><header><span>{research.role}</span><h3>{research.lab}</h3><p>{research.institution}</p></header><p>{research.description}</p><div className="clean-topics">{research.topics.join(' · ')}</div><h4>Lab funding</h4>{research.grants.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.award}><span>{item.year}</span><div><small>{item.type}</small><strong>{item.title}</strong><p>{item.amount} · {item.agency} · {item.award}</p></div><ArrowUpRight /></a>)}<h4 className="clean-subhead">Publications & coverage</h4>{research.publications.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><small>{item.type}</small><strong>{item.title}</strong><p>{item.venue}</p></div><ArrowUpRight /></a>)}</div>
        </section>

        <section id="interviews" className="clean-section clean-more">
          <h2>Interviews</h2>
          <div className="clean-interviews">{interviews.map(item => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.subject} · {item.venue}</p></div><ArrowUpRight /></a>)}</div>
        </section>

        <section id="work" className="clean-section">
          <h2>Selected work</h2>
          <div className="clean-projects">
            {projects.map((project, index) => (
              <a href={project.link} target="_blank" rel="noreferrer" className="clean-project" key={project.title}>
                <span className="clean-number">0{index + 1}</span>
                <div className="clean-project-copy"><span>{project.kicker}</span><h3>{project.title}</h3><p>{project.description}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><small>{project.tech.join(', ')}</small></div>
                <div className={`clean-project-media ${project.title.toLowerCase()}`}>{project.type === 'video' ? <video src={project.media} muted loop autoPlay playsInline preload="metadata" /> : <img src={project.media} alt={`${project.title} preview`} />}</div>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section id="archive" className="clean-section clean-more">
          <h2>Earlier work</h2>
          <div className="clean-archive">{earlierWork.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p><small>{item.tech.join(' · ')}</small></article>)}</div>
        </section>

        <section className="clean-contact"><h2>Contact</h2><p>The best way to reach me is by <a href={`mailto:${profile.email}`}>email</a>. You can also find me on <a href={profile.github}>GitHub</a> and <a href={profile.linkedin}>LinkedIn</a>.</p></section>
      </main>
      <footer className="clean-footer"><span>© {new Date().getFullYear()} Aadi Shiv Malhotra</span><a href="#top">Top ↑</a></footer>
    </div>
  );
}
