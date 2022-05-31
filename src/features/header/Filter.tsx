import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StyledTag } from "../../components/styledComponents";
import { clearFilter } from "../slice/pageSlice";
import { selectTags } from "../slice/taskSlice";

export const Filter = ({ filter, color, bg }) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  if (filter === undefined || "") {
    return;
  }
  return (
    <div onClick={() => dispatch(clearFilter())}>
      <StyledTag color={color} background-color={bg}>
        {filter}
      </StyledTag>
      {filter ? "태그 필터 제거" : ""}
    </div>
  );
};
