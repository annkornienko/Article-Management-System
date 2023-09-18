import React, { useEffect, useState } from "react";
import styles from "./ArticleList.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArticleItem from "../ArticleItem";
import ConfirmationModal from "../../components/confirmation";
import EditModal from "../../components/modal";
import { articlesHeader } from "../../utilities/helpers"
import Header from "../../components/header";

export const ArticleList = ({ fetchedArticles }) => {
    const [articles, setArticles] = useState(fetchedArticles);
    // const [isFetching, setIsFetching] = useState(false);
    const [order, setOrder] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const [deleteArticleId, setDeleteArticleId] = useState(null)
    const [editArticle, setEditArticle] = useState(null)


    const toggleSortOrder = () => {
        setOrder((sortOrder) => (sortOrder === "asc" ? "desc" : "asc"));
    };

    useEffect(() => {
        localStorage.setItem("articles", JSON.stringify(articles));
    }, [articles]);

    useEffect(() => {
        if (state?.newArticle) {
            const updatedArticles = [...articles, state.newArticle];
            setArticles(updatedArticles);

            //clean location state
            navigate('/');
        }
    }, []);


    const generateHeader = () => {
        const headerCells = articlesHeader.map((header, idx) => (
            <th key={idx} onClick={toggleSortOrder}>
                {header.name}
                {header.sortable && (
                    <a href="#">
                        {!order ? <span>&#8679;</span> : order === "asc" ? <span>&#8679;</span> : <span>&#x21E7;</span>}
                    </a>
                )}
            </th>
        ));

        return <tr>{headerCells}</tr>;
    };

    const handleAddArticle = () => {
        navigate("new");
    };


    const removeArticle = () => {
        const filtered = articles.filter((val) => val.id !== deleteArticleId)

        setArticles(filtered);
        hideConfirmationModal()
    }

    const handleEditArticle = (article) => {
        console.log({ article });
        const newArticles = articles.map((val) => val.id === article.id ? article : val)

        setArticles(newArticles);
        hideEditModal()
    }

    const hideConfirmationModal = () => {
        setDeleteArticleId(null)
    }

    const handleDeleteConfirmation = (id) => {
        setDeleteArticleId(id)
    }

    const hideEditModal = () => {
        setEditArticle(null)
    }

    const showEditModal = (article) => {
        setEditArticle(article)
    }


    if (!articles) {
        return "Loading..."
    }
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.rowContainer}>
                <h2 className={styles.title}>Articles</h2>
                <button onClick={handleAddArticle} className={styles.addButton}>
                    &#43; Add
                </button>
            </div>
            <table className={styles.table}>
                <thead className="App">{generateHeader()}</thead>
                <tbody>
                    {articles.map((article) => (
                        <ArticleItem key={article.id} article={article} removeArticle={handleDeleteConfirmation} editArticle={showEditModal} />
                    ))}
                </tbody>
            </table>
            {deleteArticleId && <ConfirmationModal onConfirm={removeArticle} onCancel={hideConfirmationModal} />}
            {editArticle && <EditModal onConfirm={handleEditArticle} onCancel={hideEditModal} initialValue={editArticle} />}
        </div>
    );
};

// export default ArticleList;
