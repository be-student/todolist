import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectComplete,
  selectNotComplete,
  selectTasks,
} from "../slice/taskSlice";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
const TodoList = ({ filter, sort }) => {
  const todoList = useAppSelector(selectTasks);
  const checkComplete = useAppSelector(selectComplete);
  const checkNotComplete = useAppSelector(selectNotComplete);
  const sortedTodo = useMemo(() => {
    return [...todoList].filter(filter).sort(sort);
  }, [filter, sort, todoList]);
  return (
    <div className={styles.todoListBox}>
      {todoList &&
        sortedTodo.map((todoItem) => {
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
