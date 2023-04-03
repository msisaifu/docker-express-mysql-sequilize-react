import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import Boards from "../../components/Board/Boards";
import BoardModel from "../../models/boards";

const Board = () => {
  const [boards, setBoards] = useState([]);
  function load() {
    BoardModel.getAll()
      .then((res) => {
        setBoards(res);
        console.log("res", res);
        console.log(boards);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Layout>
        <Boards boards={boards} />
      </Layout>
    </div>
  );
};

export default Board;
