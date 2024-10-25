import * as esbuild from 'esbuild'

performance.mark('build');
await esbuild.build({
  entryPoints: ['src/index.ts'],
  external: ['sharp'],
  bundle: true,
  outfile: 'dist/index.js',
  format: "esm",
  target: "esnext",
  platform: "node",
  sourcemap: 'linked',
  banner:{
    js: `
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        `
  },
})
// esbuild src/server.ts --format=esm --bundle --platform=node --outfile=dist/server.mjs --sourcemap=inline
console.log(performance.measure('build').duration + 'ms')
