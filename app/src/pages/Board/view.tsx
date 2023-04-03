import Layout from "../../components/Layout/Layout";
import Lists from "../../components/Board/Lists";
import { useEffect, useState } from "react";
import BoardModel from "../../models/boards";
import { useParams } from "react-router-dom";

const Board = () => {
  const params = useParams();
  const [board, setBoard] = useState([]);
  let board_id = params.id;
  function load() {
    BoardModel.getOne(board_id)
      .then((res) => {
        setBoard(res);
        console.log("res", res);
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
        <Lists board={board} />
      </Layout>
    </div>
  );
};

export default Board;
