/**
 * Extend one object with one or more others, returning the modified object.
 */
declare function extend(target: Object, object1: Object);
/**
 * Extend one object with one or more others, returning the modified object.
 */
declare function extend(deep: boolean, target: Object, object1: Object);
/**
 * Extend one object with one or more others, returning the modified object.
 */
declare function extend(target: Object, object1: Object, ...objectN: Object[]);
/**
 * Extend one object with one or more others, returning the modified object.
 */
declare function extend(deep: boolean, target: Object, object1: Object, ...objectN: Object[]);

declare module "extend" {
    export = extend;
}