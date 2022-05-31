import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Filter } from "../features/header/Filter";
import {
  addFilter,
  clearFilter,
  selectFilter,
} from "../features/slice/pageSlice";
import { deleteTag, selectTags } from "../features/slice/taskSlice";
import { StyledTag } from "../components/styledComponents";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const tags = useAppSelector(selectTags);
  return (
    <span>
      {filter && (
        <Filter
          filter={filter}
          color={tags[filter].color}
          bg={tags[filter].backgroundColor}
        />
      )}
      {Object.keys(tags).map((tag) => {
        return (
          <StyledTag
            key={tag}
            color={tags[tag].color}
            background-color={tags[tag].backgroundColor}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => dispatch(addFilter(tag))}
          >
            {tag}
            <button
              style={{ margin: "0.5rem 0.5rem" }}
              onClick={(event) => {
                event.stopPropagation();
                if (filter === tag) {
                  dispatch(clearFilter());
                }
                dispatch(deleteTag(tag));
              }}
            >
              제거하기
            </button>
          </StyledTag>
        );
      })}
    </span>
  );
};

export default IndexPage;
