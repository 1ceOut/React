import React from "react";
import { FaUserPlus } from "react-icons/fa";

const InviteIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
    >
      <FaUserPlus size={24} />
    </button>
  );
};

export default InviteIcon;
