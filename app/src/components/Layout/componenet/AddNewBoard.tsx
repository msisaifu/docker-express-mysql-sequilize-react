import { useRef, useState, useContext } from "react";
import Button from "../../Button";
import AuthContext from "./../../../auth/AuthContext";
import Boards from "../../../models/boards";
import BoardContext from "../../../contexts/BoardContext";

const addNewBoard = () => {
  const { boards, setBoards } = useContext(BoardContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const board_elem = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let board_name = board_elem.current?.value;
    setLoading(true);
    Boards.create({ name: board_name, user_id: user.id })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setBoards([...boards, res]);
          if (board_elem.current) {
            board_elem.current.value = "";
          }
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        className="items-center justify-between hidden w-full gap-2 md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <input
          ref={board_elem}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w- p-2.5"
          placeholder="Board name"
          required
        />
        <Button
          loading={loading}
          btn_text="Create a new board"
          classes="bg-[#3b5998] hover:bg-[#3b5998]/90 w-auto"
        />
      </div>
    </form>
  );
};
export default addNewBoard;
