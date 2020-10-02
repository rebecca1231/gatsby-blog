import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <h1>Hi.</h1>
      <h2>I'm Rebecca, a full-stack.</h2>
      <p> </p>
      <p>
        <Link to="/contact" className="ui basic button teal" >
          Get in touch <i className="right floated envelope outline icon"></i>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
