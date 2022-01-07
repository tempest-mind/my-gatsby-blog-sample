/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * Display the date in a readable format
 */
export function dateToMDY(date) {
  const dateObj = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  return formattedDate;
}

/**
 * Retrieves the image file given the oceId
 */
export function getImageObject(oceToFile, oceId) {
  const gatsbyFileObj = oceToFile.filter((obj) => obj.oceId === oceId);
  const fileURL = gatsbyFileObj ? gatsbyFileObj[0].staticURL : 'notFound';
  return fileURL;
}
