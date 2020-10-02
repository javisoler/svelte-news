/**
 * Group By property from a collection of objects
 *
 * @param {array} list
 * @param {function} keyGetter
 *
 * @returns {Map} A map of the grouped elements
 */
export function groupBy<T, K>(list: T[], keyGetter: (i: T) => K): Map<K, T> {
  const map = new Map();

  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
