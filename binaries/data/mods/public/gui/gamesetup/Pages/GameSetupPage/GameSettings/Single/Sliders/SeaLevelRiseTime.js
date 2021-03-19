GameSettingControls.SeaLevelRiseTime = class SeaLevelRiseTime extends GameSettingControlSlider
{
	constructor(...args)
	{
		super(...args);

		this.values = undefined;
		this.sprintfValue = {};

		g_GameSettings.seaLevelRise.watch(() => this.render(), ["value"]);
		g_GameSettings.map.watch(() => this.render(), ["type"]);
		this.render();
	}

	render()
	{
		this.setHidden(g_GameSettings.seaLevelRise.value === undefined);
		this.setEnabled(g_GameSettings.map.type != "scenario");

		let value = g_GameSettings.seaLevelRise.value;
		this.sprintfValue.minutes = value;

		this.setSelectedValue(
			value, sprintf(this.SeaLevelRiseTimeCaption(value), this.sprintfValue));
	}

	onValueChange(value)
	{
		g_GameSettings.seaLevelRise.setValue(value);
		this.gameSettingsControl.setNetworkInitAttributes();
	}
};

GameSettingControls.SeaLevelRiseTime.prototype.TitleCaption =
	translate("Sea Level Rise Time");

GameSettingControls.SeaLevelRiseTime.prototype.Tooltip =
	translate("Set the time when the water will start to rise.");

GameSettingControls.SeaLevelRiseTime.prototype.SeaLevelRiseTimeCaption =
	minutes => translatePluralWithContext("sea level rise time", "%(minutes)s minute", "%(minutes)s minutes", minutes);

GameSettingControls.SeaLevelRiseTime.prototype.MinValue = 0;

GameSettingControls.SeaLevelRiseTime.prototype.MaxValue = 60;
