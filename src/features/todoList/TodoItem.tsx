import moment from "moment";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { inThreeDay } from "../../utilities/date";
import { setId, setModal } from "../slice/modalSlice";
import { addFilter } from "../slice/pageSlice";
import { checkTask, deleteTask, selectTags } from "../slice/taskSlice";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todoItem }) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  const [description, setDescription] = useState<boolean>(false);
  const emergency = inThreeDay(todoItem.goalAt);
  const onEdit = (id: number) => () => {
    dispatch(setModal(true));
    dispatch(setId(id));
  };
  return (
    <div className={styles.todoBox}>
      <div className={styles.todoItem}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(checkTask(todoItem.id));
          }}
          checked={todoItem.complete}
        />
        <div
          onClick={() => {
            setDescription(true);
          }}
          style={{
            textDecoration: todoItem.complete ? "line-through" : "none",
          }}
        >
          {emergency ? "[긴급함]" : ""}
          {todoItem.title}
        </div>
        <div className={styles.button}>
          <button onClick={onEdit(todoItem.id)} className={styles.buttonItem}>
            edit
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => {
              const result = confirm("정말로 삭제하시겠습니까?");
              // const result = true;
              if (result) {
                dispatch(deleteTask(todoItem.id));
              }
            }}
          >
            delete
          </button>
        </div>
      </div>
      <span>
        {todoItem.tag.map((tag: string) => (
          <span
            style={{
              color: tags[tag].color,
              backgroundColor: tags[tag].backgroundColor,
              boxSizing: "border-box",
              padding: "0 0.5rem",
              marginRight: "0.5rem",
              borderRadius: "5px",
            }}
            key={tag}
            onClick={() => dispatch(addFilter(tag))}
          >
            {tag}
          </span>
        ))}
      </span>
      {description && (
        <div className={styles.ModalWrapper}>
          <div className={styles.ModalItem}>
            <h2>Title</h2>
            <span>{todoItem.title}</span>
            <h2>Description</h2>
            <span>{todoItem.description}</span>
            <h2>Complete</h2>
            <span>{todoItem.complete ? "true" : "false"}</span>
            <h2>Goal</h2>
            <span>{moment(todoItem.goalAt).format("YYYY-MM-DD")}</span>
            <h2>Created At</h2>
            <span>{moment(todoItem.createdAt).format("YYYY-MM-DD")}</span>
            <h2>Tag</h2>
            <span>
              {todoItem.tag.map((tag: string) => (
                <span
                  style={{
                    color: tags[tag].color,
                    backgroundColor: tags[tag].backgroundColor,
                    boxSizing: "border-box",
                    padding: "0 0.5rem",
                    marginRight: "0.5rem",
                    borderRadius: "5px",
                  }}
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </span>
            <button onClick={() => setDescription(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TodoItem;
