import axios from "axios";
import { headers } from "next/headers";

function message() {
  //   return "Even when a programmer writes a syntactically correct program, the program may still error at runtime or execution";
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  axios.get("https://icanhazdadjoke.com", config).then((res) => {
    document.getElementById("joke").innerHTML = res.data.joke;
  });
}

export default message;
