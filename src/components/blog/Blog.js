import React, { memo, useMemo } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogPosts } from '../../data/blogPosts';

// Memoized components for better performance
const MemoizedSyntaxHighlighter = memo(({ children, ...props }) => (
  <SyntaxHighlighter {...props} style={vscDarkPlus}>
    {children}
  </SyntaxHighlighter>
));

const MemoizedMarkdown = memo(({ content }) => (
  <ReactMarkdown
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
          <MemoizedSyntaxHighlighter
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </MemoizedSyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
));

const BlogList = () => {
  return (
    <BlogListContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <BlogHeader>
        <h1>Blog Posts ({blogPosts.length})</h1>
        <p>Thoughts, tutorials, and insights about software development and music production.</p>
      </BlogHeader>

      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            as={motion.article}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <CardImage>
              <img 
                src={post.image} 
                alt={post.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop';
                }}
              />
            </CardImage>
            <CardContent>
              <CardMeta>
                <MetaItem>
                  <FaClock />
                  {post.date}
                </MetaItem>
                <MetaItem>
                  <FaClock />
                  {post.readTime} read
                </MetaItem>
              </CardMeta>
              <CardTitle>{post.title}</CardTitle>
              <CardExcerpt>{post.excerpt}</CardExcerpt>
              <TagList>
                {post.tags.map((tag) => (
                  <Tag key={tag}>
                    <FaTag />
                    {tag}
                  </Tag>
                ))}
              </TagList>
              <ReadMoreLink to={`/blog/${post.id}`}>
                Read More <FaChevronRight />
              </ReadMoreLink>
            </CardContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogListContainer>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const post = useMemo(() => 
    blogPosts.find(p => p.id === parseInt(id)), 
    [id]
  );

  if (!post) {
    return (
      <BlogPostContainer>
        <h1>Post not found</h1>
        <BackToBlogs>
          <Link to="/blog">← Back to Blog List</Link>
        </BackToBlogs>
      </BlogPostContainer>
    );
  }

  return (
    <BlogPostContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PostHeader>
        <PostImage>
          <img src={post.image} alt={post.title} />
        </PostImage>
        <PostMeta>
          <MetaItem>
            <FaClock />
            {post.date}
          </MetaItem>
          <MetaItem>
            <FaClock />
            {post.readTime} read
          </MetaItem>
        </PostMeta>
        <h1>{post.title}</h1>
        <TagList>
          {post.tags.map((tag) => (
            <Tag key={tag}>
              <FaTag />
              {tag}
            </Tag>
          ))}
        </TagList>
      </PostHeader>

      <PostContent>
        <MemoizedMarkdown content={post.content} />
      </PostContent>
      
      <BackToBlogs>
        <Link to="/blog">← Back to Blog List</Link>
      </BackToBlogs>
    </BlogPostContainer>
  );
};

const Blog = () => {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path=":id" element={<BlogPost />} />
    </Routes>
  );
};

const BlogContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const BlogListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h1 {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: linear-gradient(120deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.2rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${BlogCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;

  svg {
    font-size: 0.8rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const CardExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;

  svg {
    font-size: 0.7rem;
  }
`;

const ReadMoreLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;

  &:hover {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const BlogPostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostMeta = styled(CardMeta)`
  justify-content: center;
`;

const PostContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  font-size: 1.1rem;

  h1, h2, h3, h4, h5, h6 {
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  code {
    background: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  pre {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    
    div {
      border-radius: ${({ theme }) => theme.borderRadius.medium};
      
      code {
        background: none;
        padding: 0;
      }
    }
  }

  blockquote {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
    font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing.lg} 0;

    th, td {
      padding: ${({ theme }) => theme.spacing.sm};
      border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
    }

    th {
      background: ${({ theme }) => `${theme.colors.primary}15`};
      font-weight: bold;
    }
  }
`;

const BackToBlogs = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export default Blog;