import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { PlusButton } from "../components/Button";
import Modal from "../features/modal/Modal";
import TodoList from "../features/todoList/TodoList";

const IndexPage: NextPage = () => {
  const [modal, setModal] = useState<Boolean>(false);
  const [id, setId] = useState<number>(0);
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
          setModal(true);
        }}
      />
      <TodoList type={null} setId={setId} />
      {modal && <Modal setModal={setModal} />}
    </div>
  );
};

export default IndexPage;
