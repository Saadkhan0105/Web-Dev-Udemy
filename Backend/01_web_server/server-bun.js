import {serve} from "bun";

serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
          return new Response("Hello Ice-tea!", { status: 200 });
        } else if (url.pathname === "/about") {
          return new Response("Hello My name is Saad Khan.", { status: 200 });
        } else {
          return new Response("404 Not Found", { status: 404 });
        }
    },
    port: 4000,
    hostname: '127.0.0.1'
})