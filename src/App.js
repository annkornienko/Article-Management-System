import React, { useEffect, useState } from "react";
import { fetchArticles } from "./api";
import { ArticleList } from './pages/ArticleList';

function App() {
  const [articles, setArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("articles");

    if (localData) {
      setArticles(JSON.parse(localData));
      setIsFetching(false);
    } else {
      const fetchData = async () => {
        try {
          const data = await fetchArticles();

          localStorage.setItem("articles", JSON.stringify(data));

          setArticles(data);
          setIsFetching(false);
        } catch (error) {
          console.error('Error fetching articles:', error);
          setIsFetching(false);
        }
      };

      fetchData();
    }
  }, [])

  if (isFetching || !articles) {
    return "Loading...";
  }

  return (
    <div className="App">
      <ArticleList fetchedArticles={articles} />
    </div>
  );
}

export default App;
