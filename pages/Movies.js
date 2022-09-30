import React from "react";
import styles from "../styles/Home.module.css";
import MovieItems from "./MovieItems";
import c from "./Movies.module.css";
import { Router, useRouter } from "next/router";

function Movies(props) {
  const router = useRouter();

  function showDetailHandler() {
    router.push("/" + props.id);
  }
  return (
    <div className={styles.grid}>
      {/* <h1>Please</h1> */}
      {/* {props?.movies?.map((movie) => {
        <MovieItems
          id={movie.id}
          name={movie.name}
          image={movie.image}
          release={movie.release}
          director={movie.director}
          synopsis={movie.synopsis}
        />;
      })} */}
      {/* {props?.movies?.map((movie) => {
        <h1>Name: {movie.name}</h1>;
      })} */}
      <div key={props.id} className={styles.card} onClick={showDetailHandler}>
        <h3 key={props.id}>
          <a key={props.id} href="#country-name"></a>
          <img src={props.image} className={c.image} />
          {props.name}
        </h3>
      </div>
    </div>
  );
}

export default Movies;
