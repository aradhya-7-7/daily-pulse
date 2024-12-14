import { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css';

function NewsFeed({ category }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: 'us',
            category: category,
            apiKey: 'd1fa94c434944df08ff0d89ecd740d66' // Replace with your NewsAPI key
          }
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="news-grid">
      {news.map((article, index) => (
        <article key={index} className="news-card">
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}
          <div className="news-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default NewsFeed;
