import { useMemo, useState } from "react";
import { useAppDispatch, useInput } from "../../app/hooks";
import styles from "./Modal.module.css";
import Calendar from "react-calendar";
import moment from "moment";
import { addTask } from "../task/taskSlice";
const Modal = ({ setModal }) => {
  const dispatch = useAppDispatch();
  const title = useInput("");
  const [goalAt, setGoalAt] = useState<Date>(new Date());
  const description = useInput("");
  const [complete, setComplete] = useState<boolean>(false);
  const Selector: JSX.Element = useMemo(
    () => <Calendar value={goalAt} onChange={setGoalAt}></Calendar>,
    [Calendar, goalAt, setGoalAt]
  );
  const onSubmit = () => {
    if (title.value === "") {
      alert("please enter title");
      return;
    }
    if (description.value === "") {
      alert("please enter description");
      return;
    }
    dispatch(
      addTask({
        title: title.value,
        description: description.value,
        goalAt: goalAt.valueOf(),
        Complete: complete,
        tag: [],
      })
    );
    setModal(false);
  };
  return (
    <div className={styles.ModalWrapper}>
      <div className={styles.ModalItem}>
        <h1 className={styles.Title}>Task</h1>
        <div className={styles.Button}>
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
        <div style={{ height: "300px" }}>
          <span>Goal {moment(goalAt).format("YYYY-MM-DD")}</span>
          <Calendar value={goalAt} onChange={setGoalAt}></Calendar>
        </div>

        <div>
          <span>Complete</span>
          <input
            checked={complete}
            onChange={() => {
              setComplete((prev) => !prev);
            }}
            type="checkbox"
          />
        </div>

        <div>
          <span>Tag</span>
        </div>
        <div></div>
        <div>
          <button onClick={onSubmit}>submit</button>
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
