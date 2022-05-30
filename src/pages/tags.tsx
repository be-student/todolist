import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addFilter } from "../features/slice/pageSlice";
import { deleteTag, selectTags } from "../features/slice/taskSlice";
const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  return (
    <span>
      {Object.keys(tags).map((tag) => {
        return (
          <div
            key={tag}
            style={{
              color: tags[tag].color,
              backgroundColor: tags[tag].backgroundColor,
              boxSizing: "border-box",
              padding: "0.5rem 0.5rem",
              margin: "0.5rem 0",
              overflow: "no-wrap",
              marginRight: "0.5rem",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => dispatch(addFilter(tag))}
          >
            {tag}
            <button
              onClick={(event) => {
                event.stopPropagation();
                dispatch(deleteTag(tag));
              }}
            >
              제거하기
            </button>
          </div>
        );
      })}
    </span>
  );
};

export default IndexPage;
