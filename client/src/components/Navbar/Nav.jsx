import { useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@nextui-org/react";

const Nav = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { cartItems } = useSelector((state) => state.cart);
  const [isInvisible, setIsInvisible] = useState(false);

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
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          {/* <Input
            type='search'
            aria-label='search input'
            size="sm"
            bordered
            isInvisible
            placeholder="Search..."
            contentRight={<SearchSharpIcon />}
          /> */}
          <SearchSharpIcon />
          {userInfo ? (
            <Navbar.Link href="/profile">
              <Avatar
                text={userInfo.name.slice(0, 1).toUpperCase()}
                size="sm"
                bordered
                color="gradient"
                pointer="true"
                textColor="white"
              />
            </Navbar.Link>
          ) : (
            <Navbar.Link href="/login">
              <AccountCircleIcon />
            </Navbar.Link>
          )}
          <Navbar.Link href="/cart">
            <Badge
              color="primary"
              content={cartItems.length >= 1 ? cartItems.length : ""}
              isInvisible={isInvisible}
              shape="circle"
            >
              <CartIcon fill="currentColor" size={25} />
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
