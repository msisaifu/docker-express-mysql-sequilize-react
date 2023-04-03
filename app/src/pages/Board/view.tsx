import Layout from "../../components/Layout/Layout";
import Lists from "../../components/Board/Lists";
import { useEffect, useState } from "react";
import BoardModel from "../../models/boards";
import BoardViewContext from "../../contexts/BoardViewContext";
import { useParams } from "react-router-dom";
type Board = {
  id?: number;
  [key: string]: any;
};

const Board = () => {
  const params = useParams();
  const [board, setBoard] = useState<Board>({});
  let board_id = params.id;
  function load() {
    BoardModel.getOne(board_id)
      .then((res) => {
        console.log(res);
        setBoard(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    load();
  }, []);

  const contextValue = {
    board,
    setBoard,
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Layout>
        <BoardViewContext.Provider value={contextValue}>
          <Lists />
        </BoardViewContext.Provider>
      </Layout>
    </div>
  );
};

export default Board;
