// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../Table';
import styles from './Button.module.css';
import { Typography } from '..';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    zeplinLink: 'https://app.zeplin.io/styleguide/61b2d0301695d44e531bd6d2/components?coid=61b2d2869bdcf54addd0b0d9',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: 'Button',
  type: 'primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: 'Button',
  type: 'secondary',
};

export const PrimaryWithIcon = Template.bind({});

PrimaryWithIcon.args = {
  label: 'Button',
  type: 'primary',
  leftItem: <i className="bi-plus" role="img" aria-label="Plus" />,
};

export const SecondaryWithIcon = Template.bind({});

SecondaryWithIcon.args = {
  label: 'Button',
  type: 'secondary',
  leftItem: <i className="bi-plus" role="img" aria-label="Plus" />,
};

export const SecondaryOnlyIcon = Template.bind({});

SecondaryOnlyIcon.args = {
  type: 'secondary',
  leftItem: <i className="bi-github" role="img" aria-label="GitHub" />,
};

export const GradientTextLink = Template.bind({});

GradientTextLink.args = {
  type: 'link',
  label: 'Button',
};

export const Loading = Template.bind({});

Loading.args = {
  // type: 'link',
  type: 'secondary',
  colorScheme: 'standard',
  label: 'Button',
  loading: true,
};

type ButtonProps = React.ComponentProps<typeof Button>;

const permutations: Array<[NonNullable<ButtonProps['colorScheme']>, NonNullable<ButtonProps['type']>]> = [
  ['gradient', 'primary'],
  ['gradient', 'secondary'],
  ['gradient', 'link'],
  ['standard', 'primary'],
  ['standard', 'secondary'],
  ['standard', 'link'],
  ['neutral', 'primary'],
  ['neutral', 'secondary'],
  ['neutral', 'link'],
];

const sizes: Array<Required<ButtonProps['size']>> = ['small', 'medium', 'large'];

export const All = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Size</TableCell>
          {permutations.map((p) => (
            <TableCell key={p[0] + p[1]}>{`${p[0]} ${p[1]}`}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sizes.map((size) => (
          <TableRow key={size}>
            <TableCell>
              <Typography>{size}</Typography>
            </TableCell>
            {permutations.map((p) => (
              <TableCell key={size + p[0] + p[1]}>
                <div /* style={{ display: 'flex', flexDirection: 'column', flexShrink: 0}}*/>
                  <Button size={size} colorScheme={p[0]} type={p[1]} label="Button" className={styles.stories} />
                  <Button
                    size={size}
                    colorScheme={p[0]}
                    type={p[1]}
                    label="Button"
                    className={styles.stories}
                    leftItem={<i className="bi-chat" role="img" aria-label="chat" />}
                  />
                  <Button
                    size={size}
                    colorScheme={p[0]}
                    type={p[1]}
                    label="Button"
                    className={styles.stories}
                    rightItem={<i className="bi-chevron-down" role="img" aria-label="chat" />}
                  />
                  <Button
                    size={size}
                    colorScheme={p[0]}
                    type={p[1]}
                    label="Button"
                    disabled={true}
                    className={styles.stories}
                    leftItem={<i className="bi-chat" role="img" aria-label="chat" />}
                  />
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
