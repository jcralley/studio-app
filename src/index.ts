// Import and register all components
import './components/my-counter';
import './components/my-button';
import './components/my-card';
import './components/my-greeting';
import './components/my-todo-list';

// Optional: Add global styles or initialization logic
console.log('🚀 Lit TypeScript Webpack project initialized!');

// Example of dynamic component creation
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');

  // You can add any initialization logic here
  const counters = document.querySelectorAll('my-counter');
  console.log(`Found ${counters.length} counter components`);
});
