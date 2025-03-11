import { fetchAndCache } from '@utils/fetchAndCache.ts';
import {
  APPLICATION_VERSION,
  CHANGELOG_DATA_STORAGE_KEY,
  CHANGELOG_DATA_URLS,
  LUCID_VERSION_STORAGE_KEY,
} from '@app/constant.ts';
import { Modal } from '@components/modal.ts';
import appSettingsStore from '@store/setting.ts';
import { Changelog, type ChangelogData } from '@components/changelog/changelog.ts';

async function getChangelogData(): Promise<ChangelogData> {
  try {
    const changelogData = await fetchAndCache(
      CHANGELOG_DATA_URLS,
      CHANGELOG_DATA_STORAGE_KEY,
      21600
    );

    const parsedData = JSON.parse(changelogData);
    return parsedData as ChangelogData;
  } catch (error) {
    console.error('Error fetching changelog.', error);
    return [];
  }
}

export async function mountChangelog(targetElement: HTMLElement = document.body) {
  if (!appSettingsStore.getState().showChangelog) return;
  // if (!window.Modal) {
  //   console.error('window.Modal not found.');
  //   return;
  // }

  const data = await getChangelogData();

  if (typeof data === 'object' && data.length < 1) {
    console.error('Changelog data not found.');
    return;
  }

  const modal = new Modal();
  modal.setHeader('Lucid Changelog');
  const element = new Changelog(data);

  const hasShown = localStorage.getItem(LUCID_VERSION_STORAGE_KEY) === APPLICATION_VERSION;

  if (!hasShown || element.hasUpdate) {
    modal.setContent(element);
    targetElement.appendChild(modal);
    modal.open();

    localStorage.setItem(LUCID_VERSION_STORAGE_KEY, APPLICATION_VERSION);
  } else {
    console.debug('Changelog update available, but already shown for this version.');
  }
}
mountChangelog();
