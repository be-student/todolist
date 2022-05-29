import { useMemo } from "react";
import { useAppDispatch } from "../../app/hooks";
import { inThreeDay } from "../../utilities/date";
import { deleteTask } from "../task/taskSlice";
import styles from "./TodoItem.module.css";
const TodoItem = ({ todoItem }) => {
  const dispatch = useAppDispatch();
  const emergency = inThreeDay(todoItem.goalAt);
  // const emergency = useMemo(() => {
  //   return inThreeDay(todoItem.goalAt);
  // }, [todoItem, todoItem.goalAt, inThreeDay]);
  return (
    <div className={styles.todoBox}>
      <input type="checkbox" checked={todoItem.complete} />
      <div
        style={{ textDecoration: todoItem.complete ? "line-through" : "none" }}
      >
        {todoItem.goalAt && emergency ? "[긴급함]" : ""}
        {todoItem.title}
      </div>
      <div className={styles.button}>
        <button className={styles.buttonItem}>edit</button>
        <button
          className={styles.buttonItem}
          onClick={() => {
            dispatch(deleteTask(todoItem.id));
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
