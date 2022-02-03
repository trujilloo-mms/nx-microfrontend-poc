"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDate = new Date().toLocaleString();
const deps = require("../../package.json").dependencies;
// Add React-specific configuration
function getWebpackConfig(config, argv) {
    const isProduction = config.mode === "production";
	console.log({ isProduction });
    var _a;
    config.node = {global: true};    
    config.module.rules.push({
        test: /\.(png|jpe?g|gif|webp|png|woff|woff2|eot|ttf|svg)$/,
        loader: require.resolve('url-loader'),
        options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]',
        },
    }, {
        test: /\.svg$/,
        oneOf: [
            // If coming from JS/TS or MDX file, then transform into React component using SVGR.
            {
                issuer: /\.(js|ts|md)x?$/,
                use: [
                    {
                        loader: require.resolve('@svgr/webpack'),
                        options: {
                            svgo: false,
                            titleProp: true,
                            ref: true,
                        },
                    },
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                            esModule: false,
                        },
                    },
                ],
            },
            // Fallback to plain URL loader.
            {
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                        },
                    },
                ],
            },
        ],
    });
    if (config.mode === 'development' && ((_a = config['devServer']) === null || _a === void 0 ? void 0 : _a.hot)) {
        // add `react-refresh/babel` to babel loader plugin
        const babelLoader = config.module.rules.find((rule) => {
            var _a;
            return typeof rule !== 'string' &&
                ((_a = rule.loader) === null || _a === void 0 ? void 0 : _a.toString().includes('babel-loader'));
        });
        if (babelLoader && typeof babelLoader !== 'string') {
            babelLoader.options['plugins'] = [
                ...(babelLoader.options['plugins'] || []),
                [
                    require.resolve('react-refresh/babel'),
                    {
                        skipEnvCheck: true,
                    },
                ],
            ];
        }
        // add https://github.com/pmmmwh/react-refresh-webpack-plugin to webpack plugin
        config.plugins.push(new ReactRefreshPlugin());
        config.plugins.push(new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }));
        config.plugins.push(
            new ModuleFederationPlugin({
				name: "main",
				remotes: {
					app1: 'app1@http://localhost:3001/remoteEntry.js',
					//myapp2: isProduction ? process.env.PROD_APP2 : process.env.DEV_APP2,
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
    }
    // config.plugins.push(new HtmlWebpackPlugin({
    //   template:
    //     './src/index.html',
    // }),)
    return config;
}
module.exports = getWebpackConfig;
//# sourceMappingURL=webpack.js.map