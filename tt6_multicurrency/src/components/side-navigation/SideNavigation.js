import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Sidenav, Sidebar, Nav, Navbar } from "rsuite";

import AngleLeft from "@rsuite/icons/legacy/AngleLeft";
import AngleRight from "@rsuite/icons/legacy/AngleRight";
import { AuthContext } from "../context/auth-context";

import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import Columns from "@rsuite/icons/legacy/Columns";
import DashboardIcon from "@rsuite/icons/Dashboard";
import ViewsAuthorizeIcon from "@rsuite/icons/ViewsAuthorize";
import "./SideNavigation.css";

const SideNavigation = () => {
  const NavBarData = [
    {
      event: "1",
      trigger: "hover",
      title: "Wallet",
      icon: <Columns />,
      placement: "rightStart",
      data: [
        {
          event: "1-2",
          title: "View My Wallets",
          icon: <ViewsAuthorizeIcon />,
          path: "/wallet",
        },
      ],
    },
    {
      event: "2",
      trigger: "hover",
      title: "Transactions",
      icon: <Columns />,
      placement: "rightStart",
      data: [
        {
          event: "2-2",
          title: "Create Transaction",
          icon: <CreditCardPlusIcon />,
          path: "/transaction",
        },
        {
          event: "2-3",
          title: "View all Transactions",
          icon: <DashboardIcon />,
          path: "/transaction",
        },
      ],
    },
  ];

  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    let sidebar = document.querySelector(".sidebarx");
    if (sidebar === null) {
      console.log("error");
    } else {
      if (!expand) sidebar.style.removeProperty("overflow-y");
      else sidebar.style.overflowY = "scroll";
    }
  }, [expand]);

  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            {expand ? <AngleLeft /> : <AngleRight />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };

  return (
    <React.Fragment>
      <Sidebar className="sidebarx" width={230} collapsible>
        <Sidenav
          expanded={expand}
          defaultOpenKeys={["1", "2", "3", "4", "5"]}
          appearance="subtle"
        >
          <Sidenav.Body>
            <Nav>
              {NavBarData.map((item, idx) => {
                return (
                  <Dropdown
                    key={idx}
                    eventKey={item.event}
                    trigger={item.trigger}
                    title={item.title}
                    icon={item.icon}
                    placement={item.placement}
                  >
                    {item.data &&
                      item.data.map((child, idx) => {
                        return (
                          <Dropdown.Item
                            key={idx}
                            eventKey={child.event}
                            icon={child.icon}
                            onSelect={() => {
                              navigate(child.path, { state: location });
                            }}
                          >
                            {child.title}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown>
                );
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>
    </React.Fragment>
  );
};

export default SideNavigation;
