import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>

      <br />
      <Link to="/user">User Page</Link>
      <br />
      <Link to="/admin">Admin Page</Link>
      <br />
      <Link to="/trainer">Trainer Page</Link>
    </section>
  );
};

export default LinkPage;
