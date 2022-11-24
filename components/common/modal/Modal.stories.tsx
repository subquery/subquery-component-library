// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button, Typography } from '..';
import { Modal } from './Modal';

export default {
  title: 'General/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = React.useState<boolean>();
  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        label={' Open Modal'}
      />

      <Modal
        {...args}
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: 'Modal',
  submitText: 'Submit',
  onSubmit: () => {
    alert('You submit!');
  },
  description: 'This is simple description',
  children: (
    <div>
      <Typography>Hi, I am a modal.</Typography>
    </div>
  ),
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=389%3A5557',
  },
};

export const Danger = Template.bind({});

Danger.args = {
  title: 'Modal',
  submitText: 'Submit',
  onSubmit: () => {
    alert('You submit!');
  },
  danger: true,
  description: 'This is Modal with danger signal',
  children: (
    <div>
      <Typography>Hi, I am a modal.</Typography>
    </div>
  ),
};

Danger.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=389%3A5557',
  },
};

const TemplateStep: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = React.useState<boolean>();
  const [currStep, setCurrent] = React.useState<number>(0);
  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        label={' Open Modal'}
      />

      <Modal
        {...args}
        open={isOpen}
        currStep={currStep}
        onOk={() => setCurrent(currStep + 1)}
        onCancel={() => {
          if (currStep == 0) {
            setCurrent(0);
            setIsOpen(false);
          } else {
            setCurrent(currStep - 1);
          }
        }}
      />
    </div>
  );
};

export const Step = TemplateStep.bind({});

Step.args = {
  title: 'Modal',
  submitText: 'Submit',
  cancelText: 'close',
  okText: 'Next',
  steps: { size: 'small', items: ['Finished', 'In Progress', 'Waiting'] },
  danger: false,
};

Step.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=389%3A5557',
  },
};
