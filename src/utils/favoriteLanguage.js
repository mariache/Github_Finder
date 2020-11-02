const favouriteLanguage = (repos) => {
  const languages = [];
  let maxNumber = 1;
  let modeMap = {};

  for (let index = 0; index < repos.length; ++index) {
    languages.push(repos[index].language);
  }

  let maxElement = languages[0];

  for (let index = 0; index < languages.length; ++index) {
    if (modeMap[languages[index]] === null) {
      modeMap[languages[index]] = 1;
    } else {
      modeMap[languages[index]] += 1;
    }

    if (modeMap[languages[index]] > maxNumber) {
      maxElement = languages[index];
      maxNumber = modeMap[languages[index]];
    }
  }
  return maxElement !== null ? maxElement : "Not defined";
};

export default favouriteLanguage;
