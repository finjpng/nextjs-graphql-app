import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER_MUTATION, GET_ALL_USERS } from "../db/queries";

function AddPage() {
  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setName(capitalizeFirstLowercaseRest(event.target.value));
        }}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Nationality"
        onChange={(event) => {
          setNationality(event.target.value.toUpperCase());
        }}
      />

      <button
        onClick={() => {
          createUser({
            variables: {
              input: { name, username, age: Number(age), nationality },
            },
          });
          refetch();
        }}
      >
        Create User
      </button>
    </div>
  );
}

export default AddPage;
