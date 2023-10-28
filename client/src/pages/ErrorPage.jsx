import Nav from "../components/Navbar/Nav";

const ErrorPage = () => {
  return (
    <>
      <Nav />
      <main className="text-center">
        <h1>An error occurred</h1>
        <h2>404 Not Found!</h2>
      </main>
    </>
  );
};

export default ErrorPage;
