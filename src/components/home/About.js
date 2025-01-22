import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaMusic, FaCar } from 'react-icons/fa';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const skills = [
        'JavaScript/React',
        'Node.js',
        'Python',
        'SQL',
        'Git',
        'RESTful APIs',
        'Audio Production',
        'Sound Design',
        'Linux',
    ];

    const interests = [
        {
            icon: <FaCode />,
            title: 'Software Development',
            description: 'Passionate about creating elegant solutions to complex problems though clean, efficient code.',
        },
        {
            icon: <FaMusic />,
            title: 'Music Production',
            description: 'Creating atmospheric soundscapes and producing VST plugins used by musicians worldwide.',
        },
        {
            icon: <FaCar />,
            title: 'Automotive',
            description: 'Enthusiast who enjoys tinkering with engines and understanding mechanical systems.',
        },
    ];

    return (
        <AboutSection id="about">
            <AboutContainer
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
                <SectionTitle variants={itemVariants}>About Me</SectionTitle>

                <ContentWrapper>
                    <AboutContent variants={itemVariants}>
                        <p>
                            I'm a self-taught software developer with a unique blend of technical expertise
                            and creative passion. My journey in technology has been driven by curiosity
                            and a desire to create meaningful solution.
                        </p>
                        <p>
                            With a strong foundation in problem-solving and an eye for detail, I specialize
                            in developing user-friendly applications that make a difference. My experience
                            ranges from building productivity tools to creating custom audio plugins.
                        </p>
                    </AboutContent>

                    <SkillsSection variants={itemVariants}>
                        <h3>Skills & Technologies</h3>
                        <SkillsGrid>
                            {skills.map((skill, index) => (
                                <SkillTag
                                key={index}
                                as={motion.div}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </SkillTag>
                            ))}
                        </SkillsGrid>
                    </SkillsSection>
                </ContentWrapper>

                <InterestsSection variants={itemVariants}>
                    <h3>What I Do</h3>
                    <InterestsGrid>
                        {interests.map((interest, index) => (
                            <InterestCard
                            key={index}
                            as={motion.div}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                            >
                                <IconWrapper>{interest.icon}</IconWrapper>
                                <h4>{interest.title}</h4>
                                <p>{interest.description}</p>
                            </InterestCard>
                        ))}
                    </InterestsGrid>
                </InterestsSection>
            </AboutContainer>
        </AboutSection>
    );
};

const AboutSection = styled.section`
    background: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
    min-height: 100vh;
    display: flex;
    align-items: center;
`;

const AboutContainer = styled(motion.div)`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
`;

const SectionTitle = styled(motion.h2)`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    text-align: center;
    background: linear-gradient(120deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-colums: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-colums: 1fr;
    }
`;

const AboutContent = styled(motion.div)`
    p {
        margin-bottom: ${({ theme }) => theme.spacing.md};
        line-height: 1.8;
        olor: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const SkillsSection = styled(motion.div)`
    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.md};
        color: ${({ theme }) => theme.colors.text};
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillTag = styled(motion.div)`
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    text-align: center;
    font-size: 0.9rem;
    cursor: default;
`;

const InterestsSection = styled(motion.div)`
  h3 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InterestCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};

  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export default About;