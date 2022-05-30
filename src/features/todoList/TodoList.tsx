import { useAppSelector } from "../../app/hooks";
import {
  selectComplete,
  selectNotComplete,
  selectTasks,
  tasks,
} from "../slice/taskSlice";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
const TodoList = ({ filter }) => {
  const todoList = useAppSelector(selectTasks);
  const checkComplete = useAppSelector(selectComplete);
  const checkNotComplete = useAppSelector(selectNotComplete);
  return (
    <div className={styles.todoListBox}>
      {todoList &&
        [...todoList].sort(filter).map((todoItem) => {
          if (checkComplete && todoItem.complete === false) {
            return;
          }
          if (checkNotComplete && todoItem.complete === true) {
            return;
          }
          return <TodoItem key={todoItem.id} todoItem={todoItem} />;
        })}
    </div>
  );
};
export default TodoList;
