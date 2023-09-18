import styles from "./components.module.css";

const ConfirmationModal = ({ onCancel, onConfirm }) => (
    <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
            <p>Are you sure you want to delete this item?</p>
            <button className={styles.cancelButton} onClick={onCancel}>
                Cancel
        </button>
            <button className={styles.confirmButton} onClick={onConfirm}>
                Confirm
        </button>
        </div>
    </div>
);

export default ConfirmationModal;
