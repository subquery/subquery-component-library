// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button, Typography } from '../../common';
import * as React from 'react';
import styles from './Footer.module.css';

const DISCORD_INVITE_URL = 'https://discord.com/invite/subquery';
const CONTRIBUTE_URL = 'https://academy.subquery.network/miscellaneous/contributing.html';

const GET_SUPPORT = 'Get Supported On Discord';
const JOIN = 'Join the Future';
const CONTRIBUTE = 'Contribute';
const COPYRIGHT = `Subquery © ${new Date().getFullYear()}`;

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
            <h5>{JOIN}</h5>
            <IconLinks />
          </div>
          <div className={styles.discord}>
            <Button
              type="secondary"
              colorScheme="standard"
              href={DISCORD_INVITE_URL}
              leftItem={<img src={'/icons/discord_blue.svg'} alt="discord" />}
              label={GET_SUPPORT}
              size="large"
            />
          </div>
        </div>
        <div className={styles.secondaryRow}>
          <Typography variant="medium">{COPYRIGHT}</Typography>
        </div>
      </div>
    </div>
  );
};

const Simple: React.FC = () => {
  return (
    <div className={styles.simpleContainer}>
      <div className={styles.iconsContainer}>
        <IconLinks />
        <Button
          type="primary"
          colorScheme="neutral"
          label={GET_SUPPORT}
          href={DISCORD_INVITE_URL}
          className={styles.simpleIconButton}
          leftItem={<img src={'/icons/discord.svg'} alt="discord" />}
          target="_blank"
          rel="noreferrer"
        />
      </div>
      <div className={styles.simpleBottom}>
        <Typography variant="medium">
          {COPYRIGHT}
          <a href={CONTRIBUTE_URL} className={styles.bottomLink}>
            {CONTRIBUTE}
          </a>
        </Typography>
      </div>
    </div>
  );
};

interface IFooter {
  simple?: boolean;
}

export const Footer: React.FC<IFooter> = ({ simple }) => {
  if (simple) return <Simple />;
  return <Default />;
};
