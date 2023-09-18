import { useState } from "react";
import modalStyles from "./components.module.css";
import styles from "../pages/AddNewArticle/AddNewArticle.module.css";
import CreatableSelect from 'react-select/creatable';
import { formatCurrentDate } from "../utilities/helpers";

const EditModal = ({ onCancel, onConfirm, initialValue }) => {
    const [title, setTitle] = useState(initialValue.title);
    const [content, setContent] = useState(initialValue.body);
    const [tags, setTags] = useState(initialValue.tags);

    const tagsFull = [
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "Tag3", label: "Tag3" }
    ];

    const handleSubmit = (e) => {
        const time = formatCurrentDate();

        const obj = {
            title,
            body: content,
            tags,
            time,
            id: initialValue.id
        }

        onConfirm(obj);
    }

    return (
        <div className={modalStyles.modalBackdrop}>
            <div className={styles.editModal, modalStyles.modal}>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title
                        <span className="styles.required">*</span>
                        </label>

                        <input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" name="title" required ></input>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="content">Content
                        <span className="styles.required">*</span>
                        </label>
                        <textarea value={content}
                            onChange={(e) => setContent(e.target.value)} name="content" required></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Tags</label>
                        <CreatableSelect onChange={(selectedTags) => setTags(selectedTags)}
                            value={tags} isMulti options={tagsFull} className={styles.multiSelect} />
                    </div>
                    <div className={styles.formGroup}>
                        <button className={modalStyles.cancelButton} onClick={onCancel}>
                            Cancel
                        </button>
                        <button className={modalStyles.confirmButton} onClick={handleSubmit}>
                            Save
                        </button>
                    </div>

                </form>




            </div>
        </div>
    );
};

export default EditModal;

// import styles from "../AddNewArticle/AddNewArticle.module.css";
// import CreatableSelect from 'react-select/creatable';
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import { formatCurrentDate, hashCode } from "../../utilities/helpers";

// const EditArticle = (initialValue) => {
//     const navigate = useNavigate();

//     const titleRef = useRef(initialValue.title);
//     const contentRef = useRef(initialValue.body);
//     const tagsRef = useRef(initialValue.tags);

//     const tags = [
//         { value: "Tag1", label: "Tag1" },
//         { value: "Tag2", label: "Tag2" },
//         { value: "Tag3", label: "Tag3" }
//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         const title = titleRef.current.value;
//         const content = contentRef.current.value;
//         const tags = tagsRef.current?.props.value;
//         const time = formatCurrentDate();
//         // const id = hashCode(title + content)


//         const obj = {
//             title,
//             content,
//             tags,
//             time,
//             id: Math.random()
//         }

//         setTimeout(() =>
//             navigate("/", {
//                 state: { newArticle: obj }
//             }), 1000)
//     }

//     return (
//         <div className={styles.container}>
//             <h1>New Article</h1>
//             <form className={styles.form} onSubmit={handleSubmit}>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="title">Title
//                         <span className="styles.required">*</span>
//                     </label>
//                     <input ref={titleRef} type="text" name="title" required></input>
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="content">Content
//                         <span className="styles.required">*</span>
//                     </label>
//                     <textarea ref={contentRef} name="content" required></textarea>
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label>Tags</label>
//                     <CreatableSelect ref={tagsRef} isMulti options={tags} className={styles.multiSelect} />
//                 </div>
//                 <button className={styles.addButton}>Create</button>
//             </form>
//         </div>
//     )

// }

// export default EditArticle;
