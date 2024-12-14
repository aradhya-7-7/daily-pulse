export const calculateReadingTime = (text) => {
   const wordsPerMinute = 200;
   const words = text?.trim().split(/\s+/).length || 0;
   const time = Math.ceil(words / wordsPerMinute);
   return time;
 };
 