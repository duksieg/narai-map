const { default: LeafletMap } = require("./src/components/leafletmap")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html" || stage === "develop-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /leaflet/dist/LeafletMap,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }