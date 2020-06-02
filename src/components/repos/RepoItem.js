import React from "react";
import PropTypes from "prop-types";
import { truncateText, capitalizeFirstChar } from "../../utils/utils";
import { languageColors } from "../../utils";
import moment from "moment";
import repo from "../../assets/images/repo.png";

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
        borderLeft: `10px solid ${languageColors(language)} `,
      }}
    >
      <div style={{ fontWeight: 600 }}>
        <img
          src={repo}
          alt="repo"
          style={{
            height: "1.2rem",
            width: "1.2rem",
            verticalAlign: "middle",
            marginRight: "0.3rem",
          }}
        />
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ wordBreak: "break-word" }}
        >
          {capitalizeFirstChar(name)}
        </a>
      </div>
      {description && (
        <p className="text-secondary" style={{ margin: "0.5rem 0px" }}>
          {truncateText(description, 150)}
        </p>
      )}
      <p className="text-secondary" style={{ margin: "0.5rem 0px" }}>
        <span>{language ? language : <em>Language is not defined</em>}</span>
      </p>
      <div className="text-secondary flex-column">
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
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
