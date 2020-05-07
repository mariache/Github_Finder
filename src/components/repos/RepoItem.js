import React from "react";
import PropTypes from "prop-types";
import { languageColor } from "../../utils/utils";

const RepoItem = ({ repo: { name, language, html_url, description } }) => {
  return (
    <div
      className="card repo"
      style={{
        borderLeft: `25px solid ${languageColor(language)} `,
      }}
    >
      <div style={{ fontWeight: 600 }}>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {name
            .toLowerCase()
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </a>
      </div>
      {description && (
        <p className="text-secondary" style={{ margin: "8px 0px 16px" }}>
          {description}
        </p>
      )}
      <p className="text-secondary">
        <span>{language ? language : ""}</span>
      </p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
