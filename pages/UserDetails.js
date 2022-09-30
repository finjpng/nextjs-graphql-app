import React from "react";

function UserDetails(props) {
  return (
    <section>
      <h1>{props.name}</h1>

      <p>{props.username}</p>
    </section>
  );
}

export default UserDetails;
