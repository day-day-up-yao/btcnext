import React, { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';

import PageLayout from '../../components/layout/PageLayout';
import DocSidebar from '@theme/DocSidebar';
import styles from './styles.module.css';
import { navpageinfolist } from '../../../navgatinfo.js';

export default () => {
  const exterlinklist = [
    {
      name: 'internet',
      imgpath: 'img/internet.svg',
      altdesc: 'internet',
    },
    {
      name: 'twitter',
      imgpath: 'img/twitter.svg',
      altdesc: 'twitter',
    },
    {
      name: 'github',
      imgpath: 'img/githubicon.svg',
      altdesc: 'github',
    },
    {
      name: 'discord',
      imgpath: 'img/discordicon.svg',
      altdesc: 'discord',
    },
  ];

//   const [itempath, setItempath] = useState('')

// const alllink = window.location.href
//   const linklist = alllink.split('#')
//   if (linklist.length > 1) {
//     setItempath(linklist[1])
//     // itempath = linklist[1]
//   }
//   console.log(itempath)

  const getExterInfo = (itemexterlink) => {
    let newlinklist = []
    for(let a = 0; a < exterlinklist.length; a++) {
      for(let b = 0; b < itemexterlink.length; b++) {
        if (exterlinklist[a].name === itemexterlink[b].name) {
            itemexterlink[b].imgpath = exterlinklist[a].imgpath
            newlinklist.push(itemexterlink[b])
        }
      }
    }
    return newlinklist
  }

  const ItemCard = useCallback((sitem, sindex) => {
    return (
      <div className={styles.navListBoxItem} key={sindex}>
        <div className={styles.navListBoxItemTop}>
          <img
            className={styles.imgAvatornav}
            src={sitem.avator}
            alt=""
          />
          <div className={styles.navitemName}>{sitem.title}</div>
        </div>
        <div className={styles.navItemdesc}>
          {sitem.desc}
        </div>
        <div className={styles.navItemTag}>
          {sitem.tags.map((tagitem, tagindex) => (
            <div className={styles.navItemTagItem}>{tagitem}</div>
          ))}
        </div>
        <div className={styles.navItemlinklist}>
          {getExterInfo(sitem.exterlink)?.map((exitem, exindex) => {
            return (
              <a href={exitem.link} key={exindex}>
                <img src={exitem.imgpath} alt={exitem.altdesc} />
              </a>
            );
          })}
        </div>
      </div>
    );
  }, []);

  return (
    <PageLayout>
      <div className={styles.navigatorCenter}>
        <aside
          className={styles.docSidebarContainer}
          // onTransitionEnd={handleTransitionEnd}
          role="complementary">
          <DocSidebar
            key={
              // Reset sidebar state on sidebar changes
              // See https://github.com/facebook/docusaurus/issues/3414
              'defaultSidebar'
            }
            sidebar={navpageinfolist}
            // path={itempath}
            // sidebarCollapsible={true}
            // isHidden={false}
          />
        </aside>
        <div className={styles.navigatorCenterRight}>
          {navpageinfolist.map((item, index) => {
            return (
              <div className={styles.navigatorCenterRightItem} key={index}>
                <div className={styles.navItemfirstTitle}>
                  {item?.label}
                </div>
                {item.items.map((fitem, findex) => {
                  return <div key={findex} key={findex}>
                  <div id={fitem?.docId}/>
                  <div className={styles.navItemsecondTitle}>{fitem?.label}</div>
                  <div className={styles.navListBox}>
                    {fitem?.nextitems.map((sitem, sindex) => ItemCard(sitem, sindex))}
                  </div>
                </div>
                })}
                
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};
