import { useEffect, useState } from "react";
import styles from "./ArticleList.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArticleItem from "../ArticleItem";
import ConfirmationModal from "../../components/confirmation";
import EditModal from "../../components/modal";
import { articlesHeader } from "../../utilities/helpers";
import Header from "../../components/header";

export const ArticleList = ({ fetchedArticles }) => {
    const [articles, setArticles] = useState(fetchedArticles);
    const [sortOrder, setSortOrder] = useState({});
    const navigate = useNavigate();
    const { state } = useLocation();
    const [deleteArticleId, setDeleteArticleId] = useState(null);
    const [editArticle, setEditArticle] = useState(null);

    const toggleSortOrder = (column) => {
        const newSortOrder = {
            ...sortOrder,
            [column]: !sortOrder[column] || sortOrder[column] === "asc" ? "desc" : "asc",
        };

        const sortedArticles = [...articles].sort((a, b) => {
            let first = a[column];
            let second = b[column];

            if (column === "time") {
                first = first ? new Date(first) : new Date(0); //set common starting point fot timestamps if no value (January 1, 1979)
                second = second ? new Date(second) : new Date(0);
            }
            if (first < second) return newSortOrder[column] === "asc" ? -1 : 1;
            if (first > second) return newSortOrder[column] === "asc" ? 1 : -1;
            return 0;
        });

        setSortOrder(newSortOrder);
        setArticles(sortedArticles);
    };

    useEffect(() => {
        localStorage.setItem("articles", JSON.stringify(articles));
    }, [articles]);

    useEffect(() => {
        document.title = "Articles"
        console.log("here")
        if (state?.newArticle) {
            const updatedArticles = [...articles, state.newArticle];
            setArticles(updatedArticles);

            // Clean location state
            navigate("/");
        }
    }, []);

    const mapHeaderTitleToField = {
        "Title": "title",
        "Created At": "time",
        "Descriptions": "body",
        "Author": "userId"
    };

    const generateHeader = () => (
        <tr>
            {articlesHeader.map((header, idx) => (
                <th key={idx} onClick={() => toggleSortOrder(mapHeaderTitleToField[header.name])}>
                    {header.name}
                    {console.log(header.sortable)}

                    {
                        header.sortable &&
                        <>

                            {!sortOrder[mapHeaderTitleToField[header.name]] ? <span>&#8645;</span> : sortOrder[mapHeaderTitleToField[header.name]] === "asc" ? <span>&#8595;</span> : <span>&#8593;</span>}
                        </>
                    }

                </th>
            ))}
        </tr>
    );

    const handleAddArticle = () => {
        navigate("new");
    };

    const removeArticle = () => {
        const filtered = articles.filter((val) => val.id !== deleteArticleId);

        setArticles(filtered);
        hideConfirmationModal();
    };

    const handleEditArticle = (article) => {
        const newArticles = articles.map((val) => (val.id === article.id ? article : val));

        setArticles(newArticles);
        hideEditModal();
    };

    const hideConfirmationModal = () => {
        setDeleteArticleId(null);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteArticleId(id);
    };

    const hideEditModal = () => {
        setEditArticle(null);
    };

    const showEditModal = (article) => {
        setEditArticle(article);
    };

    if (!articles) {
        return "Loading...";
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
