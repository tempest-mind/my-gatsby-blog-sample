/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const articlesListTemplate = path.resolve(
    'src/templates/ArticlesListTemplate.jsx',
  );
  const articleDetailsTemplate = path.resolve(
    'src/templates/ArticleDetailsTemplate.jsx',
  );

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    {
      topicsListQuery : allOceAsset(
        filter: {
          oceType: { eq: "OCEGettingStartedHomePage" }
          name: { eq: "HomePage" }
        }
      ) {
        nodes {
          topics {
            id
          }
        }
      }
      articlesListQuery: allOceAsset(
        filter: { oceType: { eq: "OCEGettingStartedArticle" } }
      ) {
        nodes {
          oceId
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create topic pages.
    const toplevel = result.data.topicsListQuery.nodes[0];
    const { topics } = toplevel;
    topics.forEach((topic) => {
      const topicId = topic.id;
      createPage({
        path: `topic/${topicId}`,
        component: articlesListTemplate,
        context: {
          topicId,
        },
      }); // end createpage for topic
    });

    // Create articles pages.
    const articles = result.data.articlesListQuery.nodes;
    articles.forEach((article) => {
      const articleId = article.oceId;
      createPage({
        // Path for this page — required
        path: `article/${articleId}`,
        component: articleDetailsTemplate,
        context: {
          articleId,
        },
      });
    });
  });
};
