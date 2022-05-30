import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PlusButton } from "../components/Button";
import Modal from "../features/modal/Modal";
import { selectModal, setModal } from "../features/slice/modalSlice";
import { tasks } from "../features/slice/taskSlice";
import TodoList from "../features/todoList/TodoList";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

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
      <TodoList filter={(a: tasks, b: tasks) => a.goalAt - b.goalAt} />
      {modal && <Modal />}
    </div>
  );
};

export default IndexPage;
