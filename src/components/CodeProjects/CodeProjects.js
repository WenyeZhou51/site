import React from 'react';
import './CodeProjects.css';

const CodeProjects = () => {
  // Sample projects - you can replace these with your actual projects
  const projects = [
    {
      id: 'project1',
      title: 'Interactive Web Game',
      description: 'A browser-based game developed using JavaScript and Canvas API. Features include real-time gameplay, score tracking, and responsive design.',
      technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      imageUrl: '/Asset/CodeProjects/placeholder1.png',
      githubUrl: 'https://github.com/username/project1',
      demoUrl: 'https://demo-url.com/project1'
    },
    {
      id: 'project2',
      title: 'Personal Finance Tracker',
      description: 'A React application that helps users track their income, expenses, and savings goals. Includes data visualization and export features.',
      technologies: ['React', 'Node.js', 'Chart.js'],
      imageUrl: '/Asset/CodeProjects/placeholder2.png',
      githubUrl: 'https://github.com/username/project2',
      demoUrl: 'https://demo-url.com/project2'
    },
    {
      id: 'project3',
      title: 'Weather Dashboard',
      description: 'A dashboard that displays current weather and forecasts for user-selected locations. Integrates with a weather API and includes geolocation features.',
      technologies: ['JavaScript', 'API Integration', 'Bootstrap'],
      imageUrl: '/Asset/CodeProjects/placeholder3.png',
      githubUrl: 'https://github.com/username/project3',
      demoUrl: 'https://demo-url.com/project3'
    }
  ];

  return (
    <div className="code-projects-container">
      <h2 className="about-title">Fun Code Projects</h2>
      <div className="projects-intro">
        <p>Explore a collection of my coding projects. These range from web applications to games and tools, showcasing different programming languages and technologies.</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-image-container">
              <img 
                src={project.imageUrl} 
                alt={`${project.title} screenshot`} 
                className="project-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Asset/CodeProjects/default-placeholder.png';
                }}
              />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Code
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeProjects; 