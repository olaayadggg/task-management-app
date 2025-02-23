import React from "react";

const SideNav = ({ setNavLink }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark"
      style={{
        width: "250px",
        minHeight: "100vh",
        height: "100%",
        position: "sticky",
        top: 0,
      }}
    >
      <h3 className="mb-3 text-white">Task Manager</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            onClick={() => setNavLink("list")}
            className="nav-link text-white"
          >
            List View
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setNavLink("kanban")}
            className="nav-link text-white"
          >
            Kanban Board
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
