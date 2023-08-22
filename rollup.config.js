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
    'antd/es/card/Meta': 'antd/es/card/Meta',
    'antd/dist/reset.css': 'antd/dist/reset.css',
    'graphiql/graphiql.min.css': 'graphiql/graphiql.min.css',
  },
};

const resolvePath = (str) => path.resolve(__dirname, str);

export default {
  input: path.resolve('components/index.ts'),
  external: [
    'react',
    'react-dom',
    'antd',
    'node_modules/*',
    'react-router-dom',
    'react/jsx-runtime',
    'clsx',
    '@ant-design/icons',
    'graphiql',
    '@graphiql/toolkit',
    'use-screen',
    'react-icons/ai',
    'react-icons/io5',
    'react-jazzicon',
    'antd/es/card/Meta',
    'react-icons/bs',
    'antd/dist/reset.css',
    'graphiql/graphiql.min.css',
  ],
  output: [
    {
      ...outputOptions,
      format: 'es',
      name: 'esm',
      file: 'dist/subquery-components.es.js',
    },
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      rootDir: resolvePath('components/'),
      declaration: true,
      declarationDir: resolvePath('dist'),
      exclude: [resolvePath('assets/**'), resolvePath('node_modules/**')],
      allowSyntheticDefaultImports: true,
    }),
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
  ],
};
