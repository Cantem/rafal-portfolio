import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import withApollo from "hoc/withApollo";
import { useLazyGetUser } from "apollo/actions";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data && !hasResponse) {
    if (data.user && !user) {
      setUser(data.user);
    }

    setHasResponse(true);
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          RP
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link mr-3">
              PORTFOLIOS
            </AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">
              FORUM
            </AppLink>
            <AppLink href="/cv" className="mr-3 nav-link">
              CV
            </AppLink>
          </Nav>
          {/* <Nav>
            <AppLink href="/login" className="mr-3 nav-link">
              SIGN IN
            </AppLink>
            <AppLink href="/register" className="mr-3 btn btn-primary">
              SING UP
            </AppLink>
          </Nav> */}
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-4">Welcome {user.username}</span>
                  <AppLink href="/login" className="nav-link btn btn-danger">
                    SIGN OUT
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href="/login" className="mr-3 nav-link">
                    SIGN IN
                  </AppLink>
                  <AppLink href="/register" className="mr-3 btn btn-primary">
                    SIGN UP
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(AppNavbar);
