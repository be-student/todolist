import moment from "moment";
import { useAppSelector } from "../hooks/hooks";
import { selectTags } from "../redux/taskSlice";
import { StyledTag } from "../components/StyledComponents";
import { ModalItem, ModalWrapper } from "./ModalComponents";
export const Description = ({ todoItem, setDescription }) => {
  const tags = useAppSelector(selectTags);
  return (
    <ModalWrapper
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setDescription(false);
        }
      }}
    >
      <ModalItem>
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
            <StyledTag
              color={tags[tag].color}
              background-color={tags[tag].backgroundColor}
              key={tag}
            >
              {tag}
            </StyledTag>
          ))}
        </span>
        <button onClick={() => setDescription(false)}>Close</button>
      </ModalItem>
    </ModalWrapper>
  );
};
