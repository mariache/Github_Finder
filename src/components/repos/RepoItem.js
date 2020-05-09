import React from "react";
import PropTypes from "prop-types";
import { languageColor } from "../../utils/utils";
import moment from "moment";

const RepoItem = ({
  repo: { name, language, html_url, description, updated_at },
}) => {
  const truncateDescription = (string) =>
    string.length > 75 ? `${string.substring(0, 75)}...` : string;

  return (
    <div
      className="card repo"
      style={{
        borderLeft: `25px solid ${languageColor(language)} `,
        position: "relative",
      }}
    >
      <div style={{ fontWeight: 600 }}>
        <i className="fab fa-buffer"></i>{" "}
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
          {truncateDescription(description)}
        </p>
      )}
      <p className="text-secondary" style={{ margin: "0.5rem 0px" }}>
        <span>{language ? language : ""}</span>
      </p>
      <p
        className="text-secondary"
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <span>Last update: {moment(updated_at).format("YYYY-MM-DD")}</span>
      </p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
