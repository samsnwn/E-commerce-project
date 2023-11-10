import { SocialIcon } from "react-social-icons";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col">
      <div className="footerSection flex flex-col text-center lg:text-left">
        <h1 className="text-2xl">
          Oldies but Goodies Vintage Clothing &copy; {currentYear}
        </h1>
        <p className="my-2 lg:block hidden">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="flex justify-center lg:justify-start my-5">
          <div className="socialIcons">
            <SocialIcon url="http://www.facebook.com" />
          </div>
          <div className="socialIcons">
            <SocialIcon url="http://www.instagram.com" />
          </div>
          <div className="socialIcons">
            <SocialIcon url="http://www.twitter.com" />
          </div>
          <div className="socialIcons">
            <SocialIcon url="http://www.pinterest.com" />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="footerSection">
          <h3 className="text-2xl mb-6 lg:text-left text-center">
            Useful Links
          </h3>
          <ul className="m-0 p-0 flex flex-wrap justify-center">
            <li className="listItem"><Link to="/">Home</Link></li>
            <li className="listItem"><Link to="/cart">Cart</Link></li>
            <li className="listItem"><Link to="/products">Products</Link></li>
            <li className="listItem"><Link to="/profile">My Account</Link></li>
            <li className="listItem"><Link to="/wishlist">Wishlist</Link></li>
            <li className="listItem"><Link to="/terms">Terms of Service</Link></li>
            <li className="listItem"><Link to="/refunds">Returns and Refund Policy</Link></li>
          </ul>
        </div>
        <div className="footerSection">
          <h3 className="mb-6 text-2xl lg:text-left text-center">Contact</h3>
          <div className="contactItem">
            <MapOutlinedIcon style={{ marginRight: "10px" }} />
            Hermanstr.45, 12054 Berlin
          </div>
          <div className="contactItem">
            <LocalPhoneOutlinedIcon style={{ marginRight: "10px" }} />
            +49 15364895
          </div>
          <div className="contactItem">
            <EmailOutlinedIcon style={{ marginRight: "10px" }} />{" "}
            contact@obgvintage.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
