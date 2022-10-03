const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
	mode: "development",
	output: {
		publicPath: "http://localhost:3001/",
	},
	devServer: {
		port: 3001,
		historyApiFallback: {
			index: "/index.html",
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "mfe_home",
			filename: "remoteEntry.js",
			remotes: {},
			exposes: {
				"./Home": "./src/bootstrap",
			},
			shared: {
				...packageJson.dependencies,
				react: {
					singleton: true,
					requiredVersion: packageJson.dependencies.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: packageJson.dependencies["react-dom"],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
