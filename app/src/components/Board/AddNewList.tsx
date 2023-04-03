import { useRef, useState } from "react";
import Button from "../Button";
import BoardLists from "../../models/board_lists";
import { useParams } from "react-router-dom";

const AddNewList = () => {
  const params = useParams();
  const input_elem = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let title = input_elem.current?.value;
    let board_id = params.id;
    setLoading(true);
    BoardLists.create({ title: title, board_id })
      .then((res) => {
        console.log("res", res);
        setTimeout(() => {
          setLoading(false);
          if (input_elem.current) {
            input_elem.current.value = "";
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full gap-2" id="mobile-menu-2">
        <input
          ref={input_elem}
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w- p-2.5"
          placeholder="List name"
          required
        />
        <Button
          loading={loading}
          btn_text="Add new list"
          classes="bg-[#3b5998] hover:bg-[#3b5998]/90 w-auto"
        />
      </div>
    </form>
  );
};

export default AddNewList;
