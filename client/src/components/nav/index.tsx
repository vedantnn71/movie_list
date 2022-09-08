import { logout } from "@/lib";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import Icon from "../icon";
import Logo from "../logo";
import styles from './nav.module.css';

const Nav = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <nav className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={() => setIsPopoverOpen(false)}
        positions={["bottom"]}
        content={() => (
          <div className={styles.popover}>
            <ul className={styles.popoverList}>
              <li
                className={styles.popoverItem}
                onClick={() => logout()}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      >
        <div className={styles.ctaContainer}>
          <Link to='/add'>
            <Icon name="plus" />
          </Link>
          <span onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <Icon name="user" />
          </span>
        </div>
      </Popover>
    </nav>
  );
}

export default Nav;