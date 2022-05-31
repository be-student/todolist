import { useAppDispatch } from "../hooks/hooks";
import { StyledTag } from "./StyledComponents";
import { clearFilter } from "../redux/pageSlice";

export const Filter = ({ filter, color, bg }) => {
  const dispatch = useAppDispatch();
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
