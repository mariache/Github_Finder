import {
  capitalizeFirstChar,
  truncateText,
  titleCase,
  favouriteLanguage,
} from "./../utils";

import testRepos from "../testData/testRepos";

describe("function capitalizeFirstChar", () => {
  it("renders name with first capital letter", () => {
    let name,
      nameToCapitalize = "name",
      nameToReceive = "Name";
    name = capitalizeFirstChar(nameToCapitalize);
    expect(name).toBe(nameToReceive);
  });
  it("makes all letters lowerCase except first", () => {
    let name,
      anotherName,
      nameToCapitalize = "NAME",
      anotherNameToCapitalize = "nAmE",
      nameToReceive = "Name";
    name = capitalizeFirstChar(nameToCapitalize);
    anotherName = capitalizeFirstChar(anotherNameToCapitalize);
    expect(name).toBe(nameToReceive);
    expect(anotherName).toBe(nameToReceive);
  });
});

describe("function titleCase", () => {
  it("renders name with first capital letter", () => {
    let name,
      nameToCapitalize = "test name",
      nameToReceive = "Test Name";
    name = titleCase(nameToCapitalize);
    expect(name).toBe(nameToReceive);
  });
  it("makes all letters lowerCase except first", () => {
    let name,
      anotherName,
      nameToCapitalize = "test NAME",
      anotherNameToCapitalize = "tesT nAmE",
      nameToReceive = "Test Name";
    name = titleCase(nameToCapitalize);
    anotherName = titleCase(anotherNameToCapitalize);
    expect(name).toBe(nameToReceive);
    expect(anotherName).toBe(nameToReceive);
  });
});

describe("function truncateText", () => {
  it("renders truncated text to specified number", () => {
    let text,
      textToTruncate = "Test text to truncate",
      textToReceive = "Test text ...";
    text = truncateText(textToTruncate, 10);
    expect(text).toHaveLength(13);
    expect(text).toBe(textToReceive);
  });
});

describe("function favouriteLanguage", () => {
  it("returns favorite language", () => {
    let lang,
      langToReceive = "JavaScript";
    lang = favouriteLanguage(testRepos);
    expect(lang).toBe(langToReceive);
  });
});
