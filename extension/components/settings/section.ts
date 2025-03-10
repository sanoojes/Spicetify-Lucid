import type { InputOptionsUnion } from '@app/types/input.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { Tooltip } from '@components/ui/tooltip.ts';
import { CustomInput } from '@components/ui/input.ts';
import { getTextClass } from '@utils/styles/encoreUtils.ts';

export type Field = {
  render: boolean;
  label: string;
  inputOptions: InputOptionsUnion;
  tooltip?: string | HTMLElement;
  key: string;
};

export type Group = {
  name: string;
  render: boolean;
  fields: Field[];
  key: string;
  showName?: boolean;
};

export type Section = {
  name: string;
  render: boolean;
  groups: Group[];
};

export type Settings = Section[];

export class SettingsMain extends HTMLElement {
  private _isRender = false;
  private rendered = false;
  private _settings: Settings = [];
  public sectionElements: SettingSection[] = [];

  connectedCallback() {
    if (!this.sectionElements.length && this._settings.length) {
      this.createSectionElements();
    }

    this.render();
    this.updateVisibility();
  }

  set options(options: Settings) {
    console.debug('SettingsMain options updated:', options);
    this._settings = options;
    this.updateSectionElements();
    this.render();
    this.updateVisibility();
  }

  set isRender(isRender: boolean) {
    this._isRender = isRender;
    this.updateVisibility();
  }

  get isRender() {
    return this._isRender;
  }

  private updateVisibility() {
    if (this._isRender) {
      this.removeAttribute('hidden');
      this.style.display = 'flex';
      this.style.visibility = 'visible';
    } else {
      this.setAttribute('hidden', 'true');
      this.style.display = 'none';
      this.style.visibility = 'hidden';
    }
  }

  clear() {
    this.innerHTML = '';
  }

  private createSectionElements() {
    this.sectionElements = [];
    console.debug('Creating Section Elements:', this._settings);
    for (const section of this._settings) {
      const sectionElement = new SettingSection();
      sectionElement.options = section;
      this.sectionElements.push(sectionElement);
    }
  }

  private updateSectionElements() {
    const existingSectionsMap = new Map<string, SettingSection>();
    for (const sectionElement of this.sectionElements) {
      const sectionKey = sectionElement._name;
      existingSectionsMap.set(sectionKey, sectionElement);
    }

    const newSectionElements: SettingSection[] = [];
    for (const section of this._settings) {
      const sectionKey = section.name;
      let sectionElement = existingSectionsMap.get(sectionKey);
      if (sectionElement) {
        sectionElement.options = section;
      } else {
        sectionElement = new SettingSection();
        sectionElement.options = section;
      }
      newSectionElements.push(sectionElement);
    }
    this.sectionElements = newSectionElements;
  }

  render() {
    if (!this._settings || this._settings.length === 0 || this.rendered) {
      return;
    }

    this.clear();

    this.append(...this.sectionElements);

    this.rendered = true;
  }
}
customElements.define('settings-main', SettingsMain);

export class SettingSection extends HTMLElement {
  private _isRender = false;
  private rendered = false;
  private _headerElement: HTMLDivElement;
  private _groupsWrapperElement: HTMLDivElement;

  public _name = '';
  public _groups: Group[] = [];
  public groupElements: SettingGroup[] = [];

  constructor() {
    super();
    this._headerElement = createElement('div', {
      className: 'header-wrapper',
      style: { textAlign: 'center' },
    });
    this._groupsWrapperElement = createElement('div', {
      style: {
        marginTop: '.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        width: '100%',
      },
    });
  }

  connectedCallback() {
    if (!this.groupElements.length && this._groups.length) {
      this.createGroupElements();
    }
    this.render();
    this.updateVisibility();
  }

  set options(options: Section) {
    this._name = options.name;
    this._groups = options.groups;
    this._isRender = options.render;
    this.updateGroupElements();
    this.render();
    this.updateVisibility();
  }

  set isRender(isRender: boolean) {
    this._isRender = isRender;
    this.updateVisibility();
  }

