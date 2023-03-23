import { SocialIcon } from "react-social-icons";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Footer = () => {
  return (
    <div className="flex">
      <div className="footerSection flex flex-col">
        <h1 className="">LAMA</h1>
        <p className="my-2">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="flex ">
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
      <div className="footerSection">
        <h3 className="text-3xl mb-6">Useful Links</h3>
        <ul className="m-0 p-0 flex flex-wrap">
          <li className="listItem">Home</li>
          <li className="listItem">Cart</li>
          <li className="listItem">Man Fashion</li>
          <li className="listItem">Woman Fashion</li>
          <li className="listItem">Accessories</li>
          <li className="listItem">My Account</li>
          <li className="listItem">Order Tracking</li>
          <li className="listItem">Wishlist</li>
          <li className="listItem">Wishlist</li>
          <li className="listItem">Terms</li>
        </ul>
      </div>
      <div className="footerSection">
        <h3 className="mb-6 text-3xl">Contact</h3>
        <div className="contactItem">
          <MapOutlinedIcon style={{marginRight: '10px'}}/>
          Hermanstr.45, 12054 Berlin
        </div>
        <div className="contactItem">
          <LocalPhoneOutlinedIcon style={{marginRight: '10px'}}/>
          +49 15364895
        </div>
        <div className="contactItem">
          <EmailOutlinedIcon style={{marginRight: '10px'}}/> contact@contact.com
        </div>
        <img
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
          className="w-50"
        />
      </div>
    </div>
  );
};

export default Footer;
