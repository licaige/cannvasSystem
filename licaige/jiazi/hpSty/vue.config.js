const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias // 别名配置
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@http", resolve("src/http"))
      .set("@layout", resolve("src/layout"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@style", resolve("src/style"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"));
  },
});
