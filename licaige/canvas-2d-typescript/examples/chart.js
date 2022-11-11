(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  /*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  var Reflect$1;
  (function (Reflect) {
      // Metadata Proposal
      // https://rbuckton.github.io/reflect-metadata/
      (function (factory) {
          var root = typeof global === "object" ? global :
              typeof self === "object" ? self :
                  typeof this === "object" ? this :
                      Function("return this;")();
          var exporter = makeExporter(Reflect);
          if (typeof root.Reflect === "undefined") {
              root.Reflect = Reflect;
          }
          else {
              exporter = makeExporter(root.Reflect, exporter);
          }
          factory(exporter);
          function makeExporter(target, previous) {
              return function (key, value) {
                  if (typeof target[key] !== "function") {
                      Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                  }
                  if (previous)
                      previous(key, value);
              };
          }
      })(function (exporter) {
          var hasOwn = Object.prototype.hasOwnProperty;
          // feature test for Symbol support
          var supportsSymbol = typeof Symbol === "function";
          var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
          var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
          var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
          var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
          var downLevel = !supportsCreate && !supportsProto;
          var HashMap = {
              // create an object in dictionary mode (a.k.a. "slow" mode in v8)
              create: supportsCreate
                  ? function () { return MakeDictionary(Object.create(null)); }
                  : supportsProto
                      ? function () { return MakeDictionary({ __proto__: null }); }
                      : function () { return MakeDictionary({}); },
              has: downLevel
                  ? function (map, key) { return hasOwn.call(map, key); }
                  : function (map, key) { return key in map; },
              get: downLevel
                  ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                  : function (map, key) { return map[key]; },
          };
          // Load global or shim versions of Map, Set, and WeakMap
          var functionPrototype = Object.getPrototypeOf(Function);
          var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
          var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
          var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
          var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
          // [[Metadata]] internal slot
          // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
          var Metadata = new _WeakMap();
          /**
           * Applies a set of decorators to a property of a target object.
           * @param decorators An array of decorators.
           * @param target The target object.
           * @param propertyKey (Optional) The property key to decorate.
           * @param attributes (Optional) The property descriptor for the target key.
           * @remarks Decorators are applied in reverse order.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     Example = Reflect.decorate(decoratorsArray, Example);
           *
           *     // property (on constructor)
           *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
           *
           *     // property (on prototype)
           *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
           *
           *     // method (on constructor)
           *     Object.defineProperty(Example, "staticMethod",
           *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
           *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
           *
           *     // method (on prototype)
           *     Object.defineProperty(Example.prototype, "method",
           *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
           *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
           *
           */
          function decorate(decorators, target, propertyKey, attributes) {
              if (!IsUndefined(propertyKey)) {
                  if (!IsArray(decorators))
                      throw new TypeError();
                  if (!IsObject(target))
                      throw new TypeError();
                  if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                      throw new TypeError();
                  if (IsNull(attributes))
                      attributes = undefined;
                  propertyKey = ToPropertyKey(propertyKey);
                  return DecorateProperty(decorators, target, propertyKey, attributes);
              }
              else {
                  if (!IsArray(decorators))
                      throw new TypeError();
                  if (!IsConstructor(target))
                      throw new TypeError();
                  return DecorateConstructor(decorators, target);
              }
          }
          exporter("decorate", decorate);
          // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
          // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
          /**
           * A default metadata decorator factory that can be used on a class, class member, or parameter.
           * @param metadataKey The key for the metadata entry.
           * @param metadataValue The value for the metadata entry.
           * @returns A decorator function.
           * @remarks
           * If `metadataKey` is already defined for the target and target key, the
           * metadataValue for that key will be overwritten.
           * @example
           *
           *     // constructor
           *     @Reflect.metadata(key, value)
           *     class Example {
           *     }
           *
           *     // property (on constructor, TypeScript only)
           *     class Example {
           *         @Reflect.metadata(key, value)
           *         static staticProperty;
           *     }
           *
           *     // property (on prototype, TypeScript only)
           *     class Example {
           *         @Reflect.metadata(key, value)
           *         property;
           *     }
           *
           *     // method (on constructor)
           *     class Example {
           *         @Reflect.metadata(key, value)
           *         static staticMethod() { }
           *     }
           *
           *     // method (on prototype)
           *     class Example {
           *         @Reflect.metadata(key, value)
           *         method() { }
           *     }
           *
           */
          function metadata(metadataKey, metadataValue) {
              function decorator(target, propertyKey) {
                  if (!IsObject(target))
                      throw new TypeError();
                  if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                      throw new TypeError();
                  OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
              }
              return decorator;
          }
          exporter("metadata", metadata);
          /**
           * Define a unique metadata entry on the target.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param metadataValue A value that contains attached metadata.
           * @param target The target object on which to define metadata.
           * @param propertyKey (Optional) The property key for the target.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     Reflect.defineMetadata("custom:annotation", options, Example);
           *
           *     // property (on constructor)
           *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
           *
           *     // property (on prototype)
           *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
           *
           *     // method (on constructor)
           *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
           *
           *     // method (on prototype)
           *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
           *
           *     // decorator factory as metadata-producing annotation.
           *     function MyAnnotation(options): Decorator {
           *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
           *     }
           *
           */
          function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          exporter("defineMetadata", defineMetadata);
          /**
           * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.hasMetadata("custom:annotation", Example);
           *
           *     // property (on constructor)
           *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
           *
           */
          function hasMetadata(metadataKey, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryHasMetadata(metadataKey, target, propertyKey);
          }
          exporter("hasMetadata", hasMetadata);
          /**
           * Gets a value indicating whether the target object has the provided metadata key defined.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
           *
           *     // property (on constructor)
           *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
           *
           */
          function hasOwnMetadata(metadataKey, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
          }
          exporter("hasOwnMetadata", hasOwnMetadata);
          /**
           * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.getMetadata("custom:annotation", Example);
           *
           *     // property (on constructor)
           *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
           *
           */
          function getMetadata(metadataKey, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryGetMetadata(metadataKey, target, propertyKey);
          }
          exporter("getMetadata", getMetadata);
          /**
           * Gets the metadata value for the provided metadata key on the target object.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.getOwnMetadata("custom:annotation", Example);
           *
           *     // property (on constructor)
           *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
           *
           */
          function getOwnMetadata(metadataKey, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
          }
          exporter("getOwnMetadata", getOwnMetadata);
          /**
           * Gets the metadata keys defined on the target object or its prototype chain.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns An array of unique metadata keys.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.getMetadataKeys(Example);
           *
           *     // property (on constructor)
           *     result = Reflect.getMetadataKeys(Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.getMetadataKeys(Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.getMetadataKeys(Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.getMetadataKeys(Example.prototype, "method");
           *
           */
          function getMetadataKeys(target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryMetadataKeys(target, propertyKey);
          }
          exporter("getMetadataKeys", getMetadataKeys);
          /**
           * Gets the unique metadata keys defined on the target object.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns An array of unique metadata keys.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.getOwnMetadataKeys(Example);
           *
           *     // property (on constructor)
           *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
           *
           */
          function getOwnMetadataKeys(target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              return OrdinaryOwnMetadataKeys(target, propertyKey);
          }
          exporter("getOwnMetadataKeys", getOwnMetadataKeys);
          /**
           * Deletes the metadata entry from the target object with the provided key.
           * @param metadataKey A key used to store and retrieve metadata.
           * @param target The target object on which the metadata is defined.
           * @param propertyKey (Optional) The property key for the target.
           * @returns `true` if the metadata entry was found and deleted; otherwise, false.
           * @example
           *
           *     class Example {
           *         // property declarations are not part of ES6, though they are valid in TypeScript:
           *         // static staticProperty;
           *         // property;
           *
           *         constructor(p) { }
           *         static staticMethod(p) { }
           *         method(p) { }
           *     }
           *
           *     // constructor
           *     result = Reflect.deleteMetadata("custom:annotation", Example);
           *
           *     // property (on constructor)
           *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
           *
           *     // property (on prototype)
           *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
           *
           *     // method (on constructor)
           *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
           *
           *     // method (on prototype)
           *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
           *
           */
          function deleteMetadata(metadataKey, target, propertyKey) {
              if (!IsObject(target))
                  throw new TypeError();
              if (!IsUndefined(propertyKey))
                  propertyKey = ToPropertyKey(propertyKey);
              var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
              if (IsUndefined(metadataMap))
                  return false;
              if (!metadataMap.delete(metadataKey))
                  return false;
              if (metadataMap.size > 0)
                  return true;
              var targetMetadata = Metadata.get(target);
              targetMetadata.delete(propertyKey);
              if (targetMetadata.size > 0)
                  return true;
              Metadata.delete(target);
              return true;
          }
          exporter("deleteMetadata", deleteMetadata);
          function DecorateConstructor(decorators, target) {
              for (var i = decorators.length - 1; i >= 0; --i) {
                  var decorator = decorators[i];
                  var decorated = decorator(target);
                  if (!IsUndefined(decorated) && !IsNull(decorated)) {
                      if (!IsConstructor(decorated))
                          throw new TypeError();
                      target = decorated;
                  }
              }
              return target;
          }
          function DecorateProperty(decorators, target, propertyKey, descriptor) {
              for (var i = decorators.length - 1; i >= 0; --i) {
                  var decorator = decorators[i];
                  var decorated = decorator(target, propertyKey, descriptor);
                  if (!IsUndefined(decorated) && !IsNull(decorated)) {
                      if (!IsObject(decorated))
                          throw new TypeError();
                      descriptor = decorated;
                  }
              }
              return descriptor;
          }
          function GetOrCreateMetadataMap(O, P, Create) {
              var targetMetadata = Metadata.get(O);
              if (IsUndefined(targetMetadata)) {
                  if (!Create)
                      return undefined;
                  targetMetadata = new _Map();
                  Metadata.set(O, targetMetadata);
              }
              var metadataMap = targetMetadata.get(P);
              if (IsUndefined(metadataMap)) {
                  if (!Create)
                      return undefined;
                  metadataMap = new _Map();
                  targetMetadata.set(P, metadataMap);
              }
              return metadataMap;
          }
          // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
          function OrdinaryHasMetadata(MetadataKey, O, P) {
              var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
              if (hasOwn)
                  return true;
              var parent = OrdinaryGetPrototypeOf(O);
              if (!IsNull(parent))
                  return OrdinaryHasMetadata(MetadataKey, parent, P);
              return false;
          }
          // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
          function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
              var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
              if (IsUndefined(metadataMap))
                  return false;
              return ToBoolean(metadataMap.has(MetadataKey));
          }
          // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
          function OrdinaryGetMetadata(MetadataKey, O, P) {
              var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
              if (hasOwn)
                  return OrdinaryGetOwnMetadata(MetadataKey, O, P);
              var parent = OrdinaryGetPrototypeOf(O);
              if (!IsNull(parent))
                  return OrdinaryGetMetadata(MetadataKey, parent, P);
              return undefined;
          }
          // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
          function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
              var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
              if (IsUndefined(metadataMap))
                  return undefined;
              return metadataMap.get(MetadataKey);
          }
          // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
          function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
              var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
              metadataMap.set(MetadataKey, MetadataValue);
          }
          // 3.1.6.1 OrdinaryMetadataKeys(O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
          function OrdinaryMetadataKeys(O, P) {
              var ownKeys = OrdinaryOwnMetadataKeys(O, P);
              var parent = OrdinaryGetPrototypeOf(O);
              if (parent === null)
                  return ownKeys;
              var parentKeys = OrdinaryMetadataKeys(parent, P);
              if (parentKeys.length <= 0)
                  return ownKeys;
              if (ownKeys.length <= 0)
                  return parentKeys;
              var set = new _Set();
              var keys = [];
              for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                  var key = ownKeys_1[_i];
                  var hasKey = set.has(key);
                  if (!hasKey) {
                      set.add(key);
                      keys.push(key);
                  }
              }
              for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                  var key = parentKeys_1[_a];
                  var hasKey = set.has(key);
                  if (!hasKey) {
                      set.add(key);
                      keys.push(key);
                  }
              }
              return keys;
          }
          // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
          // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
          function OrdinaryOwnMetadataKeys(O, P) {
              var keys = [];
              var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
              if (IsUndefined(metadataMap))
                  return keys;
              var keysObj = metadataMap.keys();
              var iterator = GetIterator(keysObj);
              var k = 0;
              while (true) {
                  var next = IteratorStep(iterator);
                  if (!next) {
                      keys.length = k;
                      return keys;
                  }
                  var nextValue = IteratorValue(next);
                  try {
                      keys[k] = nextValue;
                  }
                  catch (e) {
                      try {
                          IteratorClose(iterator);
                      }
                      finally {
                          throw e;
                      }
                  }
                  k++;
              }
          }
          // 6 ECMAScript Data Typ0es and Values
          // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
          function Type(x) {
              if (x === null)
                  return 1 /* Null */;
              switch (typeof x) {
                  case "undefined": return 0 /* Undefined */;
                  case "boolean": return 2 /* Boolean */;
                  case "string": return 3 /* String */;
                  case "symbol": return 4 /* Symbol */;
                  case "number": return 5 /* Number */;
                  case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                  default: return 6 /* Object */;
              }
          }
          // 6.1.1 The Undefined Type
          // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
          function IsUndefined(x) {
              return x === undefined;
          }
          // 6.1.2 The Null Type
          // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
          function IsNull(x) {
              return x === null;
          }
          // 6.1.5 The Symbol Type
          // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
          function IsSymbol(x) {
              return typeof x === "symbol";
          }
          // 6.1.7 The Object Type
          // https://tc39.github.io/ecma262/#sec-object-type
          function IsObject(x) {
              return typeof x === "object" ? x !== null : typeof x === "function";
          }
          // 7.1 Type Conversion
          // https://tc39.github.io/ecma262/#sec-type-conversion
          // 7.1.1 ToPrimitive(input [, PreferredType])
          // https://tc39.github.io/ecma262/#sec-toprimitive
          function ToPrimitive(input, PreferredType) {
              switch (Type(input)) {
                  case 0 /* Undefined */: return input;
                  case 1 /* Null */: return input;
                  case 2 /* Boolean */: return input;
                  case 3 /* String */: return input;
                  case 4 /* Symbol */: return input;
                  case 5 /* Number */: return input;
              }
              var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
              var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
              if (exoticToPrim !== undefined) {
                  var result = exoticToPrim.call(input, hint);
                  if (IsObject(result))
                      throw new TypeError();
                  return result;
              }
              return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
          }
          // 7.1.1.1 OrdinaryToPrimitive(O, hint)
          // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
          function OrdinaryToPrimitive(O, hint) {
              if (hint === "string") {
                  var toString_1 = O.toString;
                  if (IsCallable(toString_1)) {
                      var result = toString_1.call(O);
                      if (!IsObject(result))
                          return result;
                  }
                  var valueOf = O.valueOf;
                  if (IsCallable(valueOf)) {
                      var result = valueOf.call(O);
                      if (!IsObject(result))
                          return result;
                  }
              }
              else {
                  var valueOf = O.valueOf;
                  if (IsCallable(valueOf)) {
                      var result = valueOf.call(O);
                      if (!IsObject(result))
                          return result;
                  }
                  var toString_2 = O.toString;
                  if (IsCallable(toString_2)) {
                      var result = toString_2.call(O);
                      if (!IsObject(result))
                          return result;
                  }
              }
              throw new TypeError();
          }
          // 7.1.2 ToBoolean(argument)
          // https://tc39.github.io/ecma262/2016/#sec-toboolean
          function ToBoolean(argument) {
              return !!argument;
          }
          // 7.1.12 ToString(argument)
          // https://tc39.github.io/ecma262/#sec-tostring
          function ToString(argument) {
              return "" + argument;
          }
          // 7.1.14 ToPropertyKey(argument)
          // https://tc39.github.io/ecma262/#sec-topropertykey
          function ToPropertyKey(argument) {
              var key = ToPrimitive(argument, 3 /* String */);
              if (IsSymbol(key))
                  return key;
              return ToString(key);
          }
          // 7.2 Testing and Comparison Operations
          // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
          // 7.2.2 IsArray(argument)
          // https://tc39.github.io/ecma262/#sec-isarray
          function IsArray(argument) {
              return Array.isArray
                  ? Array.isArray(argument)
                  : argument instanceof Object
                      ? argument instanceof Array
                      : Object.prototype.toString.call(argument) === "[object Array]";
          }
          // 7.2.3 IsCallable(argument)
          // https://tc39.github.io/ecma262/#sec-iscallable
          function IsCallable(argument) {
              // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
              return typeof argument === "function";
          }
          // 7.2.4 IsConstructor(argument)
          // https://tc39.github.io/ecma262/#sec-isconstructor
          function IsConstructor(argument) {
              // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
              return typeof argument === "function";
          }
          // 7.2.7 IsPropertyKey(argument)
          // https://tc39.github.io/ecma262/#sec-ispropertykey
          function IsPropertyKey(argument) {
              switch (Type(argument)) {
                  case 3 /* String */: return true;
                  case 4 /* Symbol */: return true;
                  default: return false;
              }
          }
          // 7.3 Operations on Objects
          // https://tc39.github.io/ecma262/#sec-operations-on-objects
          // 7.3.9 GetMethod(V, P)
          // https://tc39.github.io/ecma262/#sec-getmethod
          function GetMethod(V, P) {
              var func = V[P];
              if (func === undefined || func === null)
                  return undefined;
              if (!IsCallable(func))
                  throw new TypeError();
              return func;
          }
          // 7.4 Operations on Iterator Objects
          // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
          function GetIterator(obj) {
              var method = GetMethod(obj, iteratorSymbol);
              if (!IsCallable(method))
                  throw new TypeError(); // from Call
              var iterator = method.call(obj);
              if (!IsObject(iterator))
                  throw new TypeError();
              return iterator;
          }
          // 7.4.4 IteratorValue(iterResult)
          // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
          function IteratorValue(iterResult) {
              return iterResult.value;
          }
          // 7.4.5 IteratorStep(iterator)
          // https://tc39.github.io/ecma262/#sec-iteratorstep
          function IteratorStep(iterator) {
              var result = iterator.next();
              return result.done ? false : result;
          }
          // 7.4.6 IteratorClose(iterator, completion)
          // https://tc39.github.io/ecma262/#sec-iteratorclose
          function IteratorClose(iterator) {
              var f = iterator["return"];
              if (f)
                  f.call(iterator);
          }
          // 9.1 Ordinary Object Internal Methods and Internal Slots
          // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
          // 9.1.1.1 OrdinaryGetPrototypeOf(O)
          // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
          function OrdinaryGetPrototypeOf(O) {
              var proto = Object.getPrototypeOf(O);
              if (typeof O !== "function" || O === functionPrototype)
                  return proto;
              // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
              // Try to determine the superclass constructor. Compatible implementations
              // must either set __proto__ on a subclass constructor to the superclass constructor,
              // or ensure each class has a valid `constructor` property on its prototype that
              // points back to the constructor.
              // If this is not the same as Function.[[Prototype]], then this is definately inherited.
              // This is the case when in ES6 or when using __proto__ in a compatible browser.
              if (proto !== functionPrototype)
                  return proto;
              // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
              var prototype = O.prototype;
              var prototypeProto = prototype && Object.getPrototypeOf(prototype);
              if (prototypeProto == null || prototypeProto === Object.prototype)
                  return proto;
              // If the constructor was not a function, then we cannot determine the heritage.
              var constructor = prototypeProto.constructor;
              if (typeof constructor !== "function")
                  return proto;
              // If we have some kind of self-reference, then we cannot determine the heritage.
              if (constructor === O)
                  return proto;
              // we have a pretty good guess at the heritage.
              return constructor;
          }
          // naive Map shim
          function CreateMapPolyfill() {
              var cacheSentinel = {};
              var arraySentinel = [];
              var MapIterator = /** @class */ (function () {
                  function MapIterator(keys, values, selector) {
                      this._index = 0;
                      this._keys = keys;
                      this._values = values;
                      this._selector = selector;
                  }
                  MapIterator.prototype["@@iterator"] = function () { return this; };
                  MapIterator.prototype[iteratorSymbol] = function () { return this; };
                  MapIterator.prototype.next = function () {
                      var index = this._index;
                      if (index >= 0 && index < this._keys.length) {
                          var result = this._selector(this._keys[index], this._values[index]);
                          if (index + 1 >= this._keys.length) {
                              this._index = -1;
                              this._keys = arraySentinel;
                              this._values = arraySentinel;
                          }
                          else {
                              this._index++;
                          }
                          return { value: result, done: false };
                      }
                      return { value: undefined, done: true };
                  };
                  MapIterator.prototype.throw = function (error) {
                      if (this._index >= 0) {
                          this._index = -1;
                          this._keys = arraySentinel;
                          this._values = arraySentinel;
                      }
                      throw error;
                  };
                  MapIterator.prototype.return = function (value) {
                      if (this._index >= 0) {
                          this._index = -1;
                          this._keys = arraySentinel;
                          this._values = arraySentinel;
                      }
                      return { value: value, done: true };
                  };
                  return MapIterator;
              }());
              return /** @class */ (function () {
                  function Map() {
                      this._keys = [];
                      this._values = [];
                      this._cacheKey = cacheSentinel;
                      this._cacheIndex = -2;
                  }
                  Object.defineProperty(Map.prototype, "size", {
                      get: function () { return this._keys.length; },
                      enumerable: true,
                      configurable: true
                  });
                  Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                  Map.prototype.get = function (key) {
                      var index = this._find(key, /*insert*/ false);
                      return index >= 0 ? this._values[index] : undefined;
                  };
                  Map.prototype.set = function (key, value) {
                      var index = this._find(key, /*insert*/ true);
                      this._values[index] = value;
                      return this;
                  };
                  Map.prototype.delete = function (key) {
                      var index = this._find(key, /*insert*/ false);
                      if (index >= 0) {
                          var size = this._keys.length;
                          for (var i = index + 1; i < size; i++) {
                              this._keys[i - 1] = this._keys[i];
                              this._values[i - 1] = this._values[i];
                          }
                          this._keys.length--;
                          this._values.length--;
                          if (key === this._cacheKey) {
                              this._cacheKey = cacheSentinel;
                              this._cacheIndex = -2;
                          }
                          return true;
                      }
                      return false;
                  };
                  Map.prototype.clear = function () {
                      this._keys.length = 0;
                      this._values.length = 0;
                      this._cacheKey = cacheSentinel;
                      this._cacheIndex = -2;
                  };
                  Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                  Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                  Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                  Map.prototype["@@iterator"] = function () { return this.entries(); };
                  Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                  Map.prototype._find = function (key, insert) {
                      if (this._cacheKey !== key) {
                          this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                      }
                      if (this._cacheIndex < 0 && insert) {
                          this._cacheIndex = this._keys.length;
                          this._keys.push(key);
                          this._values.push(undefined);
                      }
                      return this._cacheIndex;
                  };
                  return Map;
              }());
              function getKey(key, _) {
                  return key;
              }
              function getValue(_, value) {
                  return value;
              }
              function getEntry(key, value) {
                  return [key, value];
              }
          }
          // naive Set shim
          function CreateSetPolyfill() {
              return /** @class */ (function () {
                  function Set() {
                      this._map = new _Map();
                  }
                  Object.defineProperty(Set.prototype, "size", {
                      get: function () { return this._map.size; },
                      enumerable: true,
                      configurable: true
                  });
                  Set.prototype.has = function (value) { return this._map.has(value); };
                  Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                  Set.prototype.delete = function (value) { return this._map.delete(value); };
                  Set.prototype.clear = function () { this._map.clear(); };
                  Set.prototype.keys = function () { return this._map.keys(); };
                  Set.prototype.values = function () { return this._map.values(); };
                  Set.prototype.entries = function () { return this._map.entries(); };
                  Set.prototype["@@iterator"] = function () { return this.keys(); };
                  Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                  return Set;
              }());
          }
          // naive WeakMap shim
          function CreateWeakMapPolyfill() {
              var UUID_SIZE = 16;
              var keys = HashMap.create();
              var rootKey = CreateUniqueKey();
              return /** @class */ (function () {
                  function WeakMap() {
                      this._key = CreateUniqueKey();
                  }
                  WeakMap.prototype.has = function (target) {
                      var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                      return table !== undefined ? HashMap.has(table, this._key) : false;
                  };
                  WeakMap.prototype.get = function (target) {
                      var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                      return table !== undefined ? HashMap.get(table, this._key) : undefined;
                  };
                  WeakMap.prototype.set = function (target, value) {
                      var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                      table[this._key] = value;
                      return this;
                  };
                  WeakMap.prototype.delete = function (target) {
                      var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                      return table !== undefined ? delete table[this._key] : false;
                  };
                  WeakMap.prototype.clear = function () {
                      // NOTE: not a real clear, just makes the previous data unreachable
                      this._key = CreateUniqueKey();
                  };
                  return WeakMap;
              }());
              function CreateUniqueKey() {
                  var key;
                  do
                      key = "@@WeakMap@@" + CreateUUID();
                  while (HashMap.has(keys, key));
                  keys[key] = true;
                  return key;
              }
              function GetOrCreateWeakMapTable(target, create) {
                  if (!hasOwn.call(target, rootKey)) {
                      if (!create)
                          return undefined;
                      Object.defineProperty(target, rootKey, { value: HashMap.create() });
                  }
                  return target[rootKey];
              }
              function FillRandomBytes(buffer, size) {
                  for (var i = 0; i < size; ++i)
                      buffer[i] = Math.random() * 0xff | 0;
                  return buffer;
              }
              function GenRandomBytes(size) {
                  if (typeof Uint8Array === "function") {
                      if (typeof crypto !== "undefined")
                          return crypto.getRandomValues(new Uint8Array(size));
                      if (typeof msCrypto !== "undefined")
                          return msCrypto.getRandomValues(new Uint8Array(size));
                      return FillRandomBytes(new Uint8Array(size), size);
                  }
                  return FillRandomBytes(new Array(size), size);
              }
              function CreateUUID() {
                  var data = GenRandomBytes(UUID_SIZE);
                  // mark as random - RFC 4122 § 4.4
                  data[6] = data[6] & 0x4f | 0x40;
                  data[8] = data[8] & 0xbf | 0x80;
                  var result = "";
                  for (var offset = 0; offset < UUID_SIZE; ++offset) {
                      var byte = data[offset];
                      if (offset === 4 || offset === 6 || offset === 8)
                          result += "-";
                      if (byte < 16)
                          result += "0";
                      result += byte.toString(16).toLowerCase();
                  }
                  return result;
              }
          }
          // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
          function MakeDictionary(obj) {
              obj.__ = undefined;
              delete obj.__;
              return obj;
          }
      });
  })(Reflect$1 || (Reflect$1 = {}));

  function CloneableDescriptor(constructor) {
    return /*#__PURE__*/function (_constructor) {
      _inherits(_class, _constructor);

      var _super = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super.apply(this, arguments);
      }

      _createClass(_class, [{
        key: "clone",
        value: function clone() {
          return Reflect.construct(this.constructor, [this]);
        }
      }]);

      return _class;
    }(constructor);
  }
  //     metadataKey: any,
  //     metadataValue: any
  // ): {
  //     (target: Function): void;
  //     (target: Object, propertyKey: string | symbol): void;
  // };

  var BorderStyle = function BorderStyle(param) {
    _classCallCheck(this, BorderStyle);

    var _ref = param || {},
        _ref$enable = _ref.enable,
        enable = _ref$enable === void 0 ? false : _ref$enable,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 0 : _ref$size,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'black' : _ref$color;

    this.enable = enable;
    this.size = size;
    this.color = color;
  };

  BorderStyle = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], BorderStyle);

  var Padding = function Padding(param) {
    _classCallCheck(this, Padding);

    var _ref = param || {},
        _ref$top = _ref.top,
        top = _ref$top === void 0 ? 0 : _ref$top,
        _ref$bottom = _ref.bottom,
        bottom = _ref$bottom === void 0 ? 0 : _ref$bottom,
        _ref$left = _ref.left,
        left = _ref$left === void 0 ? 0 : _ref$left,
        _ref$right = _ref.right,
        right = _ref$right === void 0 ? 0 : _ref$right;

    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  };

  Padding = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Padding);

  var HEX_STR = '0123456789ABCDEF';
  function hex(i) {
    var h = HEX_STR.charAt(i / 16),
        l = HEX_STR.charAt(i % 16);
    return "".concat(h).concat(l);
  }
  function rgb(r, g, b) {
    var hR = hex(r),
        hG = hex(g),
        hB = hex(b);
    return "#".concat(hR).concat(hG).concat(hB);
  }
  var CoreEvent = /*#__PURE__*/function () {
    function CoreEvent(target, type) {
      _classCallCheck(this, CoreEvent);

      this.bubbles = true;
      this.type = type;
      this.target = target;
    }

    _createClass(CoreEvent, [{
      key: "stopPropagation",
      value: function stopPropagation() {
        this.bubbles = false;
      }
    }]);

    return CoreEvent;
  }();

  var PropertyChangedEvent = /*#__PURE__*/function (_CoreEvent) {
    _inherits(PropertyChangedEvent, _CoreEvent);

    var _super = _createSuper(PropertyChangedEvent);

    function PropertyChangedEvent(target, propertyKey, oldValue, newValue) {
      var _this;

      _classCallCheck(this, PropertyChangedEvent);

      _this = _super.call(this, target, PropertyChangedEvent.NAME);
      _this.propertyKey = propertyKey;
      _this.oldValue = oldValue;
      _this.newValue = newValue;
      return _this;
    }

    return PropertyChangedEvent;
  }(CoreEvent);
  PropertyChangedEvent.NAME = "PropertyChangedEvent";

  var ListenerHolder = /*#__PURE__*/function (_Array) {
    _inherits(ListenerHolder, _Array);

    var _super = _createSuper(ListenerHolder);

    function ListenerHolder() {
      _classCallCheck(this, ListenerHolder);

      return _super.apply(this, arguments);
    }

    _createClass(ListenerHolder, [{
      key: "trigger",
      value: function trigger(event) {
        var result = false;
        this.forEach(function (listener) {
          listener(event);
        });
        result = true;
        return result;
      }
    }]);

    return ListenerHolder;
  }( /*#__PURE__*/_wrapNativeSuper(Array));

  var ID = 0;
  var EventDispatcher = /*#__PURE__*/function () {
    function EventDispatcher() {
      _classCallCheck(this, EventDispatcher);

      this.listeners = new Map();
      this._id = ++ID;
    }

    _createClass(EventDispatcher, [{
      key: "trigger",
      value: function trigger(event) {
        var _this = this;

        // requestAnimationFrame(() => {
        //     let holder: ListenerHolder = this.listeners.get(event.type);
        //     if (holder) {
        //         holder.trigger(event);
        //     }
        // });
        var handle = setTimeout(function () {
          var holder = _this.listeners.get(event.type);

          if (holder) {
            holder.trigger(event);
          }

          clearTimeout(handle);
        }, 0);
        return this;
      }
    }, {
      key: "has",
      value: function has(type, listener) {
        return this.listeners.has(type) && (listener == undefined || this.listeners.get(type).indexOf(listener) >= 0);
      }
    }, {
      key: "on",
      value: function on(type, listener) {
        if (!this.has(type)) {
          this.listeners.set(type, new ListenerHolder());
        }

        var holder = this.listeners.get(type);
        holder.push(listener);
        return this;
      }
    }, {
      key: "off",
      value: function off(type, listener) {
        if (this.has(type, listener)) {
          if (!listener) {
            this.listeners["delete"](type);
          } else {
            var holder = this.listeners.get(type);
            holder.splice(holder.indexOf(listener), 1);
          }
        }

        return this;
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
    }]);

    return EventDispatcher;
  }();

  var CompleteEvent = /*#__PURE__*/function (_CoreEvent) {
    _inherits(CompleteEvent, _CoreEvent);

    var _super = _createSuper(CompleteEvent);

    function CompleteEvent(target) {
      _classCallCheck(this, CompleteEvent);

      return _super.call(this, target, CompleteEvent.NAME);
    }

    return CompleteEvent;
  }(CoreEvent);
  CompleteEvent.NAME = "CompleteEvent";

  var BackgroundStyle = function BackgroundStyle(param) {
    _classCallCheck(this, BackgroundStyle);

    var _ref = param || {},
        _ref$enable = _ref.enable,
        enable = _ref$enable === void 0 ? true : _ref$enable,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'white' : _ref$color;

    this.enable = enable;
    this.color = color;
  };

  BackgroundStyle = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], BackgroundStyle);

  var _a$3;
  var propertyEquals = function propertyEquals(a, b) {
    if (a == undefined && b == undefined) return true;
    if (a == undefined || b == undefined) return false;
    return a == b;
  };

  var Invalidate = function Invalidate(sizeOrPosition) {
    return function (target, propertyKey, descriptor) {
      if (!propertyKey.startsWith('set')) throw Error('@Invalidate must be descriped to setter method.');
      var setter = descriptor.value;

      descriptor.value = function () {
        var c = this;
        var getterKey = 'g' + propertyKey.substring(1);
        var getter = this[getterKey];
        if (!getter) throw Error("@Invalidate method must has a getter ".concat(getterKey, "."));
        var oldValue = getter.apply(this, []);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var newValue = args[0];

        if (!propertyEquals(oldValue, newValue)) {
          var propKey = propertyKey.substr(3, 1).toLocaleLowerCase() + propertyKey.substring(4);
          setter.apply(this, args);

          var frame = function frame() {
            if (c.graphics) {
              if (sizeOrPosition) {
                c.measure();
              }

              var trigger = sizeOrPosition ? c.parent || c : c;
              trigger.trigger(new PropertyChangedEvent(c, propKey, oldValue, newValue));
            } else {
              // requestAnimationFrame(frame);
              setTimeout(frame, 1);
            }
          };

          setTimeout(frame, 1); // requestAnimationFrame(frame);
        }
      };
    };
  };

  var InvalidateSizeOrPosition = Invalidate(true);
  var InvalidateProperties = Invalidate(false);
  var DisplayObject = /*#__PURE__*/function (_EventDispatcher) {
    _inherits(DisplayObject, _EventDispatcher);

    var _super = _createSuper(DisplayObject);

    function DisplayObject() {
      var _this;

      _classCallCheck(this, DisplayObject);

      _this = _super.call(this);
      _this.x = 0;
      _this.y = 0;
      _this.width = 1;
      _this.height = 1;
      _this.background = new BackgroundStyle();

      _this.initializeListeners();

      return _this;
    }

    _createClass(DisplayObject, [{
      key: "initializeListeners",
      value: function initializeListeners() {
        var _this2 = this;

        this.on(PropertyChangedEvent.NAME, function (e) {
          return _this2.onPropertyChanged(e);
        }).on(CompleteEvent.NAME, function () {
          return _this2.onComplete();
        });
      }
    }, {
      key: "onPropertyChanged",
      value: function onPropertyChanged(event) {
        this.render();
      }
    }, {
      key: "onComplete",
      value: function onComplete() {}
    }, {
      key: "render",
      value: function render() {}
    }, {
      key: "onPaint",
      value: function onPaint() {
        this.beforePaint(this.graphics);
        this.paint(this.graphics);
        this.afterPaint(this.graphics);
      }
    }, {
      key: "complete",
      value: function complete() {
        this.trigger(new CompleteEvent(this));
        return true;
      }
    }, {
      key: "graphics",
      get: function get() {
        return this._graphics;
      },
      set: function set(g) {
        this._graphics = g;
      }
    }, {
      key: "parentObject",
      get: function get() {
        return this._parentObject;
      },
      set: function set(parent) {
        if (parent) {
          this.graphics = parent.graphics;
        }

        this._parentObject = parent;
      }
    }, {
      key: "getX",
      value: function getX() {
        return this.x;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
      }
    }, {
      key: "getY",
      value: function getY() {
        return this.y;
      }
    }, {
      key: "setY",
      value: function setY(y) {
        this.y = y;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        return this.width;
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        this.width = width;
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        return this.height;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        this.height = height;
      }
    }, {
      key: "getBackgroundStyle",
      value: function getBackgroundStyle() {
        return this.background.color;
      }
    }, {
      key: "getBackground",
      value: function getBackground() {
        return this.background;
      }
    }, {
      key: "setBackground",
      value: function setBackground(background) {
        this.background = background;
      }
    }]);

    return DisplayObject;
  }(EventDispatcher);

  __decorate([InvalidateSizeOrPosition, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], DisplayObject.prototype, "setX", null);

  __decorate([InvalidateSizeOrPosition, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], DisplayObject.prototype, "setY", null);

  __decorate([InvalidateSizeOrPosition, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], DisplayObject.prototype, "setWidth", null);

  __decorate([InvalidateSizeOrPosition, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], DisplayObject.prototype, "setHeight", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_a$3 = typeof BackgroundStyle !== "undefined" && BackgroundStyle) === "function" ? _a$3 : Object]), __metadata("design:returntype", void 0)], DisplayObject.prototype, "setBackground", null);

  var MouseEvent = /*#__PURE__*/function (_CoreEvent) {
    _inherits(MouseEvent, _CoreEvent);

    var _super = _createSuper(MouseEvent);

    function MouseEvent(target, type, p) {
      var _this;

      _classCallCheck(this, MouseEvent);

      _this = _super.call(this, target, type);
      _this.point = p;
      return _this;
    }

    return MouseEvent;
  }(CoreEvent);
  MouseEvent.MOUSE_CLICK = 'click';
  MouseEvent.MOUSE_MOVE = 'mousemove';
  MouseEvent.MOUSE_ENTER = 'mouseenter';
  MouseEvent.MOUSE_LEAVE = 'mouseleave';

  var Rectangle = function Rectangle(param) {
    _classCallCheck(this, Rectangle);

    var _ref = param || {},
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 1 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 1 : _ref$height;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Rectangle = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Rectangle);

  var FontStyle = function FontStyle(param) {
    _classCallCheck(this, FontStyle);

    var _ref = param || {},
        _ref$family = _ref.family,
        family = _ref$family === void 0 ? '宋体' : _ref$family,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'black' : _ref$color,
        _ref$textAlign = _ref.textAlign,
        textAlign = _ref$textAlign === void 0 ? 'left' : _ref$textAlign;

    this.family = family;
    this.color = color;
    this.textAlign = textAlign;
  };

  FontStyle = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], FontStyle);

  var _a$2, _b, _c, _d;
  var mergeBound = function mergeBound(bound, offset) {
    var border = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var top = offset.top,
        bottom = offset.bottom,
        left = offset.left,
        right = offset.right;
    top += border;
    bottom += border;
    left += border;
    right += border;
    return new Rectangle({
      x: bound.x + left,
      y: bound.y + top,
      width: bound.width - (left + right),
      height: bound.height - (top + bottom)
    });
  };
  var Component = /*#__PURE__*/function (_DisplayObject) {
    _inherits(Component, _DisplayObject);

    var _super = _createSuper(Component);

    function Component() {
      var _this;

      _classCallCheck(this, Component);

      _this = _super.call(this);
      _this.margin = new Padding();
      _this.padding = new Padding();
      _this.font = new FontStyle();
      _this.border = new BorderStyle();
      _this.enable = true;

      _this.setMargin(new Padding({
        top: 1,
        bottom: 1,
        left: 1,
        right: 1
      }));

      return _this;
    }

    _createClass(Component, [{
      key: "initializeListeners",
      value: function initializeListeners() {
        var _this2 = this;

        _get(_getPrototypeOf(Component.prototype), "initializeListeners", this).call(this);

        if (this.mouseEnabled) {
          this.on(MouseEvent.MOUSE_CLICK, function (e) {
            return _this2.handleMouseEvent(e);
          }).on(MouseEvent.MOUSE_MOVE, function (e) {
            return _this2.handleMouseEvent(e);
          }).on(MouseEvent.MOUSE_ENTER, function (e) {
            return _this2.handleMouseEvent(e);
          }).on(MouseEvent.MOUSE_LEAVE, function (e) {
            return _this2.handleMouseEvent(e);
          });
        }
      }
    }, {
      key: "handleMouseEvent",
      value: function handleMouseEvent(event) {
        switch (event.type) {
          case MouseEvent.MOUSE_CLICK:
            this.onMouseClick(event);
            break;

          case MouseEvent.MOUSE_MOVE:
            this.onMouseMove(event);
            break;

          case MouseEvent.MOUSE_ENTER:
            this.onMouseEnter(event);
            break;

          case MouseEvent.MOUSE_LEAVE:
            this.onMouseLeave(event);
            break;
        }
      }
    }, {
      key: "onMouseClick",
      value: function onMouseClick(event) {}
    }, {
      key: "onMouseMove",
      value: function onMouseMove(event) {}
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter(event) {}
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave(event) {}
    }, {
      key: "findMouseEventHandler",
      value: function findMouseEventHandler(p) {
        return this.isPointInPath(p) ? this : undefined;
      }
    }, {
      key: "isPointInPath",
      value: function isPointInPath(p) {
        var _this$outerBound = this.outerBound,
            x = _this$outerBound.x,
            y = _this$outerBound.y,
            width = _this$outerBound.width,
            height = _this$outerBound.height;
        var g = this.graphics;
        g.beginPath();
        g.rect(x, y, width, height);
        return this.mouseEnabled && this.enable && this.graphics && g.isPointInPath(p.x, p.y);
      }
    }, {
      key: "render",
      value: function render() {
        // graphicsManager.render(this);
        this.graphics.renderer.onPaint();
      }
    }, {
      key: "onPaint",
      value: function onPaint() {
        var g = this.graphics;
        this.drawBackground(g);
        this.drawBorder(g);
        this.beforePaint(g);
        this.paint(g);
        this.afterPaint(g);
      }
    }, {
      key: "drawBackground",
      value: function drawBackground(g) {
        var enable = this.background.enable;

        if (enable) {
          var _this$outerBound2 = this.outerBound,
              x = _this$outerBound2.x,
              y = _this$outerBound2.y,
              width = _this$outerBound2.width,
              height = _this$outerBound2.height;
          g.save();
          g.translate(x, y);
          g.beginPath();
          g.rect(0, 0, width, height);
          g.fillStyle = this.getBackgroundStyle();
          g.fill();
          g.restore();
        }
      }
    }, {
      key: "drawBorder",
      value: function drawBorder(g) {
        var _this$border = this.border,
            enable = _this$border.enable,
            size = _this$border.size,
            color = _this$border.color;

        if (enable && size > 0) {
          var _this$outerBound3 = this.outerBound,
              x = _this$outerBound3.x,
              y = _this$outerBound3.y,
              width = _this$outerBound3.width,
              height = _this$outerBound3.height;
          var outX = size * 0.5;
          var outY = size * 0.5;
          g.save();
          g.translate(x, y);
          g.beginPath();
          g.strokeStyle = color;
          g.lineWidth = size * 0.5;
          g.rect(outX, outY, width - size, height - size);
          g.stroke();
          g.restore();
        }
      }
    }, {
      key: "beforePaint",
      value: function beforePaint(g) {
        var _this$innerBound = this.innerBound,
            x = _this$innerBound.x,
            y = _this$innerBound.y,
            width = _this$innerBound.width,
            height = _this$innerBound.height;
        g.save();
        g.translate(x, y);
        g.beginPath();
        g.rect(0, 0, width, height);
        g.clip();
      }
    }, {
      key: "paint",
      value: function paint(g) {}
    }, {
      key: "afterPaint",
      value: function afterPaint(g) {
        g.restore();
      }
    }, {
      key: "measure",
      value: function measure() {
        var parent = this.parent,
            margin = this.margin,
            padding = this.padding,
            border = this.border;
        var px = this.getX(),
            py = this.getY(),
            pw = this.getWidth(),
            ph = this.getHeight();
        var g = this.graphics;
        var pBound = parent == undefined ? new Rectangle({
          x: 0,
          y: 0,
          width: g.canvas.width,
          height: g.canvas.height
        }) : parent.innerBound;
        var x = pBound.x + pBound.width * Math.min(1, px);
        var y = pBound.y + pBound.height * Math.min(1, py);
        var w = pBound.width * Math.min(1, pw);
        var h = pBound.height * Math.min(1, ph);
        this.outerBound = mergeBound({
          x: x,
          y: y,
          width: w,
          height: h
        }, margin, 0);
        this.innerBound = mergeBound(this.outerBound, padding, border.enable ? border.size : 0);
      }
    }, {
      key: "contains",
      value: function contains(c) {
        return c == this;
      }
    }, {
      key: "getMargin",
      value: function getMargin() {
        return this.margin;
      }
    }, {
      key: "setMargin",
      value: function setMargin(margin) {
        this.margin = margin;
      }
    }, {
      key: "getPadding",
      value: function getPadding() {
        return this.padding;
      }
    }, {
      key: "setPadding",
      value: function setPadding(padding) {
        this.padding = padding;
      }
    }, {
      key: "getBorder",
      value: function getBorder() {
        return this.border;
      }
    }, {
      key: "setBorder",
      value: function setBorder(border) {
        this.border = border;
      }
    }, {
      key: "getEnable",
      value: function getEnable() {
        return this.enable;
      }
    }, {
      key: "setEnable",
      value: function setEnable(enable) {
        this.enable = enable;
      }
    }, {
      key: "outerBound",
      get: function get() {
        return this._outerBound;
      },
      set: function set(val) {
        this._outerBound = val;
      }
    }, {
      key: "innerBound",
      get: function get() {
        return this._innerBound;
      },
      set: function set(val) {
        this._innerBound = val;
      }
    }, {
      key: "getFont",
      value: function getFont() {
        return this.font;
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        this.font = font;
      }
    }, {
      key: "mouseEnabled",
      get: function get() {
        return false;
      }
    }, {
      key: "parent",
      get: function get() {
        return this.parentObject;
      },
      set: function set(parent) {
        this.parentObject = parent;
      }
    }]);

    return Component;
  }(DisplayObject);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_a$2 = typeof Padding !== "undefined" && Padding) === "function" ? _a$2 : Object]), __metadata("design:returntype", void 0)], Component.prototype, "setMargin", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_b = typeof Padding !== "undefined" && Padding) === "function" ? _b : Object]), __metadata("design:returntype", void 0)], Component.prototype, "setPadding", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_c = typeof BorderStyle !== "undefined" && BorderStyle) === "function" ? _c : Object]), __metadata("design:returntype", void 0)], Component.prototype, "setBorder", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], Component.prototype, "setEnable", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_d = typeof FontStyle !== "undefined" && FontStyle) === "function" ? _d : Object]), __metadata("design:returntype", void 0)], Component.prototype, "setFont", null);

  var Container = /*#__PURE__*/function (_Component) {
    _inherits(Container, _Component);

    var _super = _createSuper(Container);

    function Container() {
      var _this;

      _classCallCheck(this, Container);

      _this = _super.call(this);
      _this._children = [];
      return _this;
    }

    _createClass(Container, [{
      key: "findMouseEventHandler",
      value: function findMouseEventHandler(p) {
        if (this == _get(_getPrototypeOf(Container.prototype), "findMouseEventHandler", this).call(this, p)) {
          for (var i = this._children.length - 1; i >= 0; i--) {
            var c = this._children[i];

            if (c.isPointInPath(p)) {
              return c.findMouseEventHandler(p);
            }
          }

          return this;
        }

        return undefined;
      }
    }, {
      key: "onPaint",
      value: function onPaint() {
        _get(_getPrototypeOf(Container.prototype), "onPaint", this).call(this);

        this._children.forEach(function (c) {
          c.onPaint();
        });
      }
    }, {
      key: "addChild",
      value: function addChild(c) {
        if (c != undefined) {
          c.graphics = this.graphics;

          this._children.push(c);

          c.parentObject = this;
          c.measure();
          c.render();
          c.complete();
        }
      }
    }, {
      key: "getChildren",
      value: function getChildren() {
        return this._children;
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        this._children = this._children.filter(function (c, i) {
          return c != child;
        });
      }
    }, {
      key: "contains",
      value: function contains(c) {
        if (_get(_getPrototypeOf(Container.prototype), "contains", this).call(this, c)) return true;
        var exist = false;

        for (var i = 0; i < this._children.length; i++) {
          if (this._children[i].contains(c)) {
            exist = true;
            break;
          }
        }

        return exist;
      }
    }, {
      key: "measure",
      value: function measure() {
        _get(_getPrototypeOf(Container.prototype), "measure", this).call(this);

        this._children.forEach(function (c) {
          return c.measure();
        });
      }
    }]);

    return Container;
  }(Component);

  var Application = /*#__PURE__*/function (_Container) {
    _inherits(Application, _Container);

    var _super = _createSuper(Application);

    function Application() {
      var _this;

      var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('canvas');

      _classCallCheck(this, Application);

      _this = _super.call(this);
      if (Application._instance) throw Error('singleton already constructed!');
      Application._instance = _assertThisInitialized(_this);
      _this.addedToStage = false; // let svg = document.getElementById("lineSvg");
      // if (svg) {
      //     document.body.insertBefore(canvas, svg);
      // } else {

      document.body.appendChild(canvas); // }

      _this.graphics = canvas.getContext('2d');
      _this.graphics.renderer = _assertThisInitialized(_this);
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;
      _this.graphics.canvas.width = innerWidth;
      _this.graphics.canvas.height = innerHeight;

      _this.setWidth(innerWidth);

      _this.setHeight(innerHeight);

      _this.setBorder(new BorderStyle({
        enable: false,
        size: 0
      }));

      _this.setMargin(new Padding({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }));

      _this.setPadding(new Padding({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }));

      return _this;
    }

    _createClass(Application, [{
      key: "onPaint",
      value: function onPaint() {
        var _this$outerBound = this.outerBound,
            width = _this$outerBound.width,
            height = _this$outerBound.height;
        var g = this.graphics;
        g.clearRect(0, 0, width, height);

        _get(_getPrototypeOf(Application.prototype), "onPaint", this).call(this);
      }
    }, {
      key: "initializeListeners",
      value: function initializeListeners() {
        var _this2 = this;

        _get(_getPrototypeOf(Application.prototype), "initializeListeners", this).call(this);

        var resize = function resize() {
          var _window2 = window,
              innerWidth = _window2.innerWidth,
              innerHeight = _window2.innerHeight;
          _this2.graphics.canvas.width = innerWidth;
          _this2.graphics.canvas.height = innerHeight;

          _this2.setWidth(innerWidth);

          _this2.setHeight(innerHeight);
        };

        window.addEventListener('resize', resize, false);
      }
    }, {
      key: "mouseEnabled",
      get: function get() {
        return true;
      }
    }, {
      key: "complete",
      value: function complete() {
        if (this.addedToStage) return true;
        this.addedToStage = true;
        return _get(_getPrototypeOf(Application.prototype), "complete", this).call(this);
      }
    }], [{
      key: "instance",
      get: function get() {
        return Application._instance;
      }
    }]);

    return Application;
  }(Container);
  Application._instance = null;

  var Register = /*#__PURE__*/function () {
    function Register() {
      var _this = this;

      _classCallCheck(this, Register);

      var frame = function frame() {
        if (Application.instance) {
          _this.enable();
        } else {
          setTimeout(frame);
        }
      };

      setTimeout(frame);
    }

    _createClass(Register, [{
      key: "dom",
      get: function get() {
        return this.application.graphics.canvas;
      }
    }, {
      key: "application",
      get: function get() {
        return Application.instance;
      }
    }], [{
      key: "register",
      value: function register(controlClass) {
        Reflect.construct(controlClass, []);
      }
    }]);

    return Register;
  }();

  var Point = function Point(param) {
    _classCallCheck(this, Point);

    var _ref = param || {},
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y;

    this.x = x;
    this.y = y;
  };

  Point = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Point);

  var MouseRegister = /*#__PURE__*/function (_Register) {
    _inherits(MouseRegister, _Register);

    var _super = _createSuper(MouseRegister);

    function MouseRegister() {
      _classCallCheck(this, MouseRegister);

      return _super.call(this);
    }

    _createClass(MouseRegister, [{
      key: "enable",
      value: function enable() {
        var _this = this;

        console.log('Mouse Control Registered.');
        var dom = this.dom,
            application = this.application;
        application.complete();
        dom.addEventListener(MouseEvent.MOUSE_CLICK, function (e) {
          var p = new Point({
            x: e.clientX,
            y: e.clientY
          });
          var c = application.findMouseEventHandler(p);

          if (c) {
            _this.triggerEvent(c, MouseEvent.MOUSE_CLICK, p);
          }
        });
        dom.addEventListener(MouseEvent.MOUSE_MOVE, function (e) {
          var t = _this.target;
          var p = new Point({
            x: e.clientX,
            y: e.clientY
          });
          var c = application.findMouseEventHandler(p);

          if (t == undefined) {
            _this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
          } else {
            if (c != t) {
              _this.triggerEvent(t, MouseEvent.MOUSE_LEAVE, p);

              _this.triggerEvent(c, MouseEvent.MOUSE_ENTER, p);
            } else {
              _this.triggerEvent(c, MouseEvent.MOUSE_MOVE, p);
            }
          }

          _this.target = c;
        });
      }
    }, {
      key: "triggerEvent",
      value: function triggerEvent(target, type, point) {
        target.trigger(new MouseEvent(target, type, point));
      }
    }]);

    return MouseRegister;
  }(Register);

  var TimerEvent = /*#__PURE__*/function (_CoreEvent) {
    _inherits(TimerEvent, _CoreEvent);

    var _super = _createSuper(TimerEvent);

    function TimerEvent(target, repeat) {
      var _this;

      _classCallCheck(this, TimerEvent);

      _this = _super.call(this, target, TimerEvent.NAME);
      _this.repeat = repeat;
      return _this;
    }

    return TimerEvent;
  }(CoreEvent);
  TimerEvent.NAME = "timer";

  var Timer = /*#__PURE__*/function (_EventDispatcher) {
    _inherits(Timer, _EventDispatcher);

    var _super = _createSuper(Timer);

    function Timer(options) {
      var _this;

      _classCallCheck(this, Timer);

      _this = _super.call(this);

      var _ref = options || {},
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 1 : _ref$delay,
          _ref$repeat = _ref.repeat,
          repeat = _ref$repeat === void 0 ? -1 : _ref$repeat;

      _this.delay = delay;
      _this.repeat = repeat;
      return _this;
    }

    _createClass(Timer, [{
      key: "setDelay",
      value: function setDelay(delay) {
        this.delay = delay;
      }
    }, {
      key: "start",
      value: function start(options) {
        var _this2 = this;

        var _ref2 = options || {},
            _ref2$delay = _ref2.delay,
            delay = _ref2$delay === void 0 ? this.delay : _ref2$delay,
            _ref2$repeat = _ref2.repeat,
            repeat = _ref2$repeat === void 0 ? this.repeat : _ref2$repeat;

        if (this.handler) {
          this.stop();
        }

        this.handler = setInterval(function () {
          if (repeat != 0) {
            if (repeat > 0) repeat--;

            _this2.trigger(new TimerEvent(_this2, repeat));
          } else {
            _this2.stop();
          }
        }, delay);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        clearInterval(this.handler);
        this.handler = undefined;
      }
    }, {
      key: "on",
      value: function on(type, listener) {
        this.off(type);
        return _get(_getPrototypeOf(Timer.prototype), "on", this).call(this, type, listener);
      }
    }]);

    return Timer;
  }(EventDispatcher);

  var Serise_1$1, Axis_1$1, _a$1;

  var Serise$1 = Serise_1$1 = /*#__PURE__*/function () {
    function Serise(param) {
      _classCallCheck(this, Serise);

      var _ref = param || {},
          name = _ref.name,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? [] : _ref$data;

      this.name = name;
      this.data = data;
    }

    _createClass(Serise, [{
      key: "clone",
      value: function clone() {
        var name = this.name,
            data = [];
        this.data.forEach(function (d) {
          return data.push(d);
        });
        return new Serise_1$1({
          name: name,
          data: data
        });
      }
    }]);

    return Serise;
  }();

  Serise$1 = Serise_1$1 = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Serise$1);

  var Axis$1 = Axis_1$1 = /*#__PURE__*/function () {
    function Axis(param) {
      _classCallCheck(this, Axis);

      var _ref2 = param || {},
          name = _ref2.name,
          _ref2$label = _ref2.label,
          label = _ref2$label === void 0 ? new FontStyle() : _ref2$label,
          _ref2$border = _ref2.border,
          border = _ref2$border === void 0 ? new BorderStyle() : _ref2$border,
          _ref2$data = _ref2.data,
          data = _ref2$data === void 0 ? [] : _ref2$data,
          fomartter = _ref2.fomartter,
          renderer = _ref2.renderer;

      this.name = name;
      this.label = label;
      this.border = border;
      this.data = data;
      this.fomartter = fomartter;
      this.renderer = renderer;
    }

    _createClass(Axis, [{
      key: "clone",
      value: function clone() {
        var name = this.name,
            label = new FontStyle(this.label),
            border = new BorderStyle(this.border),
            data = [];
        this.data.forEach(function (d) {
          return data.push(d);
        });
        return new Axis_1$1({
          name: name,
          label: label,
          border: border,
          data: data
        });
      }
    }]);

    return Axis;
  }();

  Axis$1 = Axis_1$1 = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Axis$1);
  var AbstractChart$1 = /*#__PURE__*/function (_Container) {
    _inherits(AbstractChart, _Container);

    var _super = _createSuper(AbstractChart);

    function AbstractChart() {
      var _this;

      _classCallCheck(this, AbstractChart);

      _this = _super.call(this);
      _this.maxValue = 100;
      _this.serise = [];
      _this.xAxis = new Axis$1();
      _this.yAxis = new Axis$1();
      _this.timer = new Timer();
      return _this;
    }

    _createClass(AbstractChart, [{
      key: "onComplete",
      value: function onComplete() {
        var yAxis = new Axis$1({
          name: '客流(人次)',
          border: new BorderStyle({
            color: 'white',
            size: 1
          }),
          label: new FontStyle({
            color: rgb(255, 255, 158)
          })
        });
        this.setYAxis(yAxis);
      }
    }, {
      key: "getTitle",
      value: function getTitle() {
        return this.title;
      }
    }, {
      key: "setTitle",
      value: function setTitle(title) {
        this.title = title;
      }
    }, {
      key: "getSerise",
      value: function getSerise() {
        return this.serise;
      }
    }, {
      key: "setSerise",
      value: function setSerise(serise) {
        this.serise = serise;
      }
    }, {
      key: "getXAxis",
      value: function getXAxis() {
        return this.xAxis;
      }
    }, {
      key: "setXAxis",
      value: function setXAxis(axis) {
        this.xAxis = axis;
      }
    }, {
      key: "getYAxis",
      value: function getYAxis() {
        return this.yAxis;
      }
    }, {
      key: "setYAxis",
      value: function setYAxis(axis) {
        this.yAxis = axis;
      }
    }, {
      key: "generateMaxValue",
      value: function generateMaxValue() {
        var max = 0;
        this.serise.forEach(function (s) {
          return s.data.forEach(function (d) {
            return max = Math.max(max, d);
          });
        });
        max = Math.max(100, max);
        var strGap = String(parseInt(String(Math.max(100, max) / 5)));
        var i = parseInt(strGap.substr(0, 2));

        if (i > 50) {
          i = 100;
        } else if (i > 20) {
          i = 50;
        } else if (i > 10) {
          i = 20;
        } else {
          i = 10;
        }

        var maxValue = Math.ceil(i * Math.pow(10, strGap.length - 2) * 5);
        this.maxValue = maxValue;
      }
    }, {
      key: "getAxisFomartter",
      value: function getAxisFomartter(axis) {
        return axis.fomartter || function (data) {
          if (_typeof(data) == 'object') {
            return data.value;
          }

          return String(data);
        };
      }
    }]);

    return AbstractChart;
  }(Container);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], AbstractChart$1.prototype, "setTitle", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_a$1 = typeof Array !== "undefined" && Array) === "function" ? _a$1 : Object]), __metadata("design:returntype", void 0)], AbstractChart$1.prototype, "setSerise", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [Axis$1]), __metadata("design:returntype", void 0)], AbstractChart$1.prototype, "setXAxis", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [Axis$1]), __metadata("design:returntype", void 0)], AbstractChart$1.prototype, "setYAxis", null);

  var PieChart = /*#__PURE__*/function (_AbstractChart) {
    _inherits(PieChart, _AbstractChart);

    var _super = _createSuper(PieChart);

    function PieChart() {
      var _this;

      _classCallCheck(this, PieChart);

      _this = _super.call(this);

      _this.setYAxis(new Axis$1({
        name: '单位：人次',
        label: new FontStyle({
          color: 'white'
        })
      }));

      return _this;
    }

    _createClass(PieChart, [{
      key: "onComplete",
      value: function onComplete() {}
    }, {
      key: "paint",
      value: function paint(g) {
        var _this2 = this;

        var serise = this.getSerise(),
            xAxis = this.getXAxis();
        if (!serise || serise.length <= 0) return;
        var _this$innerBound = this.innerBound,
            width = _this$innerBound.width,
            height = _this$innerBound.height;
        var font = this.getFont();
        var fontSize = height * 0.05;
        g.font = "".concat(fontSize, "px ").concat(font.family, " blod");
        g.textBaseline = 'hanging';
        g.fillStyle = 'black';
        var top = fontSize * 3,
            left = top,
            right = top;
        {
          var name = "".concat(this.yAxis.name);
          var fs = fontSize * 0.8;
          g.textBaseline = 'top';
          g.textAlign = 'left';
          g.fillStyle = 'white';
          g.font = "".concat(fs, "px ").concat(font.family, " blod");
          g.fillText(name, 4, 4);
        }
        {
          // draw title
          var _name = "".concat(this.serise[0].name);

          var w = width - left - right;
          g.textBaseline = 'top';
          g.textAlign = 'center';
          g.fillStyle = 'white';
          g.font = "".concat(fontSize, "px ").concat(font.family, " blod");
          g.fillText(_name, left + w * 0.5, fontSize + 4, width - left - right);
        }
        var legendTotalWidth = width * 0.8;
        var lFontSize = fontSize * 0.6,
            lGap = lFontSize * 0.3,
            lWidth = lFontSize * 1.5;
        g.font = "".concat(lFontSize, "px ").concat(this.xAxis.label.family, " blod");
        var numLines = this.generateLegendLines(g, lFontSize, lGap, lWidth, legendTotalWidth);
        var hGap = 4,
            bottom = (fontSize + hGap) * numLines - hGap;
        var xx = width * 0.1;
        var yy = height - bottom;
        {
          // draw legend
          // calculate legend lines
          var sum = 0;
          this.serise[0].data.forEach(function (d) {
            sum += d;
          });

          var xRenderer = function xRenderer(g, rect, data, curVal, total) {
            var fontSize = rect.height,
                lFontSize = fontSize * 0.6,
                lGap = lFontSize * 0.3,
                lWidth = lFontSize * 1.5;
            g.fillStyle = _typeof(data) == 'object' ? data.color : this.xAxis.label.color;
            g.fillRect(rect.x, rect.y + (fontSize - lFontSize) * 0.5, lWidth, lFontSize);
            g.fillStyle = 'white';
            g.textBaseline = 'middle';
            g.textAlign = 'left';
            var label = String(_typeof(data) == 'object' ? data.value : data);
            var per = String(total == 0 ? 0 : (curVal * 100 / total).toFixed(2));

            while (true) {
              var c = per.charAt(per.length - 1);
              var i = per.indexOf('.');

              if (c == '.' || i >= 0 && c == '0') {
                per = per.substr(0, per.length - 1);
                continue;
              }

              break;
            }

            var display = "".concat(label, "\uFF08").concat(curVal, "/").concat(per, "%\uFF09");
            left + g.measureText(display).width;
            g.fillText("".concat(label), rect.x + lGap + lWidth, rect.y + 2 + fontSize * 0.5);
          };

          xAxis.data.forEach(function (data, i) {
            var ww = lGap + g.measureText(String(_typeof(data) == 'object' ? data.value : data)).width + lWidth + lGap;
            var val = 0;

            if (_this2.serise && _this2.serise.length > 0 && i < _this2.serise[0].data.length) {
              val = _this2.serise[0].data[i];
            }

            if (xx + ww > width * 0.9) {
              xx = width * 0.1;
              yy += fontSize + hGap;
            } // yy += fontSize * 1.2;


            xRenderer(g, new Rectangle({
              x: xx,
              y: yy,
              width: ww,
              height: fontSize
            }), data, val, sum);
            xx += ww;
          });
        }
        {
          var _sum = 0;
          this.serise[0].data.forEach(function (d) {
            _sum += d;
          });
          var renderData = [];

          for (var i = 0; i < this.xAxis.data.length; i++) {
            var axis = this.xAxis.data[i],
                value = i < this.serise[0].data.length ? this.serise[0].data[i] : 0,
                total = _sum;
            renderData.push({
              axis: axis,
              value: value,
              total: total
            });
          }

          var aw = width - right,
              ah = height - top - bottom * 2;
          var ax = aw * 0.5,
              ay = top + ah * 0.5,
              r = Math.min(aw, ah) * 0.35;
          var fromAngle = -0.5 * Math.PI;

          if (_sum < 0) {
            if (renderData.length > 0) {
              var data = renderData[0];
              var toAngle = fromAngle + 2 * Math.PI;
              var color = _typeof(data.axis) == 'object' ? data.axis.color : 'white';
              g.fillStyle = color;
              g.beginPath();
              g.moveTo(ax, ay);
              g.arc(ax, ay, r, fromAngle, toAngle);
              g.fill();
            }
          } else {
            (function () {
              renderData.forEach(function (data) {
                var percent = data.value / data.total;
                var toAngle = fromAngle + percent * 2 * Math.PI;
                var color = _typeof(data.axis) == 'object' ? data.axis.color : 'white';
                g.fillStyle = color;
                g.beginPath();
                g.moveTo(ax, ay);
                g.arc(ax, ay, r, fromAngle, toAngle);
                g.fill();
                fromAngle = toAngle;
              });
              fromAngle = -0.5 * Math.PI;
              var rightList = [],
                  leftList = [];
              var fs = fontSize * 0.8;
              var minY = ay - r * 1,
                  maxY = ay + r * 1.2 - fontSize;
              renderData.forEach(function (data) {
                if (data.value == 0) return;
                var percent = data.value / data.total;
                var toAngle = fromAngle + percent * 2 * Math.PI,
                    mid = (fromAngle + toAngle) / 2;
                var xx = ax + r * Math.cos(mid),
                    yy = ay + r * Math.sin(mid);
                var color = _typeof(data.axis) == 'object' ? data.axis.color : 'white';
                var isRight = xx > ax;
                var RX = isRight ? ax - r : ax + r,
                    RY = ay,
                    R = r * 2.2;
                var cp = crossPoint(ax, ay, xx, yy, RX, RY, R, isRight);

                if (cp.y < minY) {
                  cp.y = minY;
                  cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, isRight);
                } else if (cp.y > maxY) {
                  cp.y = maxY;
                  cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, isRight);
                }

                var list = cp.x < ax ? leftList : rightList;
                var layout = {
                  label: String(data.value),
                  percent: data.value / data.total,
                  position: cp.x < ax ? 'right' : 'left',
                  color: color,
                  rx: RX,
                  ry: RY,
                  radius: R,
                  ax: xx,
                  ay: yy,
                  bx: cp.x,
                  by: cp.y,
                  width: 0,
                  height: fs * 2.5
                };
                list.push(layout);
                fromAngle = toAngle;
              });

              for (var n = 0; n < 1; n++) {
                [rightList, leftList].forEach(function (list, i) {
                  adjustSingleSide(list, maxY - minY, i == 0, fontSize * 2.2);
                });
                [rightList, leftList].forEach(function (list) {
                  list.forEach(function (layout) {
                    var cp = {
                      x: layout.bx,
                      y: layout.by
                    };
                    var isRight = layout.position == 'right';
                    var RX = layout.rx,
                        RY = layout.ry,
                        R = layout.radius;
                    cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight); // if (!cp) return;
                    // if (cp.y < minY) {
                    //     cp.y = minY;
                    //     cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight);
                    // } else if (cp.y > maxY) {
                    //     cp.y = maxY;
                    //     cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight);
                    // }

                    layout.bx = cp.x;
                    layout.by = cp.y;
                  });
                });
              }

              var offset = 15;
              [rightList, leftList].forEach(function (list) {
                list.forEach(function (layout) {
                  g.strokeStyle = layout.color;
                  g.beginPath();
                  g.moveTo(layout.ax, layout.ay);
                  g.lineTo(layout.bx, layout.by);
                  g.lineTo(layout.bx + (layout.position == 'right' ? -offset : offset), layout.by);
                  g.stroke();
                  g.fillStyle = layout.color; // let isRight = layout.position == 'right';

                  var isRight = layout.bx < ax;
                  g.textAlign = isRight ? 'right' : 'left';
                  g.fillText(layout.label, layout.bx + (isRight ? -offset * 1.5 : offset * 1.5), layout.by + 2);
                  var per = String((layout.percent * 100).toFixed(2));

                  while (true) {
                    var c = per.charAt(per.length - 1);

                    var _i = per.indexOf('.');

                    if (c == '.' || _i >= 0 && c == '0') {
                      per = per.substr(0, per.length - 1);
                      continue;
                    }

                    break;
                  }

                  g.fillText("(".concat(per, "%)"), layout.bx + (isRight ? -offset * 1.5 : offset * 1.5), layout.by + fs);
                });
              });
            })();
          }
        }
      }
    }, {
      key: "xAxisRenderer",
      get: function get() {
        var xAxis = this.xAxis;
        this.getAxisFomartter(xAxis);
        return xAxis.renderer || function (g, rect, data) {
          var fontSize = rect.height,
              lFontSize = fontSize * 0.6,
              lGap = lFontSize * 0.3,
              lWidth = lFontSize * 1.5;
          g.fillStyle = _typeof(data) == 'object' ? data.color : this.xAxis.label.color;
          g.fillRect(rect.x, rect.y + (fontSize - lFontSize) * 0.5, lWidth, lFontSize);
          g.fillStyle = 'white';
          g.textBaseline = 'middle';
          g.textAlign = 'left';
          g.fillText(String(_typeof(data) == 'object' ? data.value : data), rect.x + lGap + lWidth, rect.y + 2 + fontSize * 0.5);
        };
      }
    }, {
      key: "generateLegendLines",
      value: function generateLegendLines(g, fontSize, lGap, lWidth, totalWidth) {
        var numLines = 1;
        var xAxis = this.xAxis;

        var fomartter = xAxis.fomartter || function (data) {
          return String(_typeof(data) == 'object' ? data.value : data);
        };

        var w = -lGap;
        xAxis.data.forEach(function (data) {
          var lw = lGap + g.measureText(fomartter(data)).width + lWidth + lWidth;

          if (w + lw > totalWidth) {
            w = lw;
            numLines++;
          } else {
            w += lw;
          }
        });
        return numLines;
      }
    }]);

    return PieChart;
  }(AbstractChart$1);

  function adjustSingleSide(list, height, isRight, fs) {
    if (!isRight) list.reverse();

    function shiftDown(start, end, delta) {
      for (var j = start; j < end; j++) {
        list[j].by += delta;

        if (j > start && j + 1 < end && list[j + 1].by > list[j].by + list[j].height) {
          // shiftUp(j, delta / 2);
          return;
        }
      } // shiftUp(end - 1, delta / 2);

    }

    function shiftUp(end, delta) {
      for (var j = end; j >= 0; j--) {
        list[j].by -= delta;

        if (j > 0 && list[j].by > list[j - 1].by + list[j - 1].height) {
          break;
        }
      }
    }

    var lastY = Number.NEGATIVE_INFINITY;
    var delta;
    var len = list.length;
    list.forEach(function (d, i) {
      delta = d.by - lastY;

      if (delta < 0) {
        shiftDown(i, len, -delta);
      }

      lastY = d.by + d.height;
    });

    if (height / 2 - lastY < 0) {
      shiftUp(len - 1, fs);
    }
  }

  var crossPoint = function crossPoint(x1, y1, x2, y2, m, n, r, isRight) {
    // if(x1 == x2) x2 = x2 + 1;
    var kbArr = binaryEquationGetKB(x1, y1, x2, y2);
    var k = kbArr[0],
        b = kbArr[1];
    var aX = 1 + k * k;
    var bX = 2 * k * (b - n) - 2 * m;
    var cX = m * m + (b - n) * (b - n) - r * r;
    var insertPoints = [];
    var xArr = quadEquationGetX(aX, bX, cX);
    xArr.forEach(function (x) {
      var y = k * x + b;
      insertPoints.push({
        x: x,
        y: y
      });
    });
    return insertPoints.length > 0 ? insertPoints[isRight ? 0 : insertPoints.length > 1 ? 1 : 0] : {
      x: x1,
      y: y1
    };
  };

  function quadEquationGetX(a, b, c) {
    var xArr = [];
    var result = Math.pow(b, 2) - 4 * a * c;

    if (result > 0) {
      xArr.push((-b + Math.sqrt(result)) / (2 * a));
      xArr.push((-b - Math.sqrt(result)) / (2 * a));
    } else if (result == 0) {
      xArr.push(-b / (2 * a));
    }

    return xArr;
  }

  function binaryEquationGetKB(x1, y1, x2, y2) {
    var k = (y1 - y2) / (x1 - x2);
    var b = (x1 * y2 - x2 * y1) / (x1 - x2);
    return [k, b];
  }

  var Serise_1, Axis_1, _a;

  var Serise = Serise_1 = /*#__PURE__*/function () {
    function Serise(param) {
      _classCallCheck(this, Serise);

      var _ref = param || {},
          name = _ref.name,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? [] : _ref$data;

      this.name = name;
      this.data = data;
    }

    _createClass(Serise, [{
      key: "clone",
      value: function clone() {
        var name = this.name,
            data = [];
        this.data.forEach(function (d) {
          return data.push(d);
        });
        return new Serise_1({
          name: name,
          data: data
        });
      }
    }]);

    return Serise;
  }();

  Serise = Serise_1 = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Serise);

  var Axis = Axis_1 = /*#__PURE__*/function () {
    function Axis(param) {
      _classCallCheck(this, Axis);

      var _ref2 = param || {},
          name = _ref2.name,
          _ref2$label = _ref2.label,
          label = _ref2$label === void 0 ? new FontStyle() : _ref2$label,
          _ref2$border = _ref2.border,
          border = _ref2$border === void 0 ? new BorderStyle() : _ref2$border,
          _ref2$data = _ref2.data,
          data = _ref2$data === void 0 ? [] : _ref2$data,
          fomartter = _ref2.fomartter,
          renderer = _ref2.renderer;

      this.name = name;
      this.label = label;
      this.border = border;
      this.data = data;
      this.fomartter = fomartter;
      this.renderer = renderer;
    }

    _createClass(Axis, [{
      key: "clone",
      value: function clone() {
        var name = this.name,
            label = new FontStyle(this.label),
            border = new BorderStyle(this.border),
            data = [];
        this.data.forEach(function (d) {
          return data.push(d);
        });
        return new Axis_1({
          name: name,
          label: label,
          border: border,
          data: data
        });
      }
    }]);

    return Axis;
  }();

  Axis = Axis_1 = __decorate([CloneableDescriptor, __metadata("design:paramtypes", [Object])], Axis);
  var AbstractChart = /*#__PURE__*/function (_Container) {
    _inherits(AbstractChart, _Container);

    var _super = _createSuper(AbstractChart);

    function AbstractChart() {
      var _this;

      _classCallCheck(this, AbstractChart);

      _this = _super.call(this);
      _this.maxValue = 100;
      _this.serise = [];
      _this.xAxis = new Axis();
      _this.yAxis = new Axis();
      _this.timer = new Timer();
      return _this;
    }

    _createClass(AbstractChart, [{
      key: "onComplete",
      value: function onComplete() {
        var yAxis = new Axis({
          name: '客流(人次)',
          border: new BorderStyle({
            color: 'white',
            size: 1
          }),
          label: new FontStyle({
            color: rgb(255, 255, 158)
          })
        });
        this.setYAxis(yAxis);
      }
    }, {
      key: "getTitle",
      value: function getTitle() {
        return this.title;
      }
    }, {
      key: "setTitle",
      value: function setTitle(title) {
        this.title = title;
      }
    }, {
      key: "getSerise",
      value: function getSerise() {
        return this.serise;
      }
    }, {
      key: "setSerise",
      value: function setSerise(serise) {
        this.serise = serise;
      }
    }, {
      key: "getXAxis",
      value: function getXAxis() {
        return this.xAxis;
      }
    }, {
      key: "setXAxis",
      value: function setXAxis(axis) {
        this.xAxis = axis;
      }
    }, {
      key: "getYAxis",
      value: function getYAxis() {
        return this.yAxis;
      }
    }, {
      key: "setYAxis",
      value: function setYAxis(axis) {
        this.yAxis = axis;
      }
    }, {
      key: "generateMaxValue",
      value: function generateMaxValue() {
        var max = 0;
        this.serise.forEach(function (s) {
          return s.data.forEach(function (d) {
            return max = Math.max(max, d);
          });
        });
        max = Math.max(100, max);
        var strGap = String(parseInt(String(Math.max(100, max) / 5)));
        var i = parseInt(strGap.substr(0, 2));

        if (i > 50) {
          i = 100;
        } else if (i > 20) {
          i = 50;
        } else if (i > 10) {
          i = 20;
        } else {
          i = 10;
        }

        var maxValue = Math.ceil(i * Math.pow(10, strGap.length - 2) * 5);
        this.maxValue = maxValue;
      }
    }, {
      key: "getAxisFomartter",
      value: function getAxisFomartter(axis) {
        return axis.fomartter || function (data) {
          if (_typeof(data) == 'object') {
            return data.value;
          }

          return String(data);
        };
      }
    }]);

    return AbstractChart;
  }(Container);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], AbstractChart.prototype, "setTitle", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object]), __metadata("design:returntype", void 0)], AbstractChart.prototype, "setSerise", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [Axis]), __metadata("design:returntype", void 0)], AbstractChart.prototype, "setXAxis", null);

  __decorate([InvalidateProperties, __metadata("design:type", Function), __metadata("design:paramtypes", [Axis]), __metadata("design:returntype", void 0)], AbstractChart.prototype, "setYAxis", null);

  // const hex = (i) => {
  //     let h = HEX_STR.charAt(i / 16), l = HEX_STR.charAt(i % 16);
  //     return `${h}${l}`;
  // }
  // const rgb = (r, g, b)=>{
  //     let hR = hex(r), hG = hex(g), hB = hex(b);
  //     return `#${hR}${hG}${hB}`;
  // }

  var colors = [rgb(233, 221, 182), rgb(251, 236, 222), rgb(242, 202, 201), rgb(208, 222, 170), rgb(200, 173, 196), rgb(147, 181, 207), rgb(196, 203, 207), rgb(198, 230, 232), rgb(131, 203, 172), rgb(198, 223, 200), rgb(237, 195, 174), '#00F5FF', '#8B008B', '#90EE90', '#FFA500', '#000B8B', '#FF1493', '#32CD32', '#551A8B', '#FF00FF', '#FF0000', '#8B0000'];

  var CusApp = /*#__PURE__*/function (_Application) {
    _inherits(CusApp, _Application);

    var _super = _createSuper(CusApp);

    function CusApp() {
      _classCallCheck(this, CusApp);

      return _super.apply(this, arguments);
    }

    _createClass(CusApp, [{
      key: "onComplete",
      value: function onComplete() {
        this.setBackground(new BackgroundStyle({
          enable: true,
          color: '#000000'
        }));
        var pie = new PieChart();
        pie.setX(1 / 3);
        pie.setY(0.6);
        pie.setWidth(1 / 3);
        pie.setHeight(0.38);
        pie.setBackground(new BackgroundStyle({
          enable: false
        }));
        var xAxisData = [],
            seriseData = [];

        for (var i = 0; i < 11; i++) {
          xAxisData.push({
            value: 'asdsads',
            color: colors[i]
          });
          seriseData.push(parseInt(String(Math.random() * 10000))); // seriseData.push(values[i % values.length]);
        }

        pie.setXAxis(new Axis({
          name: '票种',
          label: new FontStyle({
            color: 'white'
          }),
          border: new BorderStyle({
            color: 'white',
            size: 1
          }),
          data: xAxisData
        }));
        pie.setSerise([new Serise({
          name: '全线网票卡使用情况',
          data: seriseData
        })]);
        this.addChild(pie);
      }
    }]);

    return CusApp;
  }(Application);

  new CusApp();
  Register.register(MouseRegister);

})));
