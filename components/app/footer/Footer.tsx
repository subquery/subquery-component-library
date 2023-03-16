// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Button, Typography } from '../../common';
import discordIcon from '../../../assets/icons/discord.svg';
import discordBlueIcon from '../../../assets/icons/discord_blue.svg';
import emailIcon from '../../../assets/icons/mail.svg';
import twitterIcon from '../../../assets/icons/twitter.svg';
import mediumIcon from '../../../assets/icons/medium.svg';
import githubIcon from '../../../assets/icons/github.svg';
import youtubeIcon from '../../../assets/icons/youtube.svg';
import telegramIcon from '../../../assets/icons/telegram.svg';
import linkedinIcon from '../../../assets/icons/linkedin.svg';
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
  { link: 'mailto:hello@subquery.network', icon: emailIcon },
  { link: 'https://twitter.com/subquerynetwork', icon: twitterIcon },
  { link: 'https://medium.com/@subquery', icon: mediumIcon },
  { link: 'https://github.com/OnFinality-io/subql', icon: githubIcon },
  { link: 'https://youtube.com/c/SubQueryNetwork', icon: youtubeIcon },
  { link: 'https://t.me/subquerynetwork', icon: telegramIcon },
  { link: 'https://www.linkedin.com/company/subquery', icon: linkedinIcon },
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
              leftItem={<img src={discordBlueIcon} alt="discord" />}
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
          label={GET_SUPPORT}
          href={DISCORD_INVITE_URL}
          className={styles.simpleIconButton}
          leftItem={<img src={discordIcon} alt="discord" />}
          target="_blank"
          rel="noreferrer"
        />
      </div>
      <div className={styles.simpleCopyRight}>
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

export interface IFooter {
  simple?: boolean;
}

export const Footer: React.FC<IFooter> = ({ simple }) => {
  if (simple) return <Simple />;
  return <Default />;
};
