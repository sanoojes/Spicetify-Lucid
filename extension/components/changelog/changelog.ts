import { APPLICATION_VERSION } from '@app/constant.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';

export type ChangelogEntry = {
  version: string;
  date: string;
  desc?: string;
  changes: {
    Added: string[];
    Changed: string[];
    Deprecated: string[];
    Removed: string[];
    Fixed: string[];
    Security: string[];
  };
};

export type ChangelogData = ChangelogEntry[];

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;

    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }

  return 0;
}

export class Changelog extends HTMLElement {
  protected _data: ChangelogData | null = null;
  protected _currentVersion: string | null;
  public hasUpdate = false;

  constructor(data?: ChangelogData) {
    super();

    this._currentVersion = APPLICATION_VERSION;
    if (data) {
      this._data = data;
      this.hasUpdate = this.checkForUpdate();
    }
  }

  connectedCallback() {
    lazyLoadStyleById('lucid-changelog').textContent =
      '.changelog-entry,.update-available-header {  padding: 1rem 1rem;  background-color: rgba(var(--clr-on-secondary-rgb), 0.5);  color: var(--clr-secondary);  margin-bottom: 0.5rem;  border-radius: 0.5rem;}.update-available-header {  text-align: center;  font-size: 1.8em;  color: var(--clr-primary);}.changelog-entry > p {  margin-bottom: 0.5rem;}.changes-wrapper {  display: flex;  flex-wrap: wrap;  gap: 0.5rem;}.changelog-entry,.update-available-header,.change-card {  border: var(--border-thickness, 1px) var(--border-style, solid)    var(--border-color, var(--clr-surface-5, #1c1b1e));}.change-card {  flex-grow: 1;  padding: 10px;  border-radius: 0.75rem;  min-width: 10em;}.change-card:nth-child(2n) {  background-color: rgba(var(--clr-on-primary-rgb), 0.7);  color: var(--clr-primary);}.change-card:nth-child(2n + 1) {  background-color: rgba(var(--clr-on-secondary-rgb), 0.7);  color: var(--clr-secondary);}.change-card:nth-child(2n + 3) {  background-color: rgba(var(--clr-on-tertiary-rgb), 0.7);  color: var(--clr-tertiary);}.change-card li {  list-style: disc;  margin-left: 2rem;}.change-card li:marker {  right: 4px;}';
    this.render();
  }

  checkForUpdate(): boolean {
    if (this._data && this._data.length > 0 && this._currentVersion) {
      const firstChangelogVersion = this._data[0].version;
      return compareVersions(firstChangelogVersion, this._currentVersion) > 0;
    }
    return false;
  }

  render() {
    this.innerHTML = '';

    if (!this._data) {
      this.innerHTML = '<p>Error loading changelog data.</p>';
      console.error('Invalid changelog data format.');
      return;
    }

    if (this._data.length < 1) {
      this.innerHTML = '<p>No changelog entries available.</p>';
      console.warn('No elements present to show changelog.');
      return;
    }

    const changelogEntriesHTML = this._data
      .map((entry: ChangelogEntry) => {
        let changesHTML = '';
        for (const changeType in entry.changes) {
          if (Object.prototype.hasOwnProperty.call(entry.changes, changeType)) {
            const changesArray = entry.changes[changeType as keyof typeof entry.changes];
            if (changesArray && changesArray.length > 0) {
              const itemsHTML = changesArray.map((change) => `<li>${change}</li>`).join('');
              changesHTML += `
                    <div class="change-card">
                      <h3 class='encore-text encore-text-small-bold'>${changeType}</h3>
                      <ul>${itemsHTML}</ul>
                    </div>
                  `;
            }
          }
        }

        const descHTML = entry.desc ? `<p>${entry.desc}</p>` : '';

        return `
              <div class="changelog-entry">
                <h2>${entry.version} - ${entry.date}</h2>
                ${descHTML}
                <div class="changes-wrapper">
                  ${changesHTML}
                </div>
              </div>
            `;
      })
      .join('');

    let updateAvailableHTML = '';
    if (this.hasUpdate) {
      updateAvailableHTML = `<h1 class="update-available-header">Update Available</h1>`;
    }

    const container = document.createElement('div');
    container.innerHTML = `
        ${updateAvailableHTML}
        <div class="changelog-entries-container">${changelogEntriesHTML}</div>`;

    this.appendChild(container);
  }

  public updateData(data: ChangelogData) {
    this._data = data;
    this.hasUpdate = this.checkForUpdate();
    this.render();
  }
}

customElements.define('changelog-component', Changelog);
