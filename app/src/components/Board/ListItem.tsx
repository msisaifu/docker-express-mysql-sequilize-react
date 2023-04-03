import Card from "./Card";
import AddNewList from "./AddNewList";
import UpdateList from "./UpdateList";
import Dropzone from "./Dropzone";
import BoardLists from "../../models/board_lists";
import BoardContext from "./../../contexts/BoardViewContext";
import { useContext, useState } from "react";
import AddNewCard from "./AddNewCard";

type Props = {
  list?: {
    id: number;
    title: string;
    cards?: [];
  };
};
type Board = {
  [key: string]: any;
};

function ListItem({ list }: Props) {
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const { board, setBoard }: Board = useContext(BoardContext);

  const cards = list?.cards?.map((card, index) => (
    <Card key={index} card={card} />
  ));
  const handleDelete = (id: any) => {
    BoardLists.delete(id)
      .then((res) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          let _board = { ...board };
          if (_board && _board?.board_lists) {
            let updated_list = _board.board_lists.filter(
              (item: any) => item.id !== id
            );
            _board.board_lists = updated_list;
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
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData("text", `${list?.id}`);
        e.dataTransfer.setData("list", `${list?.id}`);
      }}
      data-id={`list-${list?.id}`}
      draggable="true"
      className="bg-slate-200 min-w-[280px] rounded-md mr-3 list__item"
    >
      <Dropzone dropzone="list" />
      <div className="p-2 cursor-pointer">
        <div className="flex justify-between">
          {editForm && (
            <UpdateList
              id={list?.id}
              value={list?.title}
              setEditForm={setEditForm}
            />
          )}

          {list && list.id ? (
            <span hidden={editForm}>{list?.title}</span>
          ) : (
            <AddNewList />
          )}

          {!editForm && list && list.id && (
            <div>
              <span
                onClick={() => setEditForm(true)}
                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                Edit
              </span>
              <span
                onClick={() => handleDelete(list.id)}
                className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 mb-1 text-red-200 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                ) : (
                  "Delete"
                )}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          {list && list.id && <Dropzone dropzone="card" />}

          {cards?.length ? cards : null}

          {list && list.id && <AddNewCard id={list.id} />}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
