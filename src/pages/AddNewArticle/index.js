import styles from "./AddNewArticle.module.css";
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { formatCurrentDate } from "../../utilities/helpers";
import Header from "../../components/header";

const AddNewArticle = () => {
    const navigate = useNavigate();

    const titleRef = useRef();
    const contentRef = useRef();
    const tagsRef = useRef();

    const tags = [
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "Tag3", label: "Tag3" }
    ];

    useEffect(() => {
        document.title = "New Article"
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const title = titleRef.current.value;
        const body = contentRef.current.value;
        const tags = tagsRef.current?.props.value;
        const time = formatCurrentDate();

        const obj = {
            title,
            body,
            tags,
            time,
            id: Math.random()
        }

        setTimeout(() =>
            navigate("/", {
                state: { newArticle: obj }
            }), 1000)
    }

    const handleBackButton = () => {
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <Header />
            <a onClick={handleBackButton} className={styles.backLink}>Back</a>
            <h1>New Article</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title
                        <span className="styles.required">*</span>
                    </label>
                    <input ref={titleRef} type="text" name="title" required></input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">Content
                        <span className="styles.required">*</span>
                    </label>
                    <textarea ref={contentRef} name="content" required></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label>Tags</label>
                    <CreatableSelect ref={tagsRef} isMulti options={tags} className={styles.multiSelect} />
                </div>
                <div className={styles.formGroup}>
                    <button className={styles.addButton}>Create</button>
                </div>
            </form>
        </div>
    )

}

export default AddNewArticle;