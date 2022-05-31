import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  TodoItemButton,
  TodoItemButton2,
  TodoItemDescriptionLayout,
  TodoItemLayout,
} from "./TodoComponents";
import { inThreeDay } from "../utilities/date";
import { Description } from "../modal/Description";
import { setId, setModal } from "../redux/modalSlice";
import { addFilter } from "../redux/pageSlice";
import { checkTask, deleteTask, selectTags } from "../redux/taskSlice";
import { StyledTag } from "../components/StyledComponents";

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
    <TodoItemLayout>
      <TodoItemDescriptionLayout>
        <Checkbox />
        {/* <input
          type="checkbox"
          onChange={() => {
            dispatch(checkTask(todoItem.id));
          }}
          checked={todoItem.complete}
        /> */}
        {isUrgent && (<UrgentLabel />)}
        {/* <div
          onClick={() => {
            setDescription(true);
          }}
          style={{
            textDecoration: todoItem.complete ? "line-through" : "none",
          }}
        >
          {emergency ? "[긴급함]" : ""}
          {todoItem.title}
        </div> */}
        <TodoItemButton2>
          <TodoItemButton onClick={onEdit(todoItem.id)}>edit</TodoItemButton>
          <TodoItemButton
            onClick={() => {
              const result = confirm("정말로 삭제하시겠습니까?");
              if (result) {
                dispatch(deleteTask(todoItem.id));
              }
            }}
          >
            delete
          </TodoItemButton>
        </TodoItemButton2>
      </TodoItemDescriptionLayout>
      <span>
        {todoItem.tag.map((tag: string) => (
          <StyledTag
            color={tags[tag].color}
            background-color={tags[tag].backgroundColor}
            key={tag}
            onClick={() => dispatch(addFilter(tag))}
          >
            {tag}
          </StyledTag>
        ))}
      </span>
      {description && (
        <Description setDescription={setDescription} todoItem={todoItem} />
      )}
    </TodoItemLayout>
  );
};
export default TodoItem;
