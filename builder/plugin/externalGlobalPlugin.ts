import type { PluginBuild } from 'esbuild';

export const externalGlobalPlugin = (externals: Record<string, string>) => {
  const namespace = 'external-global';
  return {
    name: namespace,
    setup(build: PluginBuild) {
      build.onResolve(
        {
          filter: new RegExp(`^(${Object.keys(externals).join('|')})$`),
        },
        (args) => ({
          path: args.path,
          namespace,
        })
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
        }
      );
    },
  };
};
