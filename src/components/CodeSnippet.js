import React, { useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';


const md = new MarkdownIt({
  html: true,
  linkify: false,
});

const CodeSnippet = ({ markdown }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
  );
};

export default CodeSnippet;

//this code is from:
//https://techholding.co/blog/gatsby-contentful-code-snippets/