import type { SettingsPosition } from '@app/types/settings.ts';
import { SETTINGS_ICON } from '@app/icons.ts';

let settingsElement: Spicetify.Menu.Item | Spicetify.Topbar.Button | null = null;

export function addSettingAccess(position: SettingsPosition, cb: () => void) {
  if (settingsElement) {
    if (settingsElement instanceof Spicetify.Topbar.Button) {
      settingsElement.element?.remove();
    } else {
      settingsElement.deregister();
    }
    settingsElement = null;
  }

  if (position === 'context-menu') {
    if (Spicetify?.Menu?.Item) {
      settingsElement = new Spicetify.Menu.Item('Lucid Settings', false, cb, SETTINGS_ICON);
      settingsElement.register();
    } else {
      console.error('Context menu unavailable.Try Switching to Nav.');
    }
  } else if (position === 'nav') {
    if (Spicetify?.Topbar?.Button) {
      settingsElement = new Spicetify.Topbar.Button(
        'Lucid Settings',
        SETTINGS_ICON,
        cb,
        false,
        true
      );
    } else {
      console.error('Nav bar unavailable.Try Switching to Context Menu.');
    }
  }
}
