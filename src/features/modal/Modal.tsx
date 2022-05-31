import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useInput } from "../hooks/hooks";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  addTask,
  editTag,
  editTask,
  selectTags,
  selectTasks,
} from "../redux/taskSlice";
import { clearId, selectId, setId, setModal } from "../redux/modalSlice";
import { StyledTag } from "../components/StyledComponents";
import {
  ModalButton,
  ModalItem,
  ModalTitle,
  ModalWrapper,
} from "./ModalComponents";
const Modal = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(selectTags); //적용되어있는 모든 태그

  const id = useAppSelector(selectId);
  const title = useInput("");
  const description = useInput("");
  const tasks = useAppSelector(selectTasks);
  const [complete, setComplete] = useState<boolean>(false);
  const [goalAt, setGoalAt] = useState<Date>(new Date());
  const [tagNow, setTag] = useState<Array<string>>([]); //현재 작업중인 task 의 태그

  const tagInput = useInput(""); //input
  const [bg, setBg] = useState<string>("#FFFFFF");
  const [color, setColor] = useState<string>("#000000");

  const onClose = useCallback(() => {
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
  }, [dispatch, title, description, complete, goalAt]);
  const onSubmit = useCallback(() => {
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
          tag: tagNow,
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
          tag: tagNow,
        })
      );
    }
    dispatch(setModal(false));
    dispatch(clearId());
  }, [title, description, goalAt, complete, tagNow]);
  const tagGenerator = useCallback(() => {
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
    if (tagNow.find((tag) => tag === tagInput.value) === undefined) {
      setTag([...tagNow, tagInput.value]);
    }
  }, [tagInput, color, bg, tagNow]);
  useEffect(() => {
    if (id !== 0) {
      const index = tasks.findIndex((task) => task.id === id);
      title.setValue(tasks[index].title);
      description.setValue(tasks[index].description);
      setComplete(tasks[index].complete);
      setGoalAt(new Date(tasks[index].goalAt));
      setTag(tasks[index].tag);
    }
  }, [id]);
  return (
    <ModalWrapper
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalItem>
        <ModalTitle>Task</ModalTitle>
        <ModalButton>
          <span>Title </span>
          <input
            value={title.value}
            onChange={title.onChange}
            type="text"
            required
          />
        </ModalButton>
        <ModalButton>
          <span>Description </span>
          <input
            value={description.value}
            onChange={description.onChange}
            type="text"
            required
          />
        </ModalButton>
        <ModalButton>
          <span>Goal</span>
          <div>
            <DatePicker
              selected={goalAt}
              onChange={(date: SetStateAction<Date>) => setGoalAt(date)}
            />
          </div>
        </ModalButton>

        <ModalButton>
          <span>Complete</span>
          <input
            checked={complete}
            onChange={() => {
              setComplete((prev) => !prev);
            }}
            type="checkbox"
          />
        </ModalButton>

        <ModalButton>
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
          <button onClick={tagGenerator}>save</button>
        </ModalButton>
        <ModalButton>
          <span>Example</span>
          <StyledTag color={color} background-color={bg}>
            {tagInput.value}
          </StyledTag>
        </ModalButton>
        <div>
          {tagNow.map((Item) => {
            return (
              <StyledTag
                color={tags[Item].color}
                background-color={tags[Item].backgroundColor}
                key={Item}
                onClick={() => {
                  setTag(tagNow.filter((item) => item !== Item));
                }}
              >
                {Item}
              </StyledTag>
            );
          })}
        </div>
        <button onClick={onSubmit}>submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </ModalItem>
    </ModalWrapper>
  );
};
export default Modal;
