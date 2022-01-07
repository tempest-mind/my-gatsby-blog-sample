/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * React component for rendering the header of the home page
 *
 * @param {string} companyTitle The company's title
 * @param {object} companyLogoImageObj The Image of the company's logo
 * @param {string} aboutUrl The URL for the About link
 * @param {string} contactUrl The URL for the Contact Us link
 */

const Header = ({
  companyTitle,
  companyLogoImageObj,
  aboutUrl,
  contactUrl,
}) => (
  <div className="logo" data-testid="Header">
    <div id="company-thumbnail">
      <img src={companyLogoImageObj} alt="missing" />
    </div>
    <h1 id="company-title">{companyTitle}</h1>
    <ul>
      <li>
        <a id="about" href={aboutUrl}>
          About Us
        </a>
      </li>
      <li>
        <a id="contact" href={contactUrl}>
          Contact Us
        </a>
      </li>
    </ul>
  </div>
);

export default Header;

/*
 * Define the type of data used in this component.
 */
Header.propTypes = {
  companyTitle: PropTypes.string.isRequired,
  aboutUrl: PropTypes.string.isRequired,
  contactUrl: PropTypes.string.isRequired,
  companyLogoImageObj: PropTypes.string.isRequired,
};
