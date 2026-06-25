import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../services/newsApi";

function NewsWidget() {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const article = articles[index];

  useEffect(() => {
    fetchTopHeadlines()
      .then((headlines) => {
        setArticles(headlines);
        setIndex(0);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  useEffect(() => {
    if (!articles.length) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % articles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (error) {
    return <article className="news-widget widget-message">{error}</article>;
  }

  if (!article) {
    return <article className="news-widget widget-message">Loading news...</article>;
  }

  return (
    <article className="news-widget">
      <div className="news-image" style={{ backgroundImage: `url(${article.image})` }}>
        <div>
          <h2>{article.title}</h2>
          <strong>{article.date || article.source}</strong>
          {article.date && <span>{article.source}</span>}
        </div>
      </div>
      <p>{article.text}</p>
    </article>
  );
}

export default NewsWidget;
