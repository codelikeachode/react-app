export const blogPosts = [
    {
      id: 1,
      title: 'Building a Modern React Application',
      excerpt: 'Learn how to create a modern React application with the latest best practices, including hooks, context, and styled-components.',
      date: '2023-12-26',
      readTime: '8 min',
      tags: ['React', 'JavaScript', 'Web Development'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      content: `# Building a Modern React Application
  
  React has evolved significantly since its initial release. In this post, we'll explore how to build a modern React application using the latest features and best practices.
  
  ## Key Topics Covered
  
  1. Project Setup
  2. Component Architecture
  3. State Management
  4. Routing
  5. Styling Solutions
  
  \`\`\`javascript
  // Example of a modern React component
  const MyComponent = () => {
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
      // Side effects here
    }, []);
  
    return (
      <div>
        <h1>Modern React</h1>
      </div>
    );
  };
  \`\`\`
  `
    },
    {
      id: 2,
      title: 'Mastering CSS Grid Layout',
      excerpt: 'A comprehensive guide to CSS Grid Layout, covering everything from basic concepts to advanced techniques.',
      date: '2023-12-20',
      readTime: '6 min',
      tags: ['CSS', 'Web Design', 'Frontend'],
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
      content: `# Mastering CSS Grid Layout
  
  CSS Grid Layout is a powerful tool that has revolutionized web layout design. In this guide, we'll explore everything from basic concepts to advanced techniques.
  
  ## Grid Basics
  
  | Property | Description |
  |----------|-------------|
  | grid-template-columns | Defines columns in grid |
  | grid-template-rows | Defines rows in grid |
  | grid-gap | Sets spacing between grid items |
  
  \`\`\`css
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  \`\`\`
  `
    },
    {
      id: 3,
      title: 'The Art of Music Production',
      excerpt: 'Explore the fundamentals of music production, from composition to mixing and mastering.',
      date: '2023-12-15',
      readTime: '10 min',
      tags: ['Music', 'Production', 'Audio'],
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop',
      content: `# The Art of Music Production
  
  Music production is a blend of technical skill and creative artistry. Let's explore the key aspects of creating professional-quality music.
  
  ## Essential Steps in Music Production
  
  1. Composition
     - Melody writing
     - Chord progression
     - Song structure
  
  2. Recording
     - Microphone techniques
     - Room acoustics
     - Signal chain
  
  3. Mixing
     - EQ
     - Compression
     - Effects
  
  4. Mastering
     - Frequency balance
     - Stereo width
     - Loudness
  `
    },
    {
      id: 4,
      title: 'System Design: Building Scalable Applications',
      excerpt: 'Learn the principles of designing large-scale distributed systems with real-world examples.',
      date: '2023-12-10',
      readTime: '12 min',
      tags: ['System Design', 'Architecture', 'Backend'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      content: `# System Design: Building Scalable Applications
  
  ## Introduction
  
  Building scalable applications requires careful consideration of various factors. Let's explore the key principles and patterns.
  
  ## Key Components
  
  | Component | Purpose |
  |-----------|---------|
  | Load Balancer | Distributes incoming traffic |
  | Cache | Improves response time |
  | Database | Stores application data |
  
  \`\`\`javascript
  // Example of a scalable service
  class UserService {
    constructor() {
      this.cache = new Cache();
      this.db = new Database();
    }
  
    async getUser(id) {
      // Try cache first
      let user = await this.cache.get(id);
      if (!user) {
        // If not in cache, get from DB
        user = await this.db.findUser(id);
        // Store in cache for future requests
        await this.cache.set(id, user);
      }
      return user;
    }
  }
  \`\`\`
  `
    }
  ];
  