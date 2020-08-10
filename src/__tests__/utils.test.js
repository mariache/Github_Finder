import { capitalizeFirstChar, truncateText } from "./../utils";

describe("capitalizeFirstChar", () => {
  it("renders name with first capital letter", () => {
    let name,
      nameToCapitalize = "name";
    name = capitalizeFirstChar(nameToCapitalize);
    expect(name).toBe("Name");
  });
});

describe("truncateText", () => {
  it("renders truncated text to specified number", () => {
    let text,
      textToTruncate = "Test text to truncate";
    text = truncateText(textToTruncate, 10);
    expect(text).toHaveLength(13);
  });
});
