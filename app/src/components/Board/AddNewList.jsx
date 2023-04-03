import Button from "../Button";

const AddNewList = () => {
  return (
    <form onSubmit>
      <div className="flex flex-col w-full gap-2" id="mobile-menu-2">
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w- p-2.5"
          placeholder="List name"
          required
        />
        <Button
          btn_text="Add new list"
          classes="bg-[#3b5998] hover:bg-[#3b5998]/90 w-auto"
        />
      </div>
    </form>
  );
};

export default AddNewList;
