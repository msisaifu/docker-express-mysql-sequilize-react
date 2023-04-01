import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Lists from "../../components/Board/Lists";

const Board = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Layout>
        <Lists />
      </Layout>
    </div>
  );
};

export default Board;
