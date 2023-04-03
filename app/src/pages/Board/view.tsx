import Layout from "../../components/Layout/Layout";
import Lists from "../../components/Board/Lists";
import { useEffect, useState } from "react";
import BoardModel from "../../models/boards";

const Board = () => {
  const [board, setBoard] = useState([]);
  function load() {
    // BoardModel.getAll()
    //   .then((res) => {
    //     setBoards(res);
    //     console.log("res", res);
    //     console.log(boards);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
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
