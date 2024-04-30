/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";

const root = document.getElementById("root");
const searchQuery = new URLSearchParams(window.location.search);
console.log(searchQuery);
console.log(window.location.href);
render(() => <App />, root!);
