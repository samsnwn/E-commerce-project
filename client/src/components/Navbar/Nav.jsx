import { useState } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Input,
  Badge,
  Dropdown,
  css,
  Avatar
} from "@nextui-org/react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { CartIcon } from "../Cart/CartIcon";
import { useSelector, useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogoutMutation } from "../../redux/userApiSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";
import {toast} from "react-toastify"


const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isInvisible, setIsInvisible] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap();
      dispatch(logoutUser());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const collapseItems = [
    "Categories",
    "All Products",
    "About Us",
    "Contact",
    "Events",
    "Sign In",
  ];

  return (
    <Navbar isBordered variant="floating">
      <Navbar.Content>
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
          <Navbar.Link color="inherit" href="/">
            LOGO
          </Navbar.Link>
        </Navbar.Brand>
      </Navbar.Content>

      <Navbar.Content enableCursorHighlight hideIn="sm" variant="underline">
        <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: "center",
                svg: { pe: "none" },
              }}
              ripple={false}
            >
              Categories
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="ACME features"
            css={{
              $$dropdownMenuWidth: "340px",
              $$dropdownItemHeight: "50px",
              "& .nextui-dropdown-item": {
                py: "$4",
                // dropdown item left icon
                svg: {
                  color: "$secondary",
                  mr: "$4",
                },
                // dropdown item title
                "& .nextui-dropdown-item-content": {
                  w: "100%",
                  fontWeight: "$semibold",
                },
              },
            }}
          >
            <Dropdown.Item
              key="jackets"
              showFullDescription
              description="2nd hand jackets"
            >
              Jackets
            </Dropdown.Item>
            <Dropdown.Item
              key="jewelry"
              showFullDescription
              description="Hand made jewelry"
            >
              Jewelry
            </Dropdown.Item>
            <Dropdown.Item
              key="shirts"
              showFullDescription
              description="2nd hand shirts"
            >
              Shirts
            </Dropdown.Item>
            <Dropdown.Item
              key="other"
              showFullDescription
              description="Other stuff"
            >
              Others
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Link href="/events">Events</Navbar.Link>
        <Navbar.Link href="/about">About us</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Content>

      <Navbar.Content>
      <Navbar.Link href="/cart">
          <Badge
            color="primary"
            content={cartItems.length >= 1 ? cartItems.length : ""}
            isInvisible={isInvisible}
            shape="circle"
          >
            <CartIcon fill="black" size={26} />
          </Badge>
        </Navbar.Link>
        {userInfo ? (
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Button>
                <Avatar
                  text={userInfo.data.name.slice(0, 1).toUpperCase()}
                  size="md"
                  bordered
                  pointer="true"
                  textColor="black"
                  borderWeight="black"
                  css={{
                    '&:hover': {
                      background: '$gray100',
                      color: '$gray800',
                    },
                  }}
                />
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Navbar.Link href="/profile">Profile</Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Item>
                  <button onClick={logoutHandler}>Logout</button>
                </Navbar.Item>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Navbar.Link href="/login">
            <AccountCircleIcon fontSize="large"/>
          </Navbar.Link>
        )}
      </Navbar.Content>
      
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={`/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
