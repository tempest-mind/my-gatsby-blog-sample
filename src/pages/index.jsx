/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/* eslint-disable camelcase */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Header from '../components/Header';
import TopicsListItem from '../components/TopicsListItem';
import { getImageObject } from '../scripts/utils';

/**
 * Query to fetch the topics, the oceId to fileId map and all the image files
 */
export const query = graphql`{
  topLevelQuery: allOceAsset(
    filter: {oceType: {eq: "OCEGettingStartedHomePage"}, name: {eq: "HomePage"}}
  ) {
    nodes {
      about_url
      company_name
      company_logo {
        id
      }
      contact_url
      topics {
        description
        name
        id
        fields {
          thumbnail {
            id
          }
        }
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
 * Component for the Topics List Page.
 */
const IndexPage = () => {
  const data = useStaticQuery(query);
  const oceToFile = data.oceToFileQuery.nodes;
  const toplevel = data.topLevelQuery.nodes[0];
  const { company_logo } = toplevel;
  const companyLogoImageObj = getImageObject(
    oceToFile,
    company_logo.id,
  );
  const { topics } = toplevel;
  return (
    <div data-testid="TopicsListContainer">
      <Header
        companyTitle={toplevel.company_name}
        companyLogoImageObj={companyLogoImageObj}
        aboutUrl={toplevel.about_url}
        contactUrl={toplevel.contact_url}
      />
      {topics && (
        <div id="topics">
          {topics.map((topic) => {
            const topicImageObj = getImageObject(
              oceToFile,
              topic.fields.thumbnail.id,
            );
            return (
              <TopicsListItem
                topic={topic}
                key={topic.id}
                image={topicImageObj}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
