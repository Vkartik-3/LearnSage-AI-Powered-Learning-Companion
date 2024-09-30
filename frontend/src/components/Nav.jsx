import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import logo from "../assets/images/logo.png";

const Nav = () => {
  return (
    <header className="padding-x absolute py-8 z-10 w-full" style={{ backgroundColor: '#0c0e0d'}}>
      <nav className="flex items-center justify-between max-container">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: '225px', height: '50px' }} />
        </a>
        <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-gray-400" // Changed text color to light gray
                style={{ color: '#ccc' }} // Inline style to ensure compatibility with all browsers
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
