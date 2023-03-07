// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Typography } from '../../common';
import * as React from 'react';
import styles from './Footer.module.css';
interface LinksProps {
  link: string;
  icon: string;
}

const links: LinksProps[] = [
  { link: 'mailto:hello@subquery.network', icon: '/icons/mail.svg' },
  { link: 'https://twitter.com/subquerynetwork', icon: '/icons/twitter.svg' },
  { link: 'https://medium.com/@subquery', icon: '/icons/medium.svg' },
  { link: 'https://github.com/OnFinality-io/subql', icon: '/icons/github.svg' },
  { link: 'https://youtube.com/c/SubQueryNetwork', icon: '/icons/youtube.svg' },
  { link: 'https://t.me/subquerynetwork', icon: '/icons/telegram.svg' },
  { link: 'https://www.linkedin.com/company/subquery', icon: '/icons/linkedin.svg' },
];

export const IconLinks: React.FC = () => (
  <div className={styles.icons}>
    {links.map(({ link, icon }) => (
      <a href={link} key={link} target="_blank" rel="noreferrer">
        <img src={icon} className={styles.icon} />
      </a>
    ))}
  </div>
);

const Default: React.FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.primaryRow}>
          <div className={styles.contact}>
            <h5>Join the Future</h5>
            <IconLinks />
          </div>
          <div className={styles.discord}>
            <Button
              type="secondary"
              colorScheme="standard"
              href="https://discord.com/invite/subquery"
              leftItem={<img src={'/icons/discord_blue.svg'} alt="discord" />}
              label={'Get Supported On Discord'}
              size="large"
            />
          </div>
        </div>
        <div className={styles.secondaryRow}>
          <Typography variant="medium">Subquery © {new Date().getFullYear()}</Typography>
        </div>
      </div>
    </div>
  );
};

const Simple: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <IconLinks />
        <Button
          type="primary"
          colorScheme="neutral"
          label={'Get support on Discord'}
          href={'https://discord.com/invite/78zg8aBSMG'}
          className={styles.simpleIconButton}
          leftItem={<img src={'/icons/discord.svg'} alt="discord" />}
          target="_blank"
          rel="noreferrer"
        />
      </div>
      <div className={styles.simpleBottom}>
        <Typography variant="medium">
          Subquery © {new Date().getFullYear()}
          <a className={styles.bottomLink}>Contribute</a>
        </Typography>
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
