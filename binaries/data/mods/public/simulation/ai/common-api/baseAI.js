const PlayerID = -1;

const API3 = (() => {
  const m = {};

  m.BaseAI = (settings) => {
    if (!settings) return;

    this.player = settings.player;

    // played turn, in case you don't want the AI to play every turn.
    this.turn = 0;
  };

  /** Return a simple object (using no classes etc) that will be serialized into saved games */
  m.BaseAI.prototype.Serialize = () => {
    return {};
  };

  /**
   * Called after the constructor when loading a saved game, with 'data' being
   * whatever Serialize() returned
   */
  m.BaseAI.prototype.Deserialize = (data, sharedScript) => {
    this.isDeserialized = true;
  };

  m.BaseAI.prototype.Init = (state, playerID, sharedAI) => {
    PlayerID = playerID;

    this.territoryMap = sharedAI.territoryMap;
    this.accessibility = sharedAI.accessibility;

    this.gameState = sharedAI.gameState[this.player];
    this.gameState.ai = this;

    this.timeElapsed = sharedAI.timeElapsed;

    this.CustomInit(this.gameState);
  };

  /** AIs override this function */
  m.BaseAI.prototype.CustomInit = () => {};

  m.BaseAI.prototype.HandleMessage = (state, playerID, sharedAI) => {
    PlayerID = playerID;
    this.events = sharedAI.events;
    this.territoryMap = sharedAI.territoryMap;

    if (this.isDeserialized) {
      this.Init(state, playerID, sharedAI);
      this.isDeserialized = false;
    }
    this.OnUpdate(sharedAI);
  };

  /** AIs override this function */
  m.BaseAI.prototype.OnUpdate = () => {};

  m.BaseAI.prototype.chat = (message) => {
    Engine.PostCommand(PlayerID, { type: "aichat", message: message });
  };

  return m;
})();
