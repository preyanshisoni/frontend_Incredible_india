import React from "react";
import DOMPurify from "dompurify";

const DescriptionRenderer = ({ description }) => {
  if (!description) return null; 
  const sanitizedHtml = DOMPurify.sanitize(description);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default DescriptionRenderer;
