import type { NextPage } from "next";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { AddTaskButton } from "../features/components/Button";
import { Filter } from "../features/components/Filter";
import Modal from "../features/modal/Modal";
import { selectModal, setModal } from "../features/redux/modalSlice";
import { selectFilter } from "../features/redux/pageSlice";
import { selectTags, tasks } from "../features/redux/taskSlice";
import TodoList from "../features/todoList/TodoList";
import { PageLayout } from "../features/components/StyledComponents";

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
    <PageLayout>
      {filter && (
        <Filter
          filter={filter}
          color={tags[filter].color}
          bg={tags[filter].backgroundColor}
        />
      )}
      <AddTaskButton
        onClick={() => {
          dispatch(setModal(true));
        }}
      />

      <TodoList
        filter={filterFunction}
        sort={(a: tasks, b: tasks) => a.goalAt - b.goalAt}
      />
      {modal && <Modal />}
    </PageLayout>
  );
};

export default IndexPage;