  get isRender() {
    return this._isRender;
  }

  private updateVisibility() {
    if (this._isRender) {
      this.removeAttribute('hidden');
      this.style.display = 'block';
      this.style.visibility = 'visible';
    } else {
      this.setAttribute('hidden', 'true');
      this.style.display = 'none';
      this.style.visibility = 'hidden';
    }
  }

  clear() {
    this.innerHTML = '';
    this._headerElement.innerHTML = '';
    this._groupsWrapperElement.innerHTML = '';
  }

  private createGroupElements() {
    this.groupElements = [];

    for (const group of this._groups) {
      const groupElement = new SettingGroup();
      groupElement.options = group;
      this.groupElements.push(groupElement);
    }
  }

  private updateGroupElements() {
    const existingGroupsMap = new Map<string, SettingGroup>();
    for (const groupElement of this.groupElements) {
      existingGroupsMap.set(groupElement._key, groupElement);
    }

    const newGroupElements: SettingGroup[] = [];
    for (const group of this._groups) {
      let groupElement = existingGroupsMap.get(group.key);
      if (groupElement) {
        groupElement.options = group;
      } else {
        groupElement = new SettingGroup();
        groupElement.options = group;
      }
      newGroupElements.push(groupElement);
    }
    this.groupElements = newGroupElements;
  }

  render() {
    if (!this._groups || this._groups.length === 0 || this.rendered) {
      return;
    }
    this.dataset.tabId = this._name.toLowerCase();

    this.clear();

    this._headerElement.append(
      createElement('h3', {
        textContent: this._name,
        className: getTextClass('title-small'),
        style: {
          fontSize: '1.25rem',
        },
      })
    );

    this._groupsWrapperElement.append(...this.groupElements);

    this.append(this._headerElement, this._groupsWrapperElement);

    this.rendered = true;
  }
}
customElements.define('setting-section', SettingSection);

class SettingGroup extends HTMLElement {
  private _isRender = false;
  private rendered = false;
  private _nameContainerElement: HTMLDivElement;
  private _fieldsContainerElement: HTMLDivElement;
  private _showName = true;

  public _name = 'Section';
  public _fields: Field[] = [];
  public _key = '';

  public fieldElements: SettingField[] = [];

  constructor() {
    super();
    this._nameContainerElement = createElement('div');
    this._fieldsContainerElement = createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      },
    });
  }

  connectedCallback() {
    if (!this.fieldElements.length && this._fields.length) {
      this.createFieldElements();
    }
    this.render();
    this.updateVisibility();
  }

  set options(options: Group) {
    this._name = options.name;
    this._fields = options.fields;
    this._isRender = options.render;
    this._key = options.key;
    this._showName = options.showName ?? true;
    this.updateFieldElements();
    this.updateVisibility();
  }

  set isRender(isRender: boolean) {
    this._isRender = isRender;
    this.updateVisibility();
  }
  get isRender() {
    return this._isRender;
  }

  private updateVisibility() {
    if (this._isRender) {
      this.removeAttribute('hidden');
      this.style.display = 'flex';
      this.style.visibility = 'visible';
    } else {
      this.setAttribute('hidden', 'true');
      this.style.display = 'none';
      this.style.visibility = 'hidden';
    }
  }

  clear() {
    this.innerHTML = '';
    this._nameContainerElement.innerHTML = '';
    this._fieldsContainerElement.innerHTML = '';
  }

  private createFieldElements() {
    this.fieldElements = [];
    for (const field of this._fields) {
      const fieldElement = new SettingField();
      fieldElement.isRender = field.render ?? true;
      fieldElement.inputOptions = field.inputOptions;
      fieldElement.label = field.label;
      fieldElement.fieldKey = field.key;
      if (field.tooltip) fieldElement.tooltip = field.tooltip;
      this.fieldElements.push(fieldElement);
    }
  }

  private updateFieldElements() {
    const existingFieldsMap = new Map<string, SettingField>();
    for (const fieldElement of this.fieldElements) {
      existingFieldsMap.set(fieldElement.fieldKey, fieldElement);
    }

    const newFieldElements: SettingField[] = [];
    for (const field of this._fields) {
      let fieldElement = existingFieldsMap.get(field.key);
      if (fieldElement) {
        fieldElement.isRender = field.render ?? true;
        fieldElement.inputOptions = field.inputOptions;
        if (field.tooltip) fieldElement.tooltip = field.tooltip;
      } else {
        fieldElement = new SettingField();
        fieldElement.isRender = field.render ?? true;
        fieldElement.inputOptions = field.inputOptions;
        fieldElement.label = field.label;
        fieldElement.fieldKey = field.key;
        if (field.tooltip) fieldElement.tooltip = field.tooltip;
      }
      newFieldElements.push(fieldElement);
    }
    this.fieldElements = newFieldElements;
  }

  render() {
    if (!this._fields || this._fields.length === 0 || this.rendered) {
      return;
    }

    this.dataset.groupId = this._name.toLowerCase();

    this.clear();

    if (this._name && this._showName) {
      this._nameContainerElement.append(
        createElement('h4', {
          textContent: this._name,
          className: getTextClass('body-small-bold'),
          style: {
            fontSize: '.8rem',
            marginLeft: '.25rem',
            lineHeight: 'normal',
          },
        })
      );
      this.append(this._nameContainerElement);
    }

    this._fieldsContainerElement.append(...this.fieldElements);
    this.append(this._fieldsContainerElement);

    this.rendered = true;
  }
}

