import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
