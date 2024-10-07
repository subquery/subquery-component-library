// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

// use require for storybook compatible, some library in yarn.lock only have cjs version of low version.
// if upgrade them may cause storybook crush.
// TODO: use other lightweight document replace storybook

const path = require('node:path');
const typescript = require('@rollup/plugin-typescript');
const svg = require('rollup-plugin-svg');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');

const fs = require('fs');

function getExtension(filename) {
  const match = filename.match(/(\.d\.ts)$/);
  return match ? match[1] : path.extname(filename);
}

function getSubfolders(directoryPath) {
  let result = [];
  const subfolders = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(directoryPath, dirent.name));

  result = result.concat(subfolders);

  subfolders.forEach((subfolder) => {
    result = result.concat(getSubfolders(subfolder));
  });

  return result;
}

function renameDeclarationFiles() {
  return {
    name: 'rename-declaration-files',
    writeBundle() {
      const directories = [path.join(__dirname, 'dist'), ...getSubfolders(path.join(__dirname, 'dist'))];

      directories.forEach((directoryPath) => {
        fs.readdir(directoryPath, (err, files) => {
          if (err) {
            return console.log('Unable to scan directory: ' + err);
          }

          files.forEach((file) => {
            if (getExtension(file) === '.d.ts') {
              const oldPath = path.join(directoryPath, file);
              let newPath = path.join(directoryPath, file.replace('.d.ts', '.cjs.d.ts'));
              if (newPath.includes('dist/index.cjs.d.ts')) {
                newPath = newPath.replace('dist/index.cjs.d.ts', 'dist/subquery-components.cjs.d.ts');
              }
              fs.copyFile(oldPath, newPath, (err) => {
                if (err) {
                  console.log('Error renaming file: ' + err);
                }
              });
            }
          });
        });
      });
    },
  };
}

const outputOptions = {
  // TODO arrange them.
  globals: {
    react: 'react',
    antd: 'antd',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    '@ant-design/icons': '@ant-design/icons',
    clsx: 'clsx',
    graphiql: 'graphiql',
    '@graphiql/toolkit': '@graphiql/toolkit',
    'use-screen': 'use-screen',
    'react-icons/ai': 'react-icons/ai',
    'react-icons/io5': 'react-icons/io5',
    'react-jazzicon': 'react-jazzicon',
    'react-icons/bs': 'react-icons/bs',
    'react-icons/pi': 'react-icons/pi',
    'react-icons/fa6': 'react-icons/fa6',
    'react-icons/fi': 'react-icons/fi',
    'react-icons/ri': 'react-icons/ri',
    'react-icons/md': 'react-icons/md',
    'antd/es/card/Meta': 'antd/es/card/Meta',
    'antd/dist/reset.css': 'antd/dist/reset.css',
    'graphiql/graphiql.min.css': 'graphiql/graphiql.min.css',
  },
};

const resolvePath = (str) => path.resolve(__dirname, str);

const plugins = [
  postcss({
    minimize: true,
    modules: false,
    use: {
      less: { javascriptEnabled: true },
    },
    extract: 'subquery-components.css',
  }),
  svg(),
  terser(),
  copy({
    targets: [
      {
        src: 'components/assets',
        dest: 'dist',
      },
    ],
  }),
];

const esConfig = {
  input: {
    'subquery-components.es': path.resolve('components/index.ts'),
    'common/GraphiQL/index': path.resolve('components/common/GraphiQL/index.ts'),
  },
  external: [
    'react',
    'react-dom',
    'antd',
    'node_modules/*',
    'react-router-dom',
    'react/jsx-runtime',
    'clsx',
    'graphiql',
    /^@graphiql\/.*/,
    'use-screen',
    'react-icons/ai',
    'react-icons/io5',
    'react-jazzicon',
    'antd/es/card/Meta',
    'react-icons/bs',
    'react-icons/pi',
    'react-icons/fa6',
    'react-icons/fi',
    'react-icons/ri',
    'uuid',
    'localforage',
    'antd/dist/reset.css',
    'graphiql/graphiql.min.css',
    /^@ant-design\/icons\/.*/,
    'react-markdown',
    'jdenticon',
    'lodash-es',
    'ahooks',
  ],
  output: [
    {
      ...outputOptions,
      format: 'es',
      dir: 'dist',
    },
  ],
  plugins: [
    ...plugins,
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      rootDir: resolvePath('components/'),
      declaration: true,
      declarationDir: resolvePath('dist'),
      exclude: [resolvePath('assets/**'), resolvePath('node_modules/**')],
      allowSyntheticDefaultImports: true,
    }),
  ],
};

const cjsConfig = {
  ...esConfig,
  input: {
    'subquery-components.cjs': path.resolve('components/index.ts'),
    'common/GraphiQL/index.cjs': path.resolve('components/common/GraphiQL/index.ts'),
  },
  output: [
    {
      ...outputOptions,
      format: 'cjs',
      dir: 'dist',
    },
  ],
  plugins: [
    ...plugins,
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      rootDir: resolvePath('components/'),
      declaration: true,
      declarationDir: resolvePath('dist'),
      exclude: [resolvePath('assets/**'), resolvePath('node_modules/**')],
      allowSyntheticDefaultImports: true,
    }),
    renameDeclarationFiles(),
  ],
};

// cjsConfig
export default [esConfig];
