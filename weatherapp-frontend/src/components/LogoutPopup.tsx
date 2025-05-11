import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { clearUser } from "../app/features/user/userSlice";

interface LogoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutPopup = ({ isOpen, onClose }: LogoutPopupProps) => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await client.clearStore();

    dispatch(clearUser());

    window.location.reload();

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-[#e5e7eb]/90 dark:bg-[#1c1c1e]/90 z-50">
      <div className="flex flex-col items-center border-1  bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 rounded-lg p-6 shadow-sm w-full h-full max-w-md max-h-45">
        <h2 className="text-2xl font-semibold mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="space-x-10 p-7">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer rounded-md border-1 hover:bg-gray-400 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer rounded-md border-1 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
