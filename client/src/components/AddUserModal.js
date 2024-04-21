import React, { useRef, useState } from "react";
import LocationIcon from "../assets/images/location.svg";
import moment from "moment";
import useClickOutside from "../hooks/useClickOutside";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;
const AddUserModal = ({ showModal, setshowModal }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState({ message: "", success: false });

  const ref = useRef();

  useClickOutside(ref, () => {
    setshowModal(false);
  });

  const [
    addUserMutation,
    { data: addUserData, error: addUserError, loading: addUserLoading },
  ] = useMutation(CREATE_USER);

  const handleAddUser = async () => {
    try {
      await addUserMutation({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      window.location.reload();
    } catch (e) {
      setmessage({ message: "email already exists", success: false });
      setTimeout(() => {
        setmessage({ message: "", success: false });
      }, 3000);
    }
  };

  return (
    <>
      <div
        className={`fixed ${
          showModal ? "z-20" : "-z-20 opacity-0"
        } top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center bg-[rgba(0,0,0,0.5)]`}
      >
        <div
          ref={ref}
          className={`bg-white rounded-lg w-[550px] max-w-[90vw] relative ${
            showModal ? "top-0" : "top-[100vh]"
          } duration-200`}
        >
          <div className="p-5 border-[#C6CBD3] border-b flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold text-center w-full">
                Add User
              </p>
            </div>
            <input
              type="text"
              value={name}
              className="bg-gray outline-none min-w-0 w-full p-3 rounded-lg"
              placeholder="name"
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray outline-none min-w-0 w-full p-3 rounded-lg"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="bg-gray outline-none min-w-0 w-full p-3 rounded-lg"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-5">
            <button
              className="bg-purple text-white p-2 rounded-md w-[140px]"
              onClick={() => setshowModal(false)}
              disabled={addUserLoading}
            >
              Cancel
            </button>
            <button
              className="bg-purple text-white p-2 rounded-md w-[140px]"
              onClick={() => {
                handleAddUser();
              }}
              disabled={addUserLoading}
            >
              {addUserLoading ? "Adding..." : "Add"}
            </button>
          </div>
          {message.message && (
            <div
              className={`${
                message.success ? "bg-green-200" : "bg-red-200"
              } p-2 rounded-md w-fit m-auto min-w-[150px] text-center mb-4`}
            >
              <p className="text-gray2">{message.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
