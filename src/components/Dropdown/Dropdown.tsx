// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import clsx from 'clsx';
import * as React from 'react';
import { Button, Typography } from '..';
import styles from './Dropdown.module.css';

type Item = {
  key: string;
  label?: string;
};

type Props = {
  items: Item[];
  selected?: number;
  onSelected?: (key: string, index: number) => void;
  className?: string;
  dropdownClass?: string;
  listClassName?: string;
} & React.ComponentProps<typeof Button>;

function getItemsText(item: Item | undefined): string | undefined {
  return item?.label ?? item?.key;
}

const DropdownItem: React.FC<{ item: Item; className?: string; onClick?: () => void }> = ({
  item,
  className,
  onClick,
}) => {
  if (!item) return null;

  return (
    <Typography key={item.key} className={clsx(styles.listItem, className)} onClick={onClick}>
      {getItemsText(item)}
    </Typography>
  );
};

const Dropdown: React.FC<Props> = ({
  selected,
  onSelected,
  className,
  listClassName,
  dropdownClass,
  items,
  children,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleOpen = () => setIsOpen((open) => !open);

  const handleSelected = (key: string, index: number) => {
    setIsOpen(false);
    onSelected?.(key, index);
  };

  const renderOpen = () => {
    if (!isOpen) return null;

    return (
      <div className={clsx(styles.list, listClassName)}>
        {items.map((item, idx) => (
          <DropdownItem
            key={item.key}
            item={item}
            onClick={() => handleSelected(item.key, idx)}
            className={selected === idx ? styles.selected : undefined}
          />
        ))}
      </div>
    );
  };

  if (!items?.length) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className)}>
      <Button
        type="secondary"
        size="medium"
        colorScheme="standard"
        {...rest}
        className={dropdownClass}
        label={!children ? getItemsText(items[selected ?? 0]) : undefined}
        onClick={toggleOpen}
        leftItem={children && <div className={styles.children}>{children}</div>}
        rightItem={
          <i
            className={`bi-chevron-${isOpen ? 'up' : 'down'}`}
            role="img"
            aria-label={`chevron-${isOpen ? 'up' : 'down'}`}
          />
        }
      />
      {renderOpen()}
    </div>
  );
};

export default Dropdown;
