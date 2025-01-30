import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'TaskFlow',
      description: 'A productivity app designed to streamline task management using a unique priority matrix.',
      image: '/images/taskflow.jpg',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'web',
      github: 'https://github.com/username/taskflow',
      live: 'https://taskflow-demo.com',
    },
    {
      title: 'SoundScape',
      description: 'VST plugin for producing atmospheric sound effects, used by over 1,000 music producers worldwide.',
      image: '/images/soundscape.jpg',
      tags: ['C++', 'JUCE', 'Audio DSP'],
      category: 'audio',
      github: 'https://github.com/username/soundscape',
      live: 'https://soundscape.demo',
    },
    {
      title: 'Custom Linux Distribution',
      description: 'Built a custom Linux distribution optimized for audio production.',
      image: '/images/linux-dist.jpg',
      tags: ['Linux', 'Shell', 'Audio'],
      category: 'system',
      github: 'https://github.com/username/audio-linux',
      live: 'https://audio-linux.org',
    },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Web', value: 'web' },
    { label: 'Audio', value: 'audio' },
    { label: 'System', value: 'system' },
  ];

  const filteredProjects = projects.filter(
    project => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <PortfolioSection id="portfolio">
      <PortfolioContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <SectionTitle>My Work</SectionTitle>
        
        <FilterContainer>
          {filters.map(filter => (
            <FilterButton
              key={filter.value}
              $isActive={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectsGrid>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                  <ProjectOverlay>
                    <ProjectLinks>
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </ProjectLink>
                      <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt />
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectOverlay>
                </ProjectImage>
                
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TagList>
                    {project.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </PortfolioContainer>
    </PortfolioSection>
  );
};

const PortfolioSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PortfolioContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.background : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }

    ${ProjectOverlay} {
      opacity: 1;
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
`;

export default Portfolio;