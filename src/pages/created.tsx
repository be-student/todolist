import type { NextPage } from "next";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PlusButton } from "../components/Button";
import { Filter } from "../features/header/Filter";
import Modal from "../features/modal/Modal";
import { selectModal, setModal } from "../features/slice/modalSlice";
import { selectFilter } from "../features/slice/pageSlice";
import { selectTags, tasks } from "../features/slice/taskSlice";
import TodoList from "../features/todoList/TodoList";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const filter = useAppSelector(selectFilter);
  const tags = useAppSelector(selectTags);
  const filterFunction = useCallback(
    (item) => {
      if (filter === "") {
        return () => true;
      }
      return item.tag.find((element) => element === filter);
    },
    [filter]
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {filter && (
        <Filter
          filter={filter}
          color={tags[filter].color}
          bg={tags[filter].backgroundColor}
        />
      )}

      <PlusButton
        onClick={() => {
          dispatch(setModal(true));
        }}
      />
      <TodoList
        filter={filterFunction}
        sort={(a: tasks, b: tasks) => a.createdAt - b.createdAt}
      />
      {modal && <Modal />}
    </div>
  );
};

export default IndexPage;
