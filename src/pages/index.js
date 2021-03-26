import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./index.module.scss"
import Head from "../components/head"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
            id
            keywords
          }
        }
      }
    }
  `)
  const slugObj = {}
  data.allContentfulBlogPost.edges.forEach(
    ({ node }) => (slugObj[node.title] = node.keywords.split("."))
  )

  const [results, setResults] = useState(null)
  const [showSearch, setShowSearch] = useState(false)

  const searchMethod = e => {
    const term = e.target.value.toLowerCase()
    const matchList = []
    if (term.length < 1) {
      return
    }
    for (let item in slugObj) {
      const matches = slugObj[item].filter(i => i.startsWith(term))
      if (matches.length) {
        matchList.push(item)
      }
    }
    if (matchList.length < 1) {
      setResults(
        <div>
          <h1>Search Results</h1>
          <p>I couldn't find any matches for "{term}".</p>
          <p>Try another keyword?</p>
          <hr />
        </div>
      )
      return results
    }
    return renderSearchResults(matchList)
  }

  const renderSearchResults = list => {
    const posts = data.allContentfulBlogPost.edges.filter(({ node }) =>
      list.includes(node.title)
    )
    setResults(
      <div>
        <h1>Search Results</h1>
        <ol className={blogStyles.posts}>
          {posts.map(edge => {
            return (
              <li className={blogStyles.post} key={edge.node.id}>
                <Link to={`/${edge.node.slug}`}>
                  <h2>{edge.node.title}</h2>
                  <p>{edge.node.publishedDate}</p>
                </Link>
              </li>
            )
          })}
        </ol>
        <hr />
      </div>
    )

    return results
  }

  return (
    <Layout>
      <Head title="Blog" />
      <div>
      <button
        className={blogStyles.searchbutton}
        onClick={() => setShowSearch(!showSearch)} 
      >
        <svg
          strokeWidth="0"
          viewBox="0 0 24 24"
          title="Search for Articles"
          height="2em"
          width="2em"
          cursor="pointer"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        </button>
        {showSearch && (
          <>
            <form>
              <label htmlFor="search">Search for Articles</label>
              <input
                tabIndex="0"
                className={blogStyles.searchbar}
                type="search"
                id="search"
                onChange={e => {
                  searchMethod(e)
                }}
              />
            </form>
            {results}
          </>
        )}
      </div>

      <h1>Latest Articles</h1>
      <ol className={blogStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={blogStyles.post} key={edge.node.id}>
              <Link to={`/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
                <p>{edge.node.publishedDate}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default IndexPage
