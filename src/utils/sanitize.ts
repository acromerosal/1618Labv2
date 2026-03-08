import DOMPurify from 'dompurify';

export const sanitize = (html: string): string => {
  return DOMPurify.sanitize(html);
};
