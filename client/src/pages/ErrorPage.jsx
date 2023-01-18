import React from "react";
import Nav from "../components/Navbar/Nav";

const ErrorPage = () => {
  return (
    <>
      <Nav />
      <main>
        <h1>An error occurred</h1>
        <h2>404 Not Found!</h2>
      </main>
    </>
  );
};

export default ErrorPage;
