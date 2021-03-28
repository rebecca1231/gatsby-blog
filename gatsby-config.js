require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
  })
module.exports = {
    siteMetadata: {
        title: "Rebecca's Blog",
        author: "Rebecca Hirai"
    },
    plugins: [
        `gatsby-plugin-styled-components`,
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
            }
        },
   
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
              // Setting a color is optional.
              color: `teal`,
              // Disable the loading spinner.
              showSpinner: true,
            },
          },
        'gatsby-plugin-sharp',
        // { //for use with markdown files!
        //     resolve: 'gatsby-transformer-remark',
        //     options: {
        //         plugins: [
        //             'gatsby-remark-relative-images',
        //             {
        //                 resolve: 'gatsby-remark-images',
        //                 options: {
        //                     maxWidth: 750,
        //                     linkImagesToOriginal: false
        //                 }
        //             }
        //         ]
        //     }
        // }
    ]
}