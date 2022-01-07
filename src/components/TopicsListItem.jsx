/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

/**
 * Component representing a Topic displayed in the list of topics.
 *
 * @param {object} topic The topic to display
 * @param {object} topic The topic to display
 */
const TopicsListItem = ({ topic, image }) => {
  const { id, name, description } = topic;
  return (
    <Link
      to={`/topic/${encodeURIComponent(id)}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="topic" key={id}>
        <div className="button-wrapper">
          <div className="button">{name}</div>
        </div>

        <img src={image} alt="missing" />
        <div className="desc-wrapper">
          <div className="description">{description}</div>
        </div>
      </div>
    </Link>
  );
};

export default TopicsListItem;

TopicsListItem.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  image: PropTypes.string.isRequired,
};
