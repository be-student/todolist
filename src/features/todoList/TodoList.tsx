import { useMemo } from "react";
import { useAppSelector } from "../hooks/hooks";
import {
  selectComplete,
  selectNotComplete,
  selectTasks,
} from "../redux/taskSlice";
import { TodoListLayout } from "./TodoComponents";
import TodoItem from "./TodoItem";
const TodoList = ({ filter, sort }) => {
  const todoList = useAppSelector(selectTasks);
  const checkComplete = useAppSelector(selectComplete);
  const checkNotComplete = useAppSelector(selectNotComplete);
  const sortedTodo = useMemo(() => {
    return [...todoList].filter(filter).sort(sort);
  }, [filter, sort, todoList]);
  return (
    <TodoListLayout>
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
    </TodoListLayout>
  );
};
export default TodoList;
