/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { dateToMDY } from '../scripts/utils';

/**
 * Component representing an Article List Item displayed in the list of articles.
 *
 * @param {object} article The Article to display
 * @param {object} image The Image to display
 */
const ArticlesListItem = ({ article, image }) => {
  const formattedDate = `Posted on ${dateToMDY(article.published_date)}`;

  // whole view is wrapped in a "Link" component with the URL of the format
  // article/articleId

  return (
    <Link to={`/article/${article.oceId}`} style={{ textDecoration: 'none' }}>
      <div className="article">
        <div className="title-date">
          <h4 className="title">{article.name}</h4>
          <div className="date">{formattedDate}</div>
        </div>

        <div className="imgcontainer">
          <img src={image} alt="missing" />
        </div>

        <div className="description">{article.description}</div>
      </div>
    </Link>
  );
};

export default ArticlesListItem;

ArticlesListItem.propTypes = {
  article: PropTypes.shape({
    oceId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    published_date: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
};
