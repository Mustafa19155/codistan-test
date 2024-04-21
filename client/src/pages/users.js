import AddUserModal from "../components/AddUserModal";
import Table from "../components/Table";
import React, { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const Page = () => {
  const [showModal, setshowModal] = useState(false);

  return (
    <>
      <AddUserModal showModal={showModal} setshowModal={setshowModal} />
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-bold">Users</p>
          <button
            className="bg-purple text-white p-2 rounded-md w-[140px]"
            onClick={() => setshowModal(true)}
          >
            Add User
          </button>
        </div>
        <Table />
      </div>
    </>
  );
};

export default Page;
