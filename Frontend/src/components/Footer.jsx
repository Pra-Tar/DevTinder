import { Link } from "react-router-dom";

const Footer = () => (
  <div className="w-full h-8 bg-gray-200 fixed bottom-0 flex justify-center items-center text-sm">
    <Link to="/page/privacy-policy" className="hover:underline text-gray-600 m-2">
      Privacy Policy
    </Link>
    <Link to="/page/terms-of-service" className="hover:underline text-gray-600 m-2">
      Terms of Service
    </Link>
    <Link to="/page/refund-policy" className="hover:underline text-gray-600 m-2">
      Refund Policy
    </Link>
  </div>
);

export default Footer;
