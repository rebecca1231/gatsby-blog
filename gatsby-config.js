require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

module.exports = {
    siteMetadata: {
        title: "Rebecca's Blog",
        author: "Rebecca Hirai"
    },
    plugins: [
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sharp",
        "gatsby-plugin-image",
        'gatsby-plugin-sass',
        {
            resolve: "gatsby-source-contentful",
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                // host: process.env.CONTENTFUL_HOST
            },
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
    ],
};
