const {
  FuseBox,
  CSSPlugin,
  SassPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  Sparky
} = require('fuse-box');

let fuse, app, vendor, isProduction;

Sparky.task('config', () => {
  fuse = new FuseBox({
    homeDir: './',
    sourceMaps: !isProduction,
    hash: isProduction,
    target: 'browser',
    output: '../dist/$name.js',
    useTypescriptCompiler: true,
    experimentalFeatures: true,
    plugins: [
      [SassPlugin(), CSSPlugin()],
      WebIndexPlugin({
        template: './index.html'
      }),
      isProduction &&
        QuantumPlugin({
          treeshake: true,
          uglify: true
        })
    ]
  });
  // vendor
  vendor = fuse.bundle('vendor').instructions('~ index.tsx');

  // bundle app
  app = fuse.bundle('app').instructions('> [index.tsx]');
});

//Sparky.task('copy', () => Sparky.src('src/images/**/*.(jpg|png|gif|svg)').dest('../dist/assets'));
Sparky.task('favicon-copy', () => Sparky.src("./favicon.ico", { base: './' }).dest('../dist'));

Sparky.task('default', ['clean', 'config', "favicon-copy"], () => {
  fuse.dev();
  // add dev instructions
  app.watch().hmr();
  return fuse.run();
});

Sparky.task('clean', () => Sparky.src('../dist/').clean('../dist/'));
Sparky.task('prod-env', ['clean'], () => {
  isProduction = true;
});
Sparky.task('dist', ['prod-env', 'config', "favicon-copy"], () => {
  // comment out to prevent dev server from running (left for the demo)
  fuse.dev();
  return fuse.run();
});
