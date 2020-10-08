const truncateText = (string, number) =>
  string.length > number ? `${string.substring(0, number)}...` : string;

const capitalizeFirstChar = (name) =>
  name
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");

export { truncateText, capitalizeFirstChar };
