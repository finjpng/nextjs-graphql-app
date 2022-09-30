import { useMutation } from "@apollo/client";
import { Router, useRouter } from "next/router";
import React from "react";
import { DELETE_USER_MUTATION } from "../db/queries";
import styles from "../styles/Home.module.css";

function Users(props) {
  const router = useRouter();
  function showDetailHandler() {
    router.push("/" + props.id);
  }
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });
  function deleteData() {}
  return (
    <div key={props.id} className={styles.card}>
      <h2>{props.id}</h2>
      <h3 key={props.id}>
        <a key={props.id} href="#country-name"></a>
        {props.name}
      </h3>
      <p>username: {props.username}</p>
      <div>
        <button onClick={showDetailHandler}>Get ID</button>
        <button
          onClick={() => {
            deleteUser({ variables: { id: props.id } });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Users;
