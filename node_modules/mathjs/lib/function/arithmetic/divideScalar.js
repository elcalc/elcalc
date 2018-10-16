'use strict';

function factory(type, config, load, typed) {
  var multiplyScalar = load(require('./multiplyScalar'));

  /**
   * Divide two scalar values, `x / y`.
   * This function is meant for internal use: it is used by the public functions
   * `divide` and `inv`.
   *
   * This function does not support collections (Array or Matrix), and does
   * not validate the number of of inputs.
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit} x   Numerator
   * @param  {number | BigNumber | Fraction | Complex} y          Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit}                      Quotient, `x / y`
   * @private
   */
  var divideScalar = typed('divide', {
    'number, number': function numberNumber(x, y) {
      return x / y;
    },

    'Complex, Complex': function ComplexComplex(x, y) {
      return x.div(y);
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.div(y);
    },

    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.div(y);
    },

    'Unit, number | Fraction | BigNumber': function UnitNumberFractionBigNumber(x, y) {
      var res = x.clone();
      // TODO: move the divide function to Unit.js, it uses internals of Unit
      res.value = divideScalar(res.value === null ? res._normalize(1) : res.value, y);
      return res;
    },

    'number | Fraction | BigNumber, Unit': function numberFractionBigNumberUnit(x, y) {
      var res = y.pow(-1);
      // TODO: move the divide function to Unit.js, it uses internals of Unit
      res.value = multiplyScalar(res.value === null ? res._normalize(1) : res.value, x);
      return res;
    },

    'Unit, Unit': function UnitUnit(x, y) {
      return x.divide(y);
    }

  });

  return divideScalar;
}

exports.factory = factory;