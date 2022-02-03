const { ModuleFederationPlugin } = require("webpack").container;
const reactWebpackConfig = require('@nrwl/react/plugins/webpack');
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
        name: "main",
        remotes: {
            app1: 'app1@http://localhost:4201/remoteEntry.js',            
            app2: 'app2@http://localhost:4202/remoteEntry.js',
        },
        shared: {
            ...deps,
            react: { singleton: true, eager: true, requiredVersion: deps.react },
            "react-dom": {
                singleton: true,
                eager: true,
                requiredVersion: deps["react-dom"],
            },
        },
    }),
  );

  return config;
}

module.exports = getWebpackConfig;
