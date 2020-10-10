import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import headerStyles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <nav>
        <ul className={headerStyles.navList}>
          <li>
            <a
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              href="https://rebeccahirai.com"
            >
              Home
            </a>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/"
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              href="https://rebeccahirai.com/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              href="https://rebeccahirai.com/contact"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
