// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Button, Typography } from '../../common';
import {
  BsDiscord,
  BsFillEnvelopeFill,
  BsTwitter,
  BsGithub,
  BsYoutube,
  BsMedium,
  BsTelegram,
  BsLinkedin,
} from 'react-icons/bs';
import styles from './Footer.module.css';
import clsx from 'clsx';
import { useIsMobile } from 'components/utilities/useIsMobile';

const DISCORD_INVITE_URL = 'https://discord.com/invite/subquery';
const CONTRIBUTE_URL = 'https://academy.subquery.network/miscellaneous/contributing.html';

const GET_SUPPORT = 'Get Support On Discord';
const JOIN = 'Join the Future';
const CONTRIBUTE = 'Contribute';
const COPYRIGHT = `Subquery © ${new Date().getFullYear()}`;

interface LinksProps {
  link: string;
  icon: React.ReactNode;
  allLinks?: boolean;
}

const links: LinksProps[] = [
  { link: 'mailto:hello@subquery.network', icon: <BsFillEnvelopeFill /> },
  { link: 'https://twitter.com/subquerynetwork', icon: <BsTwitter /> },
  { link: 'https://medium.com/@subquery', icon: <BsMedium /> },
  { link: 'https://github.com/OnFinality-io/subql', icon: <BsGithub /> },
  { link: 'https://youtube.com/c/SubQueryNetwork', icon: <BsYoutube /> },
  { link: 'https://t.me/subquerynetwork', icon: <BsTelegram /> },
  { link: 'https://www.linkedin.com/company/subquery', icon: <BsLinkedin /> },
  { link: 'https://discord.com/invite/subquery', icon: <BsDiscord /> },
];

export const IconLinks: React.FC<{ allLinks?: boolean }> = ({ allLinks = true }) => (
  <div className={styles.icons}>
    {allLinks
      ? links.map(({ link, icon }) => (
          <a href={link} key={link} target="_blank" rel="noreferrer">
            <div className={styles.icon}>{icon}</div>
          </a>
        ))
      : links.slice(0, -1).map(({ link, icon }) => (
          <a href={link} key={link} target="_blank" rel="noreferrer">
            <div className={styles.icon}>{icon}</div>
          </a>
        ))}
  </div>
);

const Default: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={styles.footerWrapper}>
      <div className={clsx(styles.footer, isMobile && styles.mFooter)}>
        <div className={styles.primaryRow}>
          <div className={styles.joinTitle}>
            <h5>{JOIN}</h5>
          </div>
          <div className={clsx(styles.socialLinks, isMobile && styles.mSocialLinks)}>
            <IconLinks allLinks={false} />
            <Button
              type="secondary"
              colorScheme="standard"
              href={DISCORD_INVITE_URL}
              leftItem={<BsDiscord />}
              label={GET_SUPPORT}
              size={isMobile ? 'small' : 'medium'}
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
      </div>
      <div className={styles.simpleCopyRight}>
        <Typography variant="small" type="neutral">
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
