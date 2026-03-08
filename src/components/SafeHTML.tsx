import React from 'react';
import { sanitize } from '../utils/sanitize';

interface SafeHTMLProps {
  html: string;
  className?: string;
  as?: React.ElementType;
}

const SafeHTML: React.FC<SafeHTMLProps> = ({ html, className, as: Tag = 'div' }) => {
  const sanitizedHTML = sanitize(html);

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default SafeHTML;
