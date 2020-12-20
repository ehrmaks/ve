module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.jookbob2.redstone",
        nsis: {
          shortcutName: "Red stone"
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: ["x64", "ia32"]
            }
          ]
        }
      }
    }
  }
};
