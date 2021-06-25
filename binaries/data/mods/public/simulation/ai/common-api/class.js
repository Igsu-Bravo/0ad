const API3 = ((m) => {
  /**
   * Provides a nicer syntax for defining classes,
   * with support for OO-style inheritance.
   */
  m.Class = (data) => {
    let ctor;

    ctor = data._init ? data._init : () => {};

    if (data._super) ctor.prototype = { __proto__: data._super.prototype };

    data.forEach((e, k) => (ctor.prototype[k] = e));

    return ctor;
  };

  return m;
})(API3);
