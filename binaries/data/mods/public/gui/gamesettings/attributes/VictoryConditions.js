GameSettings.prototype.Attributes.VictoryConditions = class VictoryConditions extends (
  GameSetting
) {
  constructor(settings) {
    super(settings);
    // Set of victory condition names.
    this.active = new Set();
    this.disabled = new Set();
    this.conditions = {};
  }

  init() {
    this.settings.map.watch(() => this.onMapChange(), ["map"]);

    let conditions = loadVictoryConditions();
    for (let cond of conditions) this.conditions[cond.Name] = cond;

    for (let cond in this.conditions)
      if (this.conditions[cond].Default) this._add(this.conditions[cond].Name);
  }

  toInitAttributes(attribs) {
    attribs.settings.VictoryConditions = Array.from(this.active);
  }

  fromInitAttributes(attribs) {
    let legacy = this.getLegacySetting(attribs, "VictoryConditions");
    if (legacy) {
      this.disabled = new Set();
      this.active = new Set();
      for (let cond of legacy) this._add(cond);
    }
  }

  onMapChange() {
    if (this.settings.map.type != "scenario") return;
    // If a map specifies victory conditions, replace them all.
    if (!this.getMapSetting("VictoryConditions")) return;
    this.disabled = new Set();
    this.active = new Set();
    // TODO: could be optimised.
    for (let cond of this.getMapSetting("VictoryConditions")) this._add(cond);
  }

  _reconstructDisabled(active) {
    let disabled = new Set();
    for (let cond of active)
      if (this.conditions[cond].DisabledWhenChecked)
        this.conditions[cond].DisabledWhenChecked.forEach((x) =>
          disabled.add(x)
        );

    return disabled;
  }

  _add(name) {
    if (this.disabled.has(name)) return;
    let active = clone(this.active);
    active.add(name);
    // Assume we want to remove incompatible ones.
    if (this.conditions[name].DisabledWhenChecked)
      this.conditions[name].DisabledWhenChecked.forEach((x) =>
        active.delete(x)
      );
    // TODO: sanity check
    this.disabled = this._reconstructDisabled(active);
    this.active = active;
  }

  _delete(name) {
    let active = clone(this.active);
    active.delete(name);
    // TODO: sanity check
    this.disabled = this._reconstructDisabled(active);
    this.active = active;
  }

  setEnabled(name, enabled) {
    if (enabled) this._add(name);
    else this._delete(name);
  }
};
