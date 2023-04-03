import { useState, useContext } from "react";
import Button from "../Button";
import Cards from "../../models/cards";
import BoardContext from "../../contexts/BoardViewContext";

type Props = {
  showDrawer: boolean;
  setShowDrawer: Function;
  card: {
    id: string;
    title: string;
    description: string;
    expiray_date: Date;
  };
};
type Board = {
  [key: string]: any;
};

const CardDetails = ({ showDrawer, setShowDrawer, card }: Props) => {
  const { board, setBoard }: Board = useContext(BoardContext);
  const [data, setData] = useState(card);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    Cards.update(card.id, data)
      .then((res) => {
        setTimeout(() => {
          let _board = { ...board };
          let listIndex = board?.board_lists.findIndex(
            (item: any) => item.id == card.list_id
          );

          _board.board_lists[listIndex].cards.map((item: any) => {
            if (item.id === card.id) {
              item.title = data.title;
              item.expiray_date = data.expiray_date;
            }
            return item;
          });
          console.log(_board);
          setBoard(_board);

          setUpdateLoading(false);
          setShowDrawer(false);
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setUpdateLoading(false);
        }, 1000);
      });
  };

  const handleDelete = (id: any) => {
    setDeleteLoading(true);
    Cards.delete(id)
      .then((res) => {
        setTimeout(() => {
          let _board = { ...board };
          let listIndex = board?.board_lists.findIndex(
            (item: any) => item.id == card.list_id
          );

          let filter_card = _board.board_lists[listIndex]?.cards?.filter(
            (item: any) => item.id !== id
          );
          _board.board_lists[listIndex].cards = filter_card;
          setBoard(_board);

          setShowDrawer(false);
          setDeleteLoading(false);
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setDeleteLoading(false);
        }, 1000);
      });
  };

  return (
    <div
      className={`fixed top-0 right-0 z-40 ${
        showDrawer ? "w-96" : "w-0"
      }  h-screen pt-20 transition-all -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 relative">
        <div>
          <h5
            id="drawer-left-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            Details
          </h5>
          <button
            onClick={() => setShowDrawer(false)}
            type="button"
            className="top-0 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm absolute  inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              defaultValue={data.title}
              onChange={handleChange}
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={data.description}
              onChange={handleChange}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="expiray_date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expiration date
            </label>
            <input
              type="date"
              id="expiray_date"
              name="expiray_date"
              defaultValue={
                data.expiray_date &&
                new Date(data.expiray_date)?.toISOString()?.substr(0, 10)
              }
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button
              loading={updateLoading}
              btn_text="Update"
              classes="bg-[#3b5998] hover:bg-[#3b5998]/90 w-auto"
            />

            <Button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(card.id);
              }}
              loading={deleteLoading}
              btn_text="Delete"
              classes="bg-red-400 hover:bg-red-300 w-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDetails;
