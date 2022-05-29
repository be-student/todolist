import { useState } from "react";
import { useInput } from "../../app/hooks";
import styles from "./Modal.module.css";

const Modal = ({ setModal }) => {
  const title = useInput("");
  const [goalAt, setGoalAt] = useState<Date>(new Date());
  const description = useInput("");
  const [complete, setComplete] = useState<boolean>(false);
  return (
    <div className={styles.ModalWrapper}>
      <div className={styles.ModalItem}>
        <h1 className={styles.Title}>Task</h1>
        <div className={styles.}>
          <span>Title </span>
          <input
            value={title.value}
            onChange={title.onChange}
            type="text"
            required
          />
        </div>
        <div>
          <span>Description </span>
          <input
            value={description.value}
            onChange={description.onChange}
            type="text"
            required
          />
        </div>
        <div>
          <span>Goal </span>
          <DatePicker selected={goalAt} onChange={(date) => setGoalAt(date)} />
        </div>

        <div>
          <span>Complete </span>
          <input
            checked={complete}
            onChange={() => {
              setComplete((prev) => !prev);
            }}
            type="checkbox"
          />
        </div>

        <div>
          <span>Tag </span>
          <input type="checkbox" />
        </div>

        <button
          type="button"
          onClick={() => {
            setModal(false);
          }}
          className={styles.Button}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;

//id: 1,
//title: "first Task",
//description: "task description",
//tag: ["tag1", "tag2"],
//complete: false,
//createdAt: new Date(),
//goalAt: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 2),
