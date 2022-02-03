const { ModuleFederationPlugin } = require("webpack").container;
const reactWebpackConfig = require('@nrwl/react/plugins/webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const deps = require("../../package.json").dependencies;

function getWebpackConfig(config) {
  config = reactWebpackConfig(config);
  config.optimization = {
    ...config.optimization,
    runtimeChunk: false,
    splitChunks: {
      chunks(chunk) {
        return false;
      },
    },
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
          // expose each component
          "./mainApp": "../myapp1/src/app/app",
      },
      shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
          },
      },
    }),
  );

  return config;
}

module.exports = getWebpackConfig;