import { useAppSelector } from "../../app/hooks";
import { selectTasks } from "../task/taskSlice";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
const TodoList = ({ type, setId }) => {
  const todoList = useAppSelector(selectTasks);
  return (
    <div className={styles.todoListBox}>
      {todoList &&
        todoList.map((todoItem) => {
          return <TodoItem key={todoItem.id} todoItem={todoItem} />;
        })}
    </div>
  );
};
export default TodoList;
