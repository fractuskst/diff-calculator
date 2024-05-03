import _ from 'lodash';

const makeDiffTree = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  return sortedKeys.map((key) => {
    const result = {};
    const oldValue = data1[key];
    const newValue = data2[key];

    if (_.isUndefined(oldValue) && !_.isUndefined(newValue)) {
      result.type = 'added';
      result.value = newValue;
    } else if (!_.isUndefined(oldValue) && _.isUndefined(newValue)) {
      result.type = 'deleted';
      result.value = oldValue;
    } else if (_.isEqual(oldValue, newValue)) {
      result.type = 'unchanged';
      result.value = oldValue;
    } else if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      result.type = 'nested';
      result.value = makeDiffTree(oldValue, newValue);
    } else {
      result.type = 'changed';
      result.oldValue = oldValue;
      result.newValue = newValue;
    }

    result.key = key;
    return result;
  });
};

export default makeDiffTree;
