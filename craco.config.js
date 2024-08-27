const CracoAlias = require("craco-alias");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// 프로덕션이 아닌경우에만 Bundle Analyzer가 실행되도록 설정
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: ["@emotion/babel-plugin"],
  },
  webpack: {
    plugins: isProduction ? [] : [new BundleAnalyzerPlugin()],
  },
};
