import React from "react"
import { Link, /*graphql, useStaticQuery*/ } from "gatsby"
import rebLogo from "../rebLogo.jpg"

import headerStyles from "./header.module.scss"

const Header = () => {
 /* const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)*/

  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.navList}>
          <li>
            <Link className={headerStyles.title} to="/">
              <img src={rebLogo} alt="R" className={headerStyles.img} />
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              to="/"
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              href="https://rebeccahirai.com/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              href="https://rebeccahirai.com/contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              href="https://rebeccahirai.com"
            >
              Portfolio
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