customElements.define('setting-group', SettingGroup);

class SettingField extends HTMLElement {
  private _isRender: boolean;
  private rendered: boolean;
  private _labelContainer: HTMLDivElement;
  private _inputElement: CustomInput;
  private _tooltipInstance: Tooltip | null;

  public _label: string;
  public _fieldKey = '';
  public inputOptions: InputOptionsUnion | null;

  constructor() {
    super();

    this._isRender = false;
    this.rendered = false;
    this._label = 'Section';
    this._tooltipInstance = null;
    this.inputOptions = null;
    this._inputElement = new CustomInput();
    this._labelContainer = createElement('div', {
      className: 'label-wrapper',
      style: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
    });
  }

  connectedCallback() {
    if (!this.rendered) this.render();
    this.updateVisibility();
  }

  disconnectedCallback() {
    this._tooltipInstance?.dispose();
  }

  set isRender(isRender: boolean) {
    this._isRender = isRender;
    this.updateVisibility();
  }

  get isRender() {
    return this._isRender;
  }

  private updateVisibility() {
    if (this._isRender) {
      this.removeAttribute('hidden');
      this.style.display = 'flex';
      this.style.visibility = 'visible';
    } else {
      this.setAttribute('hidden', 'true');
      this.style.display = 'none';
      this.style.visibility = 'hidden';
    }
  }

  set tooltip(tooltip: string | HTMLElement) {
    if (!tooltip) return;

    if (!this._tooltipInstance) this._tooltipInstance = new Tooltip(tooltip);
    this._tooltipInstance.content = tooltip;
  }

  clear() {
    this.innerHTML = '';
  }

  render() {
    if (!this.inputOptions || this.rendered) {
      return;
    }

    this.dataset.fieldId = this._label.toLowerCase();

    this._labelContainer.append(
      createElement('p', {
        textContent: this._label,
        className: getTextClass('body-small'),
      })
    );
    if (this._tooltipInstance) {
      this._labelContainer.append(this._tooltipInstance.elem);
    }

    this._inputElement.inputOptions = this.inputOptions;

    this.append(this._labelContainer, this._inputElement);
    this.rendered = true;
  }

  set label(value: string) {
    this._label = value;
    if (this.rendered) {
      this.render();
    }
  }

  get label() {
    return this._label;
  }

  set fieldKey(value: string) {
    this._fieldKey = value;
  }

  get fieldKey() {
    return this._fieldKey;
  }
}

customElements.define('setting-field', SettingField);
