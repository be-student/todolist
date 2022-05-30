import Link from "next/link";
import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/slice/taskSlice";
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
  const dispatch = useAppDispatch();
  const newTask = () => {
    const newItem = {
      title: "second Task",
      description: "task2 description",
      tag: ["tag2", "tag3"],
      complete: true,
      goalAt: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 2),
    };
    dispatch(addTask(newItem));
  };
  return (
    <button onClick={onClick} className={styles.plusButton}>
      + plus
    </button>
  );
};
