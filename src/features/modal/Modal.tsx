import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector, useInput } from "../../app/hooks";
import styles from "./Modal.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  addTask,
  editTag,
  editTask,
  selectTags,
  selectTasks,
} from "../slice/taskSlice";
import { clearId, selectId, setId, setModal } from "../slice/modalSlice";
const Modal = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  const id = useAppSelector(selectId);
  const title = useInput("");
  const tasks = useAppSelector(selectTasks);
  const [tag, setTag] = useState<Array<string>>([]);
  const tagInput = useInput("");
  const [bg, setBg] = useState<string>("#FFFFFF");
  const [color, setColor] = useState<string>("#000000");
  const [goalAt, setGoalAt] = useState<Date>(new Date());
  const description = useInput("");
  const [complete, setComplete] = useState<boolean>(false);
  const onClose = () => {
    const result = confirm(
      "정말로 닫으시겠습니까? 저장되지 않은 데이터는 삭제됩니다"
    );
    // const result = true;
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
          tag,
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
          tag,
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
      setTag(tasks[index].tag);
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

        <div className={styles.Button}>
          <span>Tag</span>
          <input
            type="text"
            value={tagInput.value}
            onChange={tagInput.onChange}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
          <button
            onClick={() => {
              if (tagInput.value === "") {
                alert("enter tag name");
                return;
              }
              dispatch(
                editTag({
                  title: tagInput.value,
                  color: color,
                  backgroundColor: bg,
                })
              );
              if (tag.find((tag) => tag === tagInput.value) === undefined) {
                setTag([...tag, tagInput.value]);
              }
            }}
          >
            save
          </button>
        </div>
        <div className={styles.Button}>
          <span>Example</span>
          <span
            style={{
              color: color,
              backgroundColor: bg,
              boxSizing: "border-box",
              padding: "0 0.5rem",
              marginRight: "0.5rem",
              borderRadius: "5px",
            }}
          >
            {tagInput.value}
          </span>
        </div>
        <div>
          {tag.map((Item) => {
            return (
              <span
                style={{
                  color: tags[Item].color,
                  backgroundColor: tags[Item].backgroundColor,
                  boxSizing: "border-box",
                  padding: "0 0.5rem",
                  marginRight: "0.5rem",
                  borderRadius: "5px",
                }}
                key={Item}
                onClick={() => {
                  setTag(tag.filter((item) => item !== Item));
                }}
              >
                {Item}
              </span>
            );
          })}
        </div>
        <button onClick={onSubmit}>submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
