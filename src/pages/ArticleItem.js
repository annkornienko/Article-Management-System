import styles from "../pages/ArticleList/ArticleList.module.css"

const ArticleItem = ({ article, removeArticle, editArticle }) => {
    return (
        <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.userId}</td>
            <td className={styles.time}>{article.time}</td>
            <td>{article.body}</td>
            <td>
                <button onClick={() => editArticle(article)} className={styles.buttonLikeLink}>Edit</button>
                <button onClick={() => removeArticle(article.id)} className={styles.buttonLikeLink}>Delete</button>
            </td>
        </tr>
    )
}

export default ArticleItem