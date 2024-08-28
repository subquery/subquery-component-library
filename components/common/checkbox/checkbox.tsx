// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Checkbox, CheckboxProps } from 'antd';
import { attachPropertiesToComponent } from 'components/utilities/attachPropertiesToCompnent';
import { useBem } from 'components/utilities/useBem';
import { FC } from 'react';
import { clsx } from 'clsx';
import { CheckboxGroupProps } from 'antd/es/checkbox';

import './checkbox.less';

export type SubqlCheckboxProps = CheckboxProps;

const innerCheckBox: FC<SubqlCheckboxProps> = ({ className, ...rest }) => {
  const bem = useBem('subql-checkbox');

  return <Checkbox className={clsx(bem(), className)} {...rest}></Checkbox>;
};

const innerCheckboxGroup: FC<
  {
    optionType?: 'plain' | 'button';
    shape?: 'round' | 'square';
  } & CheckboxGroupProps
> = ({ className, optionType = 'plain', shape = 'round', ...rest }) => {
  const bem = useBem('subql-checkbox-group');
  return <Checkbox.Group className={clsx(bem([optionType, shape]), className)} {...rest}></Checkbox.Group>;
};

export const SubqlCheckbox = attachPropertiesToComponent(innerCheckBox, {
  Group: innerCheckboxGroup,
});
