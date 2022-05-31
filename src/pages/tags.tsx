import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { Filter } from "../features/components/Filter";
import {
  addFilter,
  clearFilter,
  selectFilter,
} from "../features/redux/pageSlice";
import { deleteTag, selectTags } from "../features/redux/taskSlice";
import { StyledTagPage } from "../features/components/StyledComponents";

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
          <StyledTagPage
            key={tag}
            color={tags[tag].color}
            background-color={tags[tag].backgroundColor}
            onClick={() => dispatch(addFilter(tag))}
          >
            {tag}
            <button
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
          </StyledTagPage>
        );
      })}
    </span>
  );
};

export default IndexPage;
