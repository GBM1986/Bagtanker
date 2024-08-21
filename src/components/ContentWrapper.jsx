import React from 'react';

const ContentWrapper = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default ContentWrapper;
