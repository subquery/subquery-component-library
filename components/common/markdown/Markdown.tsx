// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, useState } from 'react';
import { createBEM } from 'components/utilities/createBem';
import clsx from 'clsx';
import MarkdownCompiler, { Options } from 'react-markdown';
import { attachPropertiesToComponent } from '../../utilities/attachPropertiesToCompnent';
import { Input, Radio } from 'antd';
import { Typography } from '../typography';
import { usePropsValue } from 'components/utilities/usePropsValue';
import { TextAreaProps } from 'antd/es/input';

import './markdown.less';

const bem = createBEM('subql-markdown');
const previewBem = createBEM('subql-markdown-preview');

export interface SubqlMarkdown {
  value?: string | undefined;
  onChange?: (val: string | undefined) => void;
  inputProps?: TextAreaProps;
  previewProps?: Options;
}

const MarkdownPreview: FC<Options> = (props) => {
  return (
    <div className={clsx(previewBem())}>
      <MarkdownCompiler {...props}></MarkdownCompiler>
    </div>
  );
};

const Markdown: FC<SubqlMarkdown> = (props) => {
  const [tabVal, setTabVal] = useState<'edit' | 'preview'>('edit');
  const [markdownVal, setMarkdownVal] = usePropsValue({
    value: props.value,
    defaultValue: '',
    onChange: props.onChange,
  });
  return (
    <div className={clsx(bem())}>
      <div className={clsx(bem('header'))}>
        <Radio.Group
          value={tabVal}
          onChange={(val) => {
            setTabVal(val.target.value);
          }}
          optionType="button"
        >
          <Radio value={'edit'}>Markdown Edit</Radio>
          <Radio value={'preview'}>Preview</Radio>
        </Radio.Group>
        <span style={{ flex: 1 }}></span>
        <Typography type="secondary" variant="small">
          This entry supports{' '}
          <Typography.Link href="https://commonmark.org/help/" active variant="small">
            &#32;basic markdown
          </Typography.Link>
        </Typography>
      </div>

      <div className={clsx(bem('main'))}>
        {tabVal === 'edit' && (
          <Input.TextArea
            rows={20}
            placeholder={`You can provide a detailed description of your SubQuery project.

# hello world
- you can use lists
- *Italics*
- *bold*
- [Links](http://subquery.network)
                    `}
            {...props.inputProps}
            value={markdownVal}
            onChange={(val) => {
              setMarkdownVal(val.target.value);
            }}
          ></Input.TextArea>
        )}
        {tabVal === 'preview' && <MarkdownPreview {...props.previewProps}>{markdownVal}</MarkdownPreview>}
      </div>
    </div>
  );
};

export default attachPropertiesToComponent(Markdown, {
  Preview: MarkdownPreview,
});
