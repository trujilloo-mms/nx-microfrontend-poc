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
                    //"./CounterApp1": "./src/app/components/CounterAppOne",
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

  config.plugins.push(
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    })
  );

  return config;
}

module.exports = getWebpackConfig;