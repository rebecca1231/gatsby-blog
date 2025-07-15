import React from "react"
import { Link, /*graphql, useStaticQuery*/ } from "gatsby"
import rebLogo from "../rebLogo.jpg"

import * as headerStyles from "./header.module.scss"

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
              href="https://rebeccapage.org/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              href="https://rebeccapage.org/contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeclassname={headerStyles.activeNavItem}
              href="https://rebeccapage.org"
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
