import _ from 'lodash';

const makeDiffTree = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const oldValue = file1[key];
    const newValue = file2[key];
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, type: 'added', value: newValue };
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, type: 'removed', value: oldValue };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, type: 'unchanged', value: oldValue };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
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
