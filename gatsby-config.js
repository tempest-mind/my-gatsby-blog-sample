/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

require('dotenv').config();

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: 'Blog Gatsby Sample',
    description: '',
    author: 'Oracle America, Inc.',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: '@oracle/gatsby-source-oce',
      options: {
        name: 'oce',
        contentServer: process.env.SERVER_URL,
        channelToken: process.env.CHANNEL_TOKEN,
        proxyUrl: process.env.PROXY_URL,
        items: {
          limit: 4,
          query: '',
        },
        renditions: 'none',
        // if true then digital assets are downloaded locally
        staticAssetDownload: true,
        // This determines the base directory in the path for the assets.
        //  Used when staticAssetDownload is true
        staticAssetRootDir: 'contentServer',
        staticUrlPrefix: process.env.PATH_PREFIX,
        debug: false,
      },
    },
    'gatsby-plugin-offline',
  ],
};
