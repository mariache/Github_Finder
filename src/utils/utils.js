const truncateText = (string, number) =>
  string.length > number ? `${string.substring(0, number)}...` : string;

const capitalizeFirstChar = (name) =>
  name
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");

const titleCase = (title) =>
  title
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");

export { truncateText, capitalizeFirstChar, titleCase };
