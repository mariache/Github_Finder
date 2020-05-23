export const truncateText = (string, number) =>
  string.length > number ? `${string.substring(0, number)}...` : string;

export const capitalizeFirstChar = (name) =>
  name
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
