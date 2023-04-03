import { useContext, useRef, useState } from "react";
import Button from "../Button";
import BoardLists from "../../models/board_lists";
import { useParams } from "react-router-dom";
import BoardContext from "./../../contexts/BoardViewContext";
type Board = {
  [key: string]: any;
};
type Props = {
  id?: string;
  value?: string;
  setEditForm: Function;
};
const UpdateList = ({ id, value, setEditForm }: Props) => {
  const { board }: Board = useContext(BoardContext);
  const input_elem = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let title = input_elem.current?.value;
    setLoading(true);
    BoardLists.update(id, { title: title })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          if (input_elem.current) {
            let _board = { ...board };
            _board.board_lists.map((item: any) => {
              if (item.id === id) {
                item.title = title;
              }
              return item;
            });
            setEditForm(false);
          }
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
      <input
        ref={input_elem}
        defaultValue={value}
        type="text"
        id="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w- p-2.5"
        placeholder="List name"
        required
      />
      <div className="w-full flex justify-between">
        <Button
          loading={loading}
          btn_text="Update"
          classes="bg-[#3b5998] hover:bg-[#3b5998]/90 w-auto"
        />

        <button
          onClick={() => setEditForm(false)}
          type="submit"
          className={`w-auto bg-red-400 hover:bg-red-300  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateList;
