import React from "react";
import CardContainer from "../card-container/card-container.component";

const CardList = ({ filteredIssues }) => {
  return (
    <div style={{ marginTop: "5px" }}>
      <h4>Issues</h4>
      {filteredIssues.map((newIssue) => (
        <CardContainer issue={newIssue} key={newIssue.id} />
      ))}
    </div>
  );
};

export default CardList;
