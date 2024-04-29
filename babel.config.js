module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-react"],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "@components": "./src/components",
            "@pages": "./src/pages",
            "@navigation": "./src/navigation",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
