"use client";
import React, { useEffect, useState } from "react";
import UpdownIcon from "../assets/images/up-down.svg";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useNavigation } from "react-router-dom";

const GET_USERS = gql`
  query Users($page: Int, $limit: Int, $sortBy: String) {
    users(page: $page, limit: $limit, sortBy: $sortBy) {
      users {
        name
        id
        email
      }
      hasNext
    }
  }
`;

const Table = () => {
  const LIMIT = 5;
  const [activeSort, setactiveSort] = useState("index");
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: {
      page: currentPage,
      limit: LIMIT,
      sortBy: activeSort ? activeSort : undefined,
    },
  });
  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <table className="border-separate border-spacing-y-3 w-full mt-3 min-w-[600px]">
        <thead>
          <tr>
            <th
              className="p-3 border-b font-semibold text-start cursor-pointer"
              onClick={() => setactiveSort("index")}
            >
              <div className="flex items-center gap-2">
                #{activeSort == "index" && <img src={UpdownIcon} />}
              </div>
            </th>
            <th
              className="p-3 border-b font-semibold text-start cursor-pointer"
              onClick={() => setactiveSort("name")}
            >
              <div className="flex items-center gap-2">
                Name{activeSort == "name" && <img src={UpdownIcon} />}
              </div>
            </th>
            <th
              className="p-3 border-b font-semibold text-start cursor-pointer"
              onClick={() => setactiveSort("_id")}
            >
              <div className="flex items-center gap-2">
                ID{activeSort == "_id" && <img src={UpdownIcon} />}
              </div>
            </th>
            <th
              className="p-3 border-b font-semibold text-start cursor-pointer"
              onClick={() => setactiveSort("email")}
            >
              <div className="flex items-center gap-2">
                Email{activeSort == "email" && <img src={UpdownIcon} />}
              </div>
            </th>
            <th className="p-3 border-b font-semibold text-start cursor-pointer"></th>
          </tr>
        </thead>
        <tbody>
          {data.users.users.map((event, index) => (
            <Row key={event._id} event={event} index={index} />
          ))}
        </tbody>
      </table>
      <div>
        <div className="flex justify-end items-center mt-5 gap-5">
          {currentPage > 1 && (
            <button
              className="bg-gray2 text-white p-2 w-[100px] rounded-md"
              onClick={() => {
                if (currentPage > 1) setcurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
          )}
          {data.users.hasNext && (
            <button
              className="bg-gray2 text-white p-2 w-[100px] rounded-md"
              onClick={() => {
                setcurrentPage(currentPage + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;

const Row = ({ event, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <tr
        className="bg-white cursor-pointer text-gray2 hover:bg-gray transition-all duration-200 ease-in-out"
        onClick={() => {
          navigate(`/users/${event.id}`);
        }}
      >
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b border-l rounded-l-[15px] font-semibold">
          {index < 9 ? "0" : ""}
          {index + 1}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-medium">
          {event.name}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-medium text-sm">
          {event.id}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b border-r rounded-r-[15px]">
          {event.email}
        </td>
      </tr>
    </>
  );
};
