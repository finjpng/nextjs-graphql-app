import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_SEARCH } from "../db/queries";
import TestHome from "./TestHome";

function SearchPage() {
  function showDetailHandler() {
    router.push("/TestHome");
  }
  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const [textSearched, setTextSearched] = useState();

  const [fetchData, { data: textSearchedData, error: searchError }] =
    useLazyQuery(GET_SEARCH, {
      fetchPolicy: "no-cache",
    });
  console.log(textSearched);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          setTextSearched(capitalizeFirstLowercaseRest(event.target.value));
        }}
      />
      <button
        onClick={() => {
          fetchData({
            variables: {
              name: textSearched,
            },
          });
        }}
      >
        {" "}
        Fetch Data{" "}
      </button>
      <div>
        {textSearchedData && (
          // <div>
          //   <h1>Name: {textSearchedData.search.name}</h1>
          // </div>

          <TestHome name={textSearchedData.search.name} />
        )}
        {searchError && <h1>There was an error fetching the data</h1>}
      </div>
    </div>
  );
}

export default SearchPage;
