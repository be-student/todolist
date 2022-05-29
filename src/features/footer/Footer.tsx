import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  checkComplete,
  checkNotComplete,
  deleteCompletedTask,
  selectComplete,
  selectNotComplete,
} from "../task/taskSlice";
import styles from "./Footer.module.css";

const Footer = () => {
  const dispatch = useAppDispatch();
  const complete = useAppSelector(selectComplete);
  const notComplete = useAppSelector(selectNotComplete);
  return (
    <div className={styles.footerBox}>
      <div className={styles.footerItem}>
        미완료 일
        <input
          onChange={() => {
            dispatch(checkNotComplete());
          }}
          checked={notComplete}
          type="checkbox"
        ></input>
      </div>
      <div className={styles.footerItem}>
        완료된 일
        <input
          onChange={() => {
            dispatch(checkComplete());
          }}
          checked={complete}
          type="checkbox"
        ></input>
      </div>
      <button
        onClick={() => {
          dispatch(deleteCompletedTask());
        }}
        className={styles.footerItem}
      >
        제거 완료
      </button>
    </div>
  );
};
export default Footer;
