import React from "react";

export default function renderRelation(relations, relationType, content) {
  if (relations && relations[relationType] && relations[relationType].length) {
    return (
      <ul>
        {relations[relationType].map(relation => <li key={relation.id}>{content(relation)}</li>)}
      </ul>
    );
  } else {
    return null
  }
};
