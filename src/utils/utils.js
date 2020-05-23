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
    case "F#":
      return "#b845fc";
    case "Vue":
      return "#2c3e50";
    case "Elm":
      return "#60B5CC";
    case "OCaml":
      return "#3be133";
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
    case "Dart":
      return "#00B4AB";
    case "Shell":
      return "#89e051";
    case "PowerShell":
      return "#012456";
    case "Haskell":
      return "#5e5086";
    case "Rust":
      return "#dea584";
    case "Kotlin":
      return "#F18E33";
    case "Roff":
      return "#ecdebe";
    case "Dockerfile":
      return "#384d54";
    case "Makefile":
      return "#427819";
    case "Batchfile":
      return "#C1F12E";
    case "Perl":
      return "#0298c3";
    case "Raku":
      return "#0000fb";
    case "SAS":
      return "#B34936";
    case "Erlang":
      return "#B83998";
    case "Elixir":
      return "#6e4a7e";
    case "Scala":
      return "#c22d40";
    case "XSLT":
      return "#EB8CEB";
    case "Jupyter Notebook":
      return "#DA5B0B";
    case "PLSQL":
      return "#dad8d8";
    case "ABAP":
      return "#E8274B";
    case "Groovy":
      return "#e69f56";
    case "CoffeeScript":
      return "#244776";
    case "ActionScript":
      return "#882B0F";
    case "EmberScript": 
      return '#FFF4F3';
    case "Ada":
      return "#02f88c";
    case "Assembly":
      return "#6E4C13";
    case "Common Lisp":
      return "#3fb68b";
    case "Emacs Lisp":
      return "#c065db";
    case "Scheme":
      return "#1e4aec";
    case "Clojure":
      return "#db5855";
    case "Visual Basic":
      return "#945db7";
    case "Fortran":
      return "#4d41b1";
    case "VimL":
      return "#199f4b";
    case "Vim script":
      return "#199f4b";
    case "Io":
      return "#a9188d";
    case "ASP":
      return "#6a40fd";
    case "POV-Ray SDL":
    case "GLSL":
    case "Mathematica":
    case "ShaderLab":
    case "TSQL":
    case "GCC Machine Description":
      return "#CCCCCC";
    case "PureScript":
      return "#1d222d";
    case "Dhall":
      return "#dfafff";
    case "Nix":
      return "#7e7eff";
    case "TeX":
      return "#3d6117";
    default:
      return "#EDEDED";
  }
};

export const truncateText = (string, number) =>
  string.length > number ? `${string.substring(0, number)}...` : string;

export const capitalizeFirstChar = (name) =>
  name
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const favouriteLanguage = (repos) => {
  const languages = [];
  let maxNumber = 1;
  let modeMap = {};

  for (let index = 0; index < repos.length; ++index) {
    languages.push(repos[index].language);
  }

  let maxElement = languages[0];

  for (let index = 0; index < languages.length; ++index) {
    if (modeMap[languages[index]] == null) {
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
