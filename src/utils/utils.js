export const languageColor = (lang) => {
  switch (lang) {
    case "JavaScript":
      return "#f1e05a";
    case "HTML":
      return "#e34c26";
    case "CSS":
      return "#563d7c";
    case "TypeScript":
      return "#2b7489";
    case "C#":
      return "#178600";
    case "CSS0":
      return "#563d7c";
    case "TSQL":
      return "#CCCCCC";
    case "PHP":
      return "#4F5D95";
    case "Go":
      return "#00ADD8";
    case "Python":
      return "#3572A5";
    case "Java":
      return "#b07219";
    case "Lua":
      return "#000080";
    case "Ruby":
      return "#701516";
    case "C++":
      return "#f34b7d";
    case "Per;":
      return "#0298c3";
    case "Swift":
      return "#ffac45";
    case "Objective-C":
      return "#438eff";
    case "Kotin":
      return "#F18E33";
    case "C":
      return "#555555";
    case "R":
      return "#198CE7";
    default:
      return "#EDEDED";
  }
};

export const truncateText = (string, number) =>
  string.length > 75 ? `${string.substring(0, number)}...` : string;
