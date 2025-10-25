import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = 'e7eb5aa8f9ea4ce0bb5f21776e4d236b';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          console.error("Error fetching news:", data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>My News App</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading news...</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="news-article">
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news" className="news-image" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
