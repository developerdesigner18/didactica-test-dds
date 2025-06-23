module.exports = {
  // From: https://stackoverflow.com/a/55583615
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/common.scss";`
      }
    }
  }
};
