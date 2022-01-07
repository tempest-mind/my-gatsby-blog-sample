/* eslint-disable camelcase */

/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import filterXSS from 'xss';
import { dateToMDY, getImageObject } from '../scripts/utils';
import Breadcrumbs from '../components/Breadcrumbs';

export const query = graphql`query ($articleId: String!) {
  topLevelQuery: allOceAsset(filter: {oceId: {eq: $articleId}}) {
    nodes {
      oceId
      article_content
      description
      image_caption
      name
      published_date
      author {
        name
        fields {
          avatar {
            id
          }
        }
      }
      image {
        id
      }
      topic {
        name
        id
      }
    }
  }
  oceToFileQuery: allOceAsset {
    nodes {
      oceId    
      staticURL  
    }
  }
}
`;

/**
 * Template for the Article Details Page.
 */
const ArticlesDetailsTemplate = ({ data }) => {
  const article = data.topLevelQuery.nodes[0];
  const oceToFile = data.oceToFileQuery.nodes;
  const {
    name,
    published_date,
    article_content,
    image_caption,
    author,
    topic,
  } = article;
  const articleImageObj = getImageObject(oceToFile, article.image.id);
  const authorImageObj = getImageObject(
    oceToFile,
    author.fields.avatar.id,
  );

  // Breadcrumbs :  Home > topicName > articleName (read only)
  // - "Home" url      =  "/"
  // - "topicName" url =  "/topic/topicId"
  const breadcrumbsData = [
    {
      linkParams: { pathname: '/' },
      text: 'Home',
    },
    {
      linkParams: {
        pathname: `/topic/${topic.id}`,
        search: `?topicName=${topic.name}`,
      },
      text: topic.name,
    },
    {
      linkParams: {},
      text: name,
    },
  ];
  const formattedDate = published_date && published_date
    ? `Posted on ${dateToMDY(published_date)}`
    : '';
  // sanitize the content for html display
  const options = {
    stripIgnoreTag: true, // filter out all HTML not in the whitelist
    stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
  // to filter out its content
  };
  const content = filterXSS(article_content, options);
  return (
    <div>
      <Breadcrumbs breadcrumbsData={breadcrumbsData} />
      <div id="article">
        <div className="author">
          {/* Avatar */}
          <div className="authorImageContainer">
            <img src={authorImageObj} alt="Missing" />
          </div>
          {/*  Author Name / Date */}
          <div className="name_date">
            <h4 className="title">{author.name}</h4>
            <div className="date">
              {formattedDate}
              {' '}
            </div>
          </div>
        </div>

        {/* Article Image and caption */}
        <figure>
          <img src={articleImageObj} alt="missing" />
          <figcaption>{image_caption}</figcaption>
        </figure>

        {/* Article Content */}
        <div className="content">
          {content.indexOf('</') !== -1 ? (
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

/*
 * Export an object with name value pairs of fetchInitialData function and component.
 */
export default ArticlesDetailsTemplate;

ArticlesDetailsTemplate.propTypes = {
  data: PropTypes.shape({
    topLevelQuery: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        published_date: PropTypes.string,
        article_content: PropTypes.string,
        image_caption: PropTypes.string,
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          fields: PropTypes.shape({
            avatar: PropTypes.shape({
              id: PropTypes.string,
            }),
          }),
        }),
        topic: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        }),
        image: PropTypes.shape({
          id: PropTypes.string,
        }).isRequired,
      })),
    }).isRequired,

    oceToFileQuery: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
  }).isRequired,
};
