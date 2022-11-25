import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Button, Link, Text, Input, Badge } from "@nextui-org/react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { CartIcon } from "../Cart/CartIcon";
import {useSelector} from 'react-redux'
import baseUrl from "../../config/config";
import axios from "axios";

const Nav = () => {

  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector(state=>state.user.currentUser)

  const navigate = useNavigate();


  const [isInvisible, setIsInvisible] = useState(false);

  const logoutHandler = async () => {
    // LOGOUT NEXT STEP
  }

  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  return (
    <div>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Input
            type='search'
            aria-label='search input'
            size="sm"
            bordered
            placeholder="Search..."
            contentRight={<SearchSharpIcon />}
          />
        </Navbar.Content>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link isActive href="/">
            Our Products
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
          {!user ? <> <Navbar.Item>
            <Button color="inherit" as={Link} href="/login">
              Login
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto flat as={Link} href="/register">
              Sign Up
            </Button>
          </Navbar.Item></> : <Navbar.Item>
            <Button color="inherit" onPress={logoutHandler}>
              logout
            </Button>
          </Navbar.Item>}
          <Navbar.Item>
            <Button color="inherit" as={Link} href="/login">
              Login
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto flat as={Link} href="/register">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link href='/cart'>
          <Badge
            color="primary"
            content={quantity >= 1 ? quantity : ''}
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
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
