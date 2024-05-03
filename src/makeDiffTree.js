import _ from 'lodash';

const makeDiffTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, type: 'added', value: newValue };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'deleted', value: oldValue };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: oldValue };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: makeDiffTree(oldValue, newValue) };
    }
    return {
      key,
      type: 'changed',
      oldValue,
      newValue,
    };
  });
  return result;
};

export default makeDiffTree;
