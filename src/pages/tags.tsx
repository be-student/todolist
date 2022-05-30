import type { NextPage } from "next";
import { useAppSelector } from "../app/hooks";
import { selectTags } from "../features/slice/taskSlice";
const IndexPage: NextPage = () => {
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
            }}
          >
            {tag}
          </div>
        );
      })}
    </span>
  );
};

export default IndexPage;
