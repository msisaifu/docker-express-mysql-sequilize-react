import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import BoardContext from "../../contexts/BoardContext";
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

  const contextValue = {
    boards,
    setBoards,
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <BoardContext.Provider value={contextValue}>
        <Layout>
          <Boards boards={boards} />
        </Layout>
      </BoardContext.Provider>
    </div>
  );
};

export default Board;
