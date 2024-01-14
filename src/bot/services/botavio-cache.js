// Heavily inspired by: https://github.com/yinonavraham/GoogleAppsScripts/tree/master/EnhancedCacheService

/**
 * BotavioCache - A wrapper for a native Cache object with additional features.
 *
 * This class enhances the functionality of a native Cache object by providing methods
 * to store and retrieve various data types (string, number, boolean, and object) in the cache.
 * It also supports splitting and merging large string values to work within cache size limits.
 *
 * @param {Cache} cache - The native Cache object to enhance.
 * @constructor
 */

class BotavioCache {
  /**
   * Creates a new BotavioCache instance.
   * @param {Cache} cache - The native GAS CacheService object.
   */
  constructor(cache) {
    this.cache_ = cache;
  }

  // Public GAS CacheService methods
  put(key, value, ttl) {
    this.putString(key, value, ttl);
  }

  get(key) {
    return this.getString(key);
  }

  remove(key) {
    const valueDescriptor = this.getValueDescriptor(key);
    if (valueDescriptor.keys) {
      for (let i = 0; i < valueDescriptor.keys.length; i++) {
        const k = valueDescriptor.keys[i];
        this.remove_(k);
      }
    }
    this.remove_(key);
  }

  // Private methods
  putString(key, value, ttl) {
    const type = "string";
    this.ensureValueType(value, type);
    this.putValue(key, value, type, ttl);
  }

  getString(key) {
    const value = this.getValue(key, "string");
    return value;
  }

  putNumber(key, value, ttl) {
    const type = "number";
    this.ensureValueType(value, type);
    this.putValue(key, value, type, ttl);
  }

  getNumber(key) {
    const value = this.getValue(key, "number");
    return value;
  }

  putBoolean(key, value, ttl) {
    const type = "boolean";
    this.ensureValueType(value, type);
    this.putValue(key, value, type, ttl);
  }

  getBoolean(key) {
    const value = this.getValue(key, "boolean");
    return value;
  }

  putObject(key, value, ttl, stringify) {
    stringify = stringify || JSON.stringify;
    const type = "object";
    this.ensureValueType(value, type);
    const sValue = value === null ? null : stringify(value);
    this.putValue(key, sValue, type, ttl);
  }

  getObject(key, parse) {
    parse = parse || JSON.parse;
    const sValue = this.getValue(key, "object");
    const value = sValue === null ? null : parse(sValue);
    return value;
  }

  getLastUpdated(key) {
    const valueDescriptor = this.getValueDescriptor(key);
    return valueDescriptor === null ? null : new Date(valueDescriptor.time);
  }

  ensureValueType(value, type) {
    if (value !== null) {
      const actualType = typeof value;
      if (actualType !== type) {
        throw new Error(
          `Value type mismatch. Expected: ${type}, Actual: ${actualType}`,
        );
      }
    }
  }

  ensureKeyType(key) {
    if (typeof key !== "string") {
      throw new Error("Key must be a string value");
    }
  }

  createValueDescriptor(value, type, ttl) {
    return {
      value: value,
      type: type,
      ttl: ttl,
      time: new Date().getTime(),
    };
  }

  putValue(key, value, type, ttl) {
    this.ensureKeyType(key);
    const valueDescriptor = this.createValueDescriptor(value, type, ttl);
    this.splitLargeValue(key, valueDescriptor);
    const sValueDescriptor = JSON.stringify(valueDescriptor);
    this.put_(key, sValueDescriptor, ttl);
  }

  put_(key, value, ttl) {
    if (ttl) {
      this.cache_.put(key, value, ttl);
    } else {
      this.cache_.put(key, value);
    }
  }

  get_(key) {
    return this.cache_.get(key);
  }

  remove_(key) {
    return this.cache_.remove(key);
  }

  getValueDescriptor(key) {
    this.ensureKeyType(key);
    const sValueDescriptor = this.get_(key);
    const valueDescriptor =
      sValueDescriptor === null ? null : JSON.parse(sValueDescriptor);
    return valueDescriptor;
  }

  getValue(key, type) {
    const valueDescriptor = this.getValueDescriptor(key);
    if (valueDescriptor === null) {
      return null;
    }
    if (type !== valueDescriptor.type) {
      throw new Error(
        `Value type mismatch. Expected: ${type}, Actual: ${valueDescriptor.type}`,
      );
    }
    this.mergeLargeValue(valueDescriptor);
    return valueDescriptor.value;
  }

  mergeLargeValue(valueDescriptor) {
    if (valueDescriptor.keys) {
      let value = "";
      for (let i = 0; i < valueDescriptor.keys.length; i++) {
        const k = valueDescriptor.keys[i];
        const v = this.get_(k);
        value += v;
      }
      valueDescriptor.value = value;
      valueDescriptor.keys = undefined;
    }
  }

  splitLargeValue(key, valueDescriptor) {
    const DESCRIPTOR_MARGIN = 2000;
    const MAX_STR_LENGTH = (128 * 1024) / 2 - DESCRIPTOR_MARGIN;
    let value = valueDescriptor.value;
    if (
      value !== null &&
      typeof value === "string" &&
      value.length > MAX_STR_LENGTH
    ) {
      Logger.log(`Splitting string value of length: ${value.length}`);
      const keys = valueDescriptor.keys || [];
      do {
        const k = `$$$${key}${keys.length}`;
        const v = value.substring(0, MAX_STR_LENGTH);
        value = value.substring(MAX_STR_LENGTH);
        keys.push(k);
        this.put_(k, v, valueDescriptor.ttl);
      } while (value.length > 0);
      valueDescriptor.value = undefined;
      valueDescriptor.keys = keys;
    }
  }
}
