import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      name
      id
      email
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      name
    }
  }
`;

const UserDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [updateSuccess, setupdateSuccess] = useState(false);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    variables: { userId: params.id },
  });

  const [
    updateUserMutation,
    {
      data: updateMutationData,
      error: updateMutationError,
      loading: updateMutationLoading,
    },
  ] = useMutation(UPDATE_USER);

  const [
    deleteUserMutation,
    {
      data: deleteMutationData,
      error: deleteMutationError,
      loading: deleteMutationLoading,
    },
  ] = useMutation(DELETE_USER, {
    variables: { deleteUserId: params.id },
  });

  useEffect(() => {
    if (queryData && queryData.user) {
      setname(queryData.user.name);
      setemail(queryData.user.email);
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      navigate("/users");
    }
    refetchUser();
  }, []);

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation({
        variables: {
          updateUserId: params.id,
          input: {
            name: name,
            email: email,
          },
        },
      });
      setupdateSuccess(true);
      setTimeout(() => {
        setupdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation({
        variables: {
          deleteUserId: params.id,
        },
      });
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex gap-5 items-center flex-wrap">
        <input
          type="text"
          value={name}
          className="bg-white outline-none min-w-0 w-full p-3 rounded-lg"
          placeholder="name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="bg-white outline-none min-w-0 w-full p-3 rounded-lg"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-5 justify-end">
        <button
          className="bg-red-600 text-white rounded-md p-2 w-[140px]"
          disabled={deleteMutationLoading || updateMutationLoading}
          onClick={handleDeleteUser}
        >
          {deleteMutationLoading ? "Deleting..." : "Delete"}
        </button>
        <button
          className="bg-blue text-white rounded-md p-2 w-[140px]"
          onClick={handleUpdateUser}
          disabled={updateMutationLoading || deleteMutationLoading}
        >
          {updateMutationLoading ? "Updating..." : "Update"}
        </button>
      </div>
      {updateSuccess && (
        <p className="text-green-500 font-bold text-center">
          User updated successfully
        </p>
      )}
    </div>
  );
};

export default UserDetails;
