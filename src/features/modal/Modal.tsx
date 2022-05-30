import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector, useInput } from "../../app/hooks";
import styles from "./Modal.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import moment from "moment";
import { addTask, editTask, selectTasks } from "../slice/taskSlice";
import { clearId, selectId, setId, setModal } from "../slice/modalSlice";
const Modal = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectId);
  const title = useInput("");
  const tasks = useAppSelector(selectTasks);
  const [goalAt, setGoalAt] = useState<Date>(new Date());
  const description = useInput("");
  const [complete, setComplete] = useState<boolean>(false);
  const onClose = () => {
    const result = confirm(
      "정말로 닫으시겠습니까? 저장되지 않은 데이터는 삭제됩니다"
    );
    if (result) {
      dispatch(setId(0));
      title.setValue("");
      description.setValue("");
      setComplete(false);
      setGoalAt(new Date());
      dispatch(setModal(false));
      return;
    }
  };
  const onSubmit = () => {
    if (title.value === "") {
      alert("please enter title");
      return;
    }
    if (description.value === "") {
      alert("please enter description");
      return;
    }
    if (id === 0) {
      dispatch(
        addTask({
          title: title.value,
          description: description.value,
          goalAt: goalAt.valueOf(),
          complete,
          tag: [],
        })
      );
    } else {
      dispatch(
        editTask({
          id,
          title: title.value,
          description: description.value,
          goalAt: goalAt.valueOf(),
          complete,
          tag: [],
        })
      );
    }
    dispatch(setModal(false));
    dispatch(clearId());
  };
  useEffect(() => {
    if (id !== 0) {
      const index = tasks.findIndex((task) => task.id === id);
      title.setValue(tasks[index].title);
      description.setValue(tasks[index].description);
      setComplete(tasks[index].complete);
      setGoalAt(new Date(tasks[index].goalAt));
    }
  }, [id, tasks]);
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
        <div className={styles.Button}>
          <span>Description </span>
          <input
            value={description.value}
            onChange={description.onChange}
            type="text"
            required
          />
        </div>
        <div className={styles.Button}>
          <span>Goal</span>
          <div>
            <DatePicker
              selected={goalAt}
              onChange={(date: SetStateAction<Date>) => setGoalAt(date)}
            />
          </div>
        </div>

        <div className={styles.Button}>
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
        <button onClick={onSubmit}>submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
