import React from "react";

function MovieDetail(props) {
  console.log(props.casts);
  return (
    <div>
      <img src={props.image} />
      <h1>{props.name}</h1>
      <h1>{props.director}</h1>
      <h3>casts</h3>

      {/* Casts: {props.casts.cast1} , {props.casts.cast2} */}
      <p>{props.synopsis}</p>
    </div>
  );
}

export default MovieDetail;
