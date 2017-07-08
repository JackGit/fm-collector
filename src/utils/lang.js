const objectPrototype = Object.prototype

// Used to resolve the internal `[[Class]]` of values
const toString = Object.prototype.toString

// Used to resolve the decompiled source of functions
const fnToString = Function.prototype.toString

// Used to detect host constructors (Safari > 4; really typed array specific)
const reHostCtor = /^\[object .+?Constructor\]$/

// Compile a regexp using a common native method as a template.
// We chose `Object#toString` because there's a good chance it is not being mucked with.
const reNative = RegExp('^' +
  // Coerce `Object#toString` to a string
  String(toString)
  // Escape any special regexp characters
  .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
  // Replace mentions of `toString` with `.*?` to keep the template generic.
  // Replace thing like `for ...` to support environments like Rhino which add extra info
  // such as method arity.
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
)

export function isNative (value) {
  const type = typeof value;
  return type == 'function'
    // Use `Function#toString` to bypass the value's own `toString` method
    // and avoid being faked out.
    ? reNative.test(fnToString.call(value))
    // Fallback to a host object check because some environments will represent
    // things like typed arrays as DOM methods which may not conform to the
    // normal native pattern.
    : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false
}

export function isUndefined (value) {
  return value === void 0
}

export function isFunction (value) {
  return typeof value === 'function'
}

export function isString (value) {
  return objectPrototype.toString.call(value) === '[object String]'
}

export function isEmptyObject (value) {
  for (let _ in value) return false  // eslint-disable-line guard-for-in, no-unused-vars
  return true
}

export function hasKey (obj, key) {
  return objectPrototype.hasOwnProperty.call(obj, key)
}

/**
 * to check an object is Error object or not
 * For example:
 *   isError(new TypeError()) === true
 *   isError(new ErrorEvent()) === false
 *   isError(new DOMException()) == true
 * @param  {Object}  obj [description]
 * @return {Boolean}     [description]
 */
export function isError (obj) {
  return Error.prototype.isPrototypeOf(obj)
}

/**
 * to check an object is ErrorEvent object or not
 * For example:
 *   isErrorEvent(new TypeError()) === false
 *   isErrorEvent(new ErrorEvent()) === true
 * @param  {Object}  obj [description]
 * @return {Boolean}     [description]
 */
export function isErrorEvent (obj) {
  return ErrorEvent.prototype.isPrototypeOf(obj)
}

export function toArray (obj) {
  return Array.prototype.slice.call(obj)
}
