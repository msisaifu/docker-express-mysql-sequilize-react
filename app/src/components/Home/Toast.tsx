type Props = {
  message: string;
  type: string;
};
const Toast = ({ message, type }: Props) => {
  return (
    <div
      id="toast-top-right"
      className={`fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 ${
        type == "success" ? "bg-green-400" : "bg-red-400"
      }`}
      role="alert"
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
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;
