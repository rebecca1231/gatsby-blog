import React from 'react'
import {graphql} from 'gatsby'
import {BLOCKS} from '@contentful/rich-text-types'
import {renderRichText} from 'gatsby-source-contentful/rich-text'

import CodeSnippet from '../components/CodeSnippet'
import Layout from '../components/layout'
import Head from '../components/head'

const Bold = ({children}) => <span className="bold">{children}</span>
const Text = ({children}) => <p className="align-center">{children}</p>

export const query = graphql`
    query ($slug: String!) {
        contentfulBlogPost(slug: { eq: $slug }) {
            title
            publishedDate(formatString: "MMMM Do, YYYY")
            body {
                raw
                references {
                    ... on ContentfulMarkdownText {
                        __typename
                        id
                        contentful_id
                        codeSnippet {
                            codeSnippet
                            id
                            internal {
                                content
                            }
                        }
                        childContentfulMarkdownTextCodeSnippetTextNode {
                            codeSnippet
                        }
                    }
                    ... on ContentfulAsset {
                        __typename
                        id
                        contentful_id
                        file {
                            url
                            fileName
                            contentType
                        }
                        publicUrl
                        placeholderUrl
                    }
                }
            }
        }
    }
`

const Blog = (props) => {
    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                const content = node.data.target.codeSnippet.codeSnippet
                return <CodeSnippet markdown={content}></CodeSnippet>
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const alt = node.data.target.file.fileName
                const url = node.data.target.file.url
                return <img alt={alt} src={url}/>
            },
        },
    }
    return (
        <Layout>
            <Head title={props.data.contentfulBlogPost.title}/>
            <h1>{props.data.contentfulBlogPost.title}</h1>
            <p>{props.data.contentfulBlogPost.publishedDate}</p>
            {renderRichText(props.data.contentfulBlogPost.body, options)}
        </Layout>
    )
}

export default Blog
