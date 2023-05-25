// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'node:path';
import typescript from '@rollup/plugin-typescript';
import css from "rollup-plugin-import-css";
import svg from 'rollup-plugin-svg'
import { terser } from "rollup-plugin-terser";

const outputOptions = {
  // TODO arrange them.
  globals: {
    react: 'react',
    antd: 'antd',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    '@ant-design/icons': '@ant-design/icons',
    'clsx': 'clsx',
    'graphiql': 'graphiql',
    '@graphiql/toolkit': '@graphiql/toolkit',
    'use-screen': 'use-screen',
    'react-icons/ai': 'react-icons/ai',
    'react-icons/io5': 'react-icons/io5',
    'react-jazzicon': 'react-jazzicon',
    'react-icons/bs': 'react-icons/bs',
    'antd/es/card/Meta': 'antd/es/card/Meta',
    'antd/dist/reset.css': 'antd/dist/reset.css',
    'graphiql/graphiql.min.css': 'graphiql/graphiql.min.css'
  },
}

const resolvePath = str => path.resolve(__dirname, str);

export default {
  input: path.resolve('components/index.ts'),
  external: [
              'react', 'react-dom', 'antd', 'node_modules/*', 
              'react-router-dom', 'react/jsx-runtime', 'clsx', '@ant-design/icons', 'graphiql', '@graphiql/toolkit',
              'use-screen', 'react-icons/ai', 'react-icons/io5', 'react-jazzicon', 'antd/es/card/Meta',
              'react-icons/bs', 'antd/dist/reset.css', 'graphiql/graphiql.min.css'
            ],
  output: [
    {
      ...outputOptions,
      format: 'es',
      name: 'esm',
      file: "dist/subquery-components.es.js"
    }, 
    {
      ...outputOptions,
      format: 'umd',
      name: 'umd',
      file: 'dist/subquery-components.umd.js'
    }
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      rootDir: resolvePath("components/"),
      declaration: true,
      declarationDir: resolvePath("dist"),
      exclude: [resolvePath("assets/**"), resolvePath("node_modules/**")],
      allowSyntheticDefaultImports: true,
    }),
    css(),
    svg(),
    terser()
  ],
};
