import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { DELETE_MOVIE_MUTATION, GET_MOVIES } from "../db/queries";

function Admin() {
  const { data, loading, refetch } = useQuery(GET_MOVIES);
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });
  return (
    <div>
      <table id="customers">
        <tr>
          <th>Movie Name</th>
          <th>Director</th>
          <th>Release</th>
          <th>Action</th>
        </tr>
        {data?.movies.map((movie) => (
          <tr>
            <td>{movie.name}</td>
            <td>{movie.director}</td>
            <td>{movie.release}</td>
            <td>
              {" "}
              <button
                onClick={() => {
                  deleteMovie({ variables: { id: props.id } });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Admin;
