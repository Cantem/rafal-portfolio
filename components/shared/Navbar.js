import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import withApollo from "hoc/withApollo";
import { useLazyGetUser } from "apollo/actions";

const AppLink = ({ children, className, href, as }) => (
  <Link href={href} as={as}>
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

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
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
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-2">WELCOME {user.username}</span>
                  <NavDropdown
                    className="mr-3"
                    title="MANAGE"
                    id="basic-nav-dropdown"
                  >
                    {(user.role === "admin" || user.role === "instructor") && (
                      <>
                        <AppLink
                          href="/portfolios/new"
                          className="dropdown-item"
                        >
                          CREATE PORTFOLIO
                        </AppLink>
                        <AppLink
                          href="/instructor/[id]/dashboard"
                          as={`/instructor/${user._id}/dashboard`}
                          className="dropdown-item"
                        >
                          DASHBAORD
                        </AppLink>
                      </>
                    )}
                    <NavDropdown.Item href="#action/3.2">
                      ACTION1
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      ACTION2
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">LINK</NavDropdown.Item>
                  </NavDropdown>
                  <AppLink href="/logout" className="nav-link btn btn-danger">
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
