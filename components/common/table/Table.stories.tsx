// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TableTitle, TableText, Table } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'General/Table',
  component: Table,
} as ComponentMeta<any>;

const columns = [
  {
    dataIndex: 'id',
    title: <TableTitle title="id" />,
    render: (val: string) => <TableText>{val}</TableText>,
  },
  {
    dataIndex: 'text',
    title: <TableTitle title="content" tooltip="This is the tooltip for text" />,
    render: (val: string) => <TableText>{val}</TableText>,
  },
];

const dataSource = [
  { id: 0, text: 'text0' },
  { id: 1, text: 'text1' },
];

const Template: ComponentStory<any> = (args) => <Table tableProps={{ columns, rowKey: 'id', dataSource }} />;

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=578%3A7045',
  },
};
