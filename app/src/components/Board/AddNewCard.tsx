import { useContext, useRef, useState } from "react";
import Button from "../Button";
import Cards from "../../models/cards";
import BoardContext from "../../contexts/BoardViewContext";
type Board = {
  [key: string]: any;
};
type Props = {
  id: string;
};

const AddNewCard = ({ id }: Props) => {
  const { board, setBoard }: Board = useContext(BoardContext);
  const input_elem = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let title = input_elem.current?.value;
    setLoading(true);
    Cards.create({ title: title, list_id: id })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          if (input_elem.current) {
            input_elem.current.value = "";
            let _board = { ...board };
            let listIndex = board?.board_lists.findIndex(
              (item: any) => item.id == id
            );
            if (_board["board_lists"][listIndex].cards) {
              _board["board_lists"][listIndex].cards.push(res);
            } else {
              _board["board_lists"][listIndex].cards = [res];
            }

            setBoard(_board);
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 border-t-2 border-gray-300 py-2"
    >
      <input
        ref={input_elem}
        type="text"
        id="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w- p-2.5"
        placeholder="Task name"
        required
      />
      <Button
        loading={loading}
        btn_text="Add task"
        classes="bg-green-400 hover:bg-green-300 w-auto"
      />
    </form>
  );
};

export default AddNewCard;
