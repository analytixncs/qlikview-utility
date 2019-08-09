import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  background-color: slategray;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  height: 50px;
`;

const MenuItems = styled.ul`
  display: flex;
  margin: 15px;
  padding: 0;
`;

const MenuItem = styled.li`
  list-style-type: none;
`;

const MyNavLink = styled(NavLink)`
  color: ${props => (props.loc.includes(props.to) ? "red" : "blue")};
  background-color: ${props =>
    props.loc.includes(props.to) ? "darkgray" : "lightgray"};
  margin: 0 5px;
  padding: 5px;
  border: 1px solid black;
  text-decoration: none;
`;

function Header(props) {
  return (
    <NavBar>
      <MenuItems>
        <MenuItem>
          <MyNavLink loc={props.location.pathname} to="/vareditor">
            Variable Editor
          </MyNavLink>
        </MenuItem>
        <MenuItem>
          <MyNavLink loc={props.location.pathname} to="/groupeditor">
            Group Editor
          </MyNavLink>
        </MenuItem>
        <MenuItem>
          <MyNavLink loc={props.location.pathname} to="/settings">
            Settings
          </MyNavLink>
        </MenuItem>
      </MenuItems>
    </NavBar>
  );
}

export default withRouter(Header);
