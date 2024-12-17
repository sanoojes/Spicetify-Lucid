const namespace = "lucid";
const externalGlobalPlugin = (externals) => {
	return {
		name: namespace,
		setup(build) {
			build.onResolve(
				{
					filter: new RegExp(`^(${Object.keys(externals).join("|")})$`),
				},
				(args) => ({
					path: args.path,
					namespace,
				}),
			);
			build.onLoad(
				{
					filter: /.*/,
					namespace,
				},
				(args) => {
					const contents = `module.exports = ${externals[args.path]}`;
					return {
						contents,
					};
				},
			);
		},
	};
};
export { externalGlobalPlugin };
