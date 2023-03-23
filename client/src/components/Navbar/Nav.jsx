import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Button,
  Link,
  Text,
  Input,
  Badge,
  Dropdown,
} from "@nextui-org/react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { CartIcon } from "../Cart/CartIcon";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { cartActions } from "../../redux/cartSlice";

const Nav = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  // const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isInvisible, setIsInvisible] = useState(false);

  const logoutHandler = () => {
    dispatch(userActions.logout());
    dispatch(cartActions.clearCart());    
    navigate("/");
  };

  const collapseItems = [
    "Categories",
    "All Products",
    "About Us",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];
  // console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).cart))

  return (
    <Navbar isBordered variant="floating">
      {/* <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Input
            type='search'
            aria-label='search input'
            size="sm"
            bordered
            placeholder="Search..."
            contentRight={<SearchSharpIcon />}
          />
        </Navbar.Content> */}
      <Navbar.Content>
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
          <Navbar.Link color="inherit" href="/">
            LOGO
          </Navbar.Link>
        </Navbar.Brand>
      </Navbar.Content>

      <Navbar.Content enableCursorHighlight hideIn="sm" variant="underline">
      <Navbar.Link href="/">Home</Navbar.Link>

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
              $$dropdownItemHeight: "70px",
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
      </Navbar.Content>
      <Navbar.Content hideIn='sm'>
        {user ? (
          <>
            <Navbar.Link href="/profile">My Profile</Navbar.Link>
            <Button color="inherit" onPress={logoutHandler}>
              Logout{" "}
            </Button>
          </>
        ) : (
          <>
            <Navbar.Link href="/login">Login</Navbar.Link>
            <Navbar.Link href="/register">Register</Navbar.Link>
          </>
        )}
          </Navbar.Content>
          <Navbar.Content>
        <Navbar.Link href="/cart">
          <Badge
            color="primary"
            content={quantity >= 1 ? quantity : ""}
            isInvisible={isInvisible}
            shape="circle"
          >
            <CartIcon fill="currentColor" size={30} />
          </Badge>
        </Navbar.Link>
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
