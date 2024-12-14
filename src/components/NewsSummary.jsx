import { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsSummary.css';
import { calculateReadingTime } from '../utils/readingTime';

function NewsSummary() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const categories = ['general', 'business', 'sports', 'entertainment'];
  const API_KEY = 'd1fa94c434944df08ff0d89ecd740d66';

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      let allHeadlines = [];
      
      for (const category of categories) {
        try {
          const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
              country: 'us',
              category: category,
              pageSize: 3,
              apiKey: API_KEY
            }
          });
          const headlines = response.data.articles.map(article => ({
            title: article.title,
            category: category,
            content: article.content,
            readingTime: calculateReadingTime(article.content || article.description)
          }));
          allHeadlines = [...allHeadlines, ...headlines];
        } catch (error) {
          console.error(`Error fetching ${category} news:`, error);
        }
      }
      
      setSummaries(allHeadlines);
      setLoading(false);
    };

    fetchAllNews();
  }, []);

  const speak = (text) => {
   window.speechSynthesis.cancel();
   
   const utterance = new SpeechSynthesisUtterance(text);
   
   // Force initialize voices
   const initVoices = () => {
       const voices = window.speechSynthesis.getVoices();
       
       // Top feminine voices ranked by naturalness
       const preferredVoices = [
           'Google US English Female',
           'en-US-AriaNeural',
           'Microsoft Zira',
           'Samantha',
           'Victoria'
       ];
       
       console.log("Available voices:", voices.map(v => v.name)); // For debugging
       
       const selectedVoice = voices.find(voice => 
           preferredVoices.some(preferred => 
               voice.name.includes(preferred)
           )
       );
       
       if (selectedVoice) {
           console.log("Selected voice:", selectedVoice.name); // For debugging
           utterance.voice = selectedVoice;
       }
       
       // Maximum feminine settings
       utterance.pitch = 1.9;     // Super high pitch
       utterance.rate = 0.80;     // Gentle pace
       utterance.volume = 0.9;    // Clear volume
       
       window.speechSynthesis.speak(utterance);
   };

   // Ensure voices are loaded
   if (window.speechSynthesis.getVoices().length > 0) {
       initVoices();
   } else {
       window.speechSynthesis.onvoiceschanged = initVoices;
   }
   
   utterance.onstart = () => setIsSpeaking(true);
   utterance.onend = () => setIsSpeaking(false);
};


  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSpeakClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const summaryText = summaries
        .map(item => `${item.title} (${item.category})`)
        .join('. ');

      const fullText = `Hey hey! I'm Aria, your snazzy news buddy, here to serve up the latest scoop! It's ${getCurrentDate()}, and dear, we have some juicy headlines for you. Buckle up—here comes the news train! ${summaryText}. Thanks a ton, and have an absolutely epic day ahead! You know, assuming you're not tuning in at bedtime—because then, uh, sweet dreams instead!`;
      
      speak(fullText);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Gathering the latest headlines...</h3>
      </div>
    );
  }

  const summaryText = summaries
    .map(item => `${item.title} (${item.category})`)
    .join('. ');

    if (loading) {
      return (
        <div className="loading">
          <h3>Gathering the latest headlines...</h3>
        </div>
      );
    }
  
    return (
      <div className="summary-container">
        <h2>Today's News Overview</h2>
        <div className="summary-paragraph">
          <p>
            Hey hey! I'm Aria, your snazzy news buddy, here to serve up the latest scoop! 
            It's {getCurrentDate()}, and dear, we have some juicy headlines for you. 
            Buckle up—here comes the news train!
          </p>
          
          <div className="headlines-container">
            {summaries.map((item, index) => (
              <div key={index} className="headline-item">
                <p className="headline-text">{item.title} ({item.category})</p>
                <span className="reading-time">⏱️ {item.readingTime} min read</span>
              </div>
            ))}
          </div>
          
          <p>
            Thanks a ton, and have an absolutely epic day ahead! 
            You know, assuming you're not tuning in at bedtime—because then, uh, sweet dreams instead!
          </p>
        </div>
  
        <button 
          className="speak-button" 
          onClick={handleSpeakClick}
          aria-label={isSpeaking ? "Stop speaking" : "Start speaking"}
        >
          {isSpeaking ? '🔇 Stop Aria' : '🔊 Let Aria Speak!'}
        </button>
      </div>
    );
  }
  
  export default NewsSummary;