// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded News API key
  const apiKey = "e7eb5aa8f9ea4ce0bb5f21776e4d236b";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          console.error("Error fetching news:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="App">
      <h1>My News App</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="articles-container">
          {articles.length === 0 ? (
            <p>No news articles available.</p>
          ) : (
            articles.map((article, index) => (
              <div className="article" key={index}>
                <img
                  src={
                    article.urlToImage
                      ? article.urlToImage.replace("http://", "https://")
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={article.title}
                  className="article-image"
                />
                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
