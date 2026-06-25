const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_CATEGORY = import.meta.env.VITE_NEWS_CATEGORY || "general";
const NEWS_COUNTRY = import.meta.env.VITE_NEWS_COUNTRY || "us";

const fallbackHeadlines = [
  {
    title: "Want to climb Mount Everest?",
    source: "2-20-2023 | 07:35 PM",
    date: "",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    text:
      "In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world's highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology, and the significant infrastructure provided by commercially guided expeditions that provide a veritable highway up the mountain for those willing to accept both the......",
  },
];

function formatArticleDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} | ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export async function fetchTopHeadlines() {
  if (!NEWS_API_KEY) {
    return fallbackHeadlines;
  }

  const params = new URLSearchParams({
    apiKey: NEWS_API_KEY,
    category: NEWS_CATEGORY,
    country: NEWS_COUNTRY,
    pageSize: "10",
  });

  const response = await fetch(`https://newsapi.org/v2/top-headlines?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch news.");
  }

  return (data.articles || [])
    .filter((article) => article.title && article.urlToImage && article.description)
    .map((article) => ({
      title: article.title,
      source: article.source?.name || "News",
      date: formatArticleDate(article.publishedAt),
      image: article.urlToImage,
      text: article.description,
    }));
}
