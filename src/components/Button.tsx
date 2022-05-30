import Link from "next/link";
import styles from "./Button.module.css";

export const HeaderButton = ({ children, to }) => {
  return (
    <div className={styles.headerButtonWrapper}>
      <Link href={to} className={styles.headerButton}>
        {children}
      </Link>
    </div>
  );
};

export const PlusButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.plusButton}>
      + plus
    </button>
  );
};
