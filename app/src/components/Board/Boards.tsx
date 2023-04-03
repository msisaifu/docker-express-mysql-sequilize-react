import Button from "../../components/Button";
import { Link } from "react-router-dom";

type Props = {
  boards: Array<Board>;
};
type Board = {
  id: string;
  name: string;
};
const Boards = ({ boards }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {boards.map((board: Board, index) => (
        <Link to={`/boards/${board.id}`} key={board.id}>
          <div
            key={index}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              {board.name}
            </h5>
            <div className="flex justify-between mb-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                Created by: {"Name will be place here"}
              </span>
            </div>
            <Button btn_text="Join in to the board" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
