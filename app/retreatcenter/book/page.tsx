import LeadsColumn from "@/components/LeadsColumn"
import styles from "./styles.module.css"
const BookPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainRow}>
                <LeadsColumn />
            </div>
        </div>
    )
}


export default BookPage