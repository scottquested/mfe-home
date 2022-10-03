const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].js",
		publicPath: "/home/",
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
	],
};

module.exports = merge(commonConfig, prodConfig);
