import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
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

    return (
        <HeroContainer>
            <HeroContent
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Greeting variants={itemVariants}>Hello, I'm</Greeting>
            <Name variants={itemVariants}>John Johnny</Name>
            <Title variants={itemVariants}>
                Software Developer & Music Producer
            </Title>
            <Description variants={itemVariants}>
                I'm a self-taught software developer with a passion for creating
                innovative and user-friendly applications. Beyond coding, I craft
                atmospheric soundscapes and tinker with boft software and engines.
            </Description>

            <ButtonGroup variants={itemVariants}>
                <PrimaryButton
                href="#portfolio"
                as={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                View My Work
            </PrimaryButton>
            <SecondaryButton
            href="#contact"
            as={motion.a}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Get In Touch
        </SecondaryButton>
            </ButtonGroup>

            <SocialLinks variants={itemVariants}>
                <SocialLink
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#6e5494' }}
            >
                <FaGithub />
            </SocialLink>
            <SocialLink
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#0077b5' }}
            >
                <FaLinkedin />
            </SocialLink>
            <SocialLink
                href="mailto:developer@example.com"
                whileHover={{ y: -3, color: '#ea4335' }}
            >
                <FaEnvelope />
            </SocialLink>
            </SocialLinks>
        </HeroContent>

        <ScrollIndicator
        as={motion.div}
        animate={{
            y: [0, 10, 0],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        >
            <div />
        </ScrollIndicator>
        </HeroContainer>
    );
};

const HeroContainer = styled.section`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
    );
`;

const HeroContent = styled(motion.div)`
    max-width: 800px;
    text-align: center;
    z-index: 1;
`;

const Greeting = styled(motion.h2)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Name = styled(motion.h1)`
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    background: linear-gradient(
    120deg,
    ${({ theme  }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
    }
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    }
`;

const Description = styled(motion.p)`
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    }
`;

const Button = styled(motion.a)`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.default};
`;

const PrimaryButton = styled(Button)`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    }
`;

const SecondaryButton = styled(Button)`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid ${({ theme }) => theme.colors.text};

    &:hover {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    }
`;

const SocialLinks = styled(motion.div)`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    transition: ${({ theme }) => theme.transitions.default};
    cursor: pointer;
`;

const ScrollIndicator = styled(motion.div)`
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.xl};
    left: 50%;
    transform: translateX(-50%);

    div {
        width: 30px;
        height: 50px;
        border-radius: 25px;
        border: 2px solid ${({ theme }) => theme.colors.text};
        position: relative;

        &::before {
        content: ''l
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: ${({ theme }) => theme.colors.text};
        border-radius: 50%;
        }
    }
`;

export default Hero;