import path from 'path';
import license from 'rollup-plugin-license';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  moduleName: 'ShopifyAdminHelper',
  entry: 'src/index.user.js',
  dest: './dist/index.user.js',
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      extensions: [
        '.js',
        '.json',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      compact: false,
      presets: [
        [
          'es2015',
          {
            modules: false,
          },
        ],
      ],
    }),
    commonjs(),
    license({
      disableBlock: true,
      banner: {
        file: path.join(__dirname, 'TamperMonkey.txt'),
        encoding: 'utf-8', // Default is utf-8
      },
    }),
  ],
  format: 'iife',
};
