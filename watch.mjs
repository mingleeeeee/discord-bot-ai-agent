import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
  entryPoints: ['src/index.ts'],
  external: ['sharp'],
  bundle: true,
  outdir: 'dist',
  // outfile: 'dist/server.js',
  format: "esm",
  target: "esnext",
  platform: "node",
  sourcemap: 'inline',
  banner:{
    js: `
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        `
  },
  plugins: [{
    name: 'on-end',
    setup(build) {
      build.onStart(() => {
        console.log('build started...');
        performance.mark('build');
      })
      build.onEnd((result) => {
        console.log(`build finished: ${performance.measure('build-end','build').duration}ms`);
      })
    }
  }]
})

await ctx.watch()
