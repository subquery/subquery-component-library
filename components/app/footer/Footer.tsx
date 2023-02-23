// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Typography } from '../../common';
import * as React from 'react';
import styles from './Footer.module.css';

// TODO: simple supported: mail, wechat, twitter, medium , github, youtube, telegram, linkedin, bigger one for discord.
interface LinksProps {
  link: string;
  icon?: 'mail' | 'wechat' | 'medium' | 'twitter' | 'github' | 'telegram' | 'discord' | 'linkedin';
  label?: string;
}

const LinkButton: React.FC<LinksProps> = (props) => {
  return (
    <Button
      type="secondary"
      label={props.label}
      href={props.link}
      className={styles.iconButton}
      leftItem={<i className={`bi-${props.icon}`} role="img" aria-label={props.icon} />}
      target="_blank"
      rel="noreferrer"
    />
  );
};

const LinkButtonSimple: React.FC<LinksProps> = ({ label, link, icon }) => {
  return (
    <Button
      type="primary"
      label={label}
      href={link}
      className={styles.simpleIconButton}
      leftItem={icon && <img src={`/icons/${icon}.svg`} className={styles.simpleImage} alt={`${icon} logo`} />}
      target="_blank"
      rel="noreferrer"
    />
  );
};

const links: React.ComponentProps<typeof LinkButton>[] = [
  { link: 'mailto:hello@subquery.network', icon: 'mail' },
  { link: 'https://twitter.com/subquerynetwork', icon: 'wechat' },
  { link: 'https://medium.com/@subquery', icon: 'medium' },
  { link: 'https://twitter.com/subquerynetwork', icon: 'twitter' },
  { link: 'https://github.com/subquery', icon: 'github' },
  { link: 'https://t.me/subquerynetwork', icon: 'telegram' },
  { link: 'https://www.linkedin.com/company/subquery', icon: 'linkedin' },
];

const Default: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <Typography variant="h4">{'Join The Future'}</Typography>
        </div>
        <div className={styles.iconsContainer}>
          {links.map((l, i) => (
            <LinkButton {...l} key={i} />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <Typography variant="medium">Subquery © {new Date().getFullYear()}</Typography>
      </div>
    </div>
  );
};

const Simple: React.FC = () => {
  return (
    <div className={styles.simpleContainer}>
      <div className={styles.simpleIconsContainer}>
        {links.map((l, i) => (
          <LinkButtonSimple {...l} key={i} />
        ))}
        <div>
          <Button
            type="secondary"
            label={'Get support on Discord'}
            href={'https://discord.com/invite/78zg8aBSMG'}
            className={styles.simpleIconButton}
            leftItem={<img src={`/icons/discord.svg`} className={styles.simpleImage} alt={`discord logo`} />}
            target="_blank"
            rel="noreferrer"
          />
        </div>
      </div>
      <div className={styles.simpleBottom}>
        <Typography variant="medium">Subquery © {new Date().getFullYear()} Contribute</Typography>
      </div>
    </div>
  );
};

type FooterStyle = 'Default' | 'Simple';

export const Footer: React.FC<{ style: FooterStyle }> = ({ style = 'Default' }) => {
  return (
    <>
      {style === 'Default' && <Default />}
      {style === 'Simple' && <Simple />}
    </>
  );
};
