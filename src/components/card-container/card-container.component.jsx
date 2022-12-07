import React from "react";

const CardContainer = ({ issue }) => {
  return (
    <p key={issue.id} value={issue.id}>
      {issue.title}
    </p>
  );
};

export default CardContainer;
