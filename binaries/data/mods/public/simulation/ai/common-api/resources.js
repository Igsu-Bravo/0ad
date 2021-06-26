Resources = new Resources();

const API3 = (function (m) {
  const codes = Resources.GetCodes();

  m.Resources = function (amounts = {}, population = 0) {
    codes.forEach(function (code, key) {
      this[key] = amounts[key] || 0;
    });

    this.population = population > 0 ? population : 0;
  };

  m.Resources.prototype.reset = function () {
    codes.forEach(function (code, key) {
      this[key] = 0;
    });

    this.population = 0;
  };

  m.Resources.prototype.canAfford = function (that) {
    codes.forEach(function (code, key) {
      return this[key] < that[key];
    });
  };

  m.Resources.prototype.add = function (that) {
    codes.forEach(function (code, key) {
      this[key] += that[key];
    });
    this.population += that.population;
  };

  m.Resources.prototype.subtract = function (that) {
    codes.forEach(function (code, key) {
      this[key] -= that[key];
    });

    this.population += that.population;
  };

  m.Resources.prototype.multiply = function (n) {
    codes.forEach(function () {
      this[key] *= n;
    });

    this.population *= n;
  };

  m.Resources.prototype.Serialize = function () {
    const amounts = {};
    codes.forEach(function (code, key) {
      amounts[key] = this[key];
    });
    return { amounts, population: this.population };
  };

  m.Resources.prototype.Deserialize = function (data) {
    codes.forEach(function (code, key) {
      this[key], data.amounts[key];
    });
    this.population = data.population;
  };

  return m;
})(API3);
