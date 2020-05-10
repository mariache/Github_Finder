import React from "react";
import PropTypes from "prop-types";
import { languageColor, truncateText } from "../../utils/utils";
import moment from "moment";

const RepoItem = ({
  repo: {
    name,
    language,
    html_url,
    description,
    updated_at,
    stargazers_count,
    forks_count,
  },
}) => {
  return (
    <div
      className="repo flex-column"
      style={{
        borderLeft: `25px solid ${languageColor(language)} `,
      }}
    >
      <div style={{ fontWeight: 600 }}>
        <i className="fab fa-buffer"></i>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ wordBreak: "break-word" }}
        >
          {name
            .toLowerCase()
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </a>
      </div>
      {description && (
        <p className="text-secondary" style={{ margin: "0.5rem 0px" }}>
          {truncateText(description, 150)}
        </p>
      )}
      <p className="text-secondary" style={{ margin: "0.5rem 0px" }}>
        <span>{language ? language : ""}</span>
      </p>
      <p className="text-secondary flex-column">
        <div>
          <span style={{ marginRight: "1rem" }}>
            <i
              className="fas fa-star"
              style={{ marginRight: "0.3rem", color: "#F08700" }}
            ></i>
            {stargazers_count}
          </span>
          <span>
            <i
              className="fas fa-code-branch"
              style={{ marginRight: "0.3rem", color: "#00A9A5" }}
            ></i>
            {forks_count}
          </span>
        </div>
        <div>Last update: {moment(updated_at).format("YYYY-MM-DD")}</div>
      </p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
