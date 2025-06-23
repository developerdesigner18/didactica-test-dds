const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/vue",
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/")
    };
    // keep this if you're doing typescript
    // config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
        {
          loader: "sass-loader",
          options: {
            additionalData: `@import "@/scss/common.scss";`
          }
        }
      ],
      include: path.resolve(__dirname, "../")
    });
    return config;
  }
};
