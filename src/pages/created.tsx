import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PlusButton } from "../components/Button";
import Modal from "../features/modal/Modal";
import { selectModal, setModal } from "../features/slice/modalSlice";
import { selectFilter } from "../features/slice/pageSlice";
import { tasks } from "../features/slice/taskSlice";
import TodoList from "../features/todoList/TodoList";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const filter = useAppSelector(selectFilter);
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
