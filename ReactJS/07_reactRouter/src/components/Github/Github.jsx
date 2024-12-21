import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //     fetch('https://api.github.com/users/Saadkhan0105')
  //         .then((response) => response.json())
  //         .then((data) => {
  //             console.log(data);
  //             setData(data);
  //         });
  // }, []);

  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      Github followers: {data.followers}
      <img
        src={data.avatar_url}
        alt="GitHub profile"
        width={200}
        className="mx-auto rounded-full mt-4"
      />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/Saadkhan0105");
  return response.json();
};
