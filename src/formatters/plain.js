const stringify = (value) => {
  if (value === null) {
    return null;
  }
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const plain = (diff) => {
  const iter = (node, path = '') => {
    const result = node
      .filter(({ type }) => type !== 'unchanged')
      .map((item) => {
        const newPath = path ? `${path}.${item.key}` : item.key;
        switch (item.type) {
          case 'added':
            return `Property ${stringify(newPath)} was added with value: ${stringify(item.value)}`;
          case 'removed':
            return `Property ${stringify(newPath)} was removed`;
          case 'changed':
            return `Property ${stringify(newPath)} was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
          case 'nested':
            return `${iter(item.children, newPath)}`;
          default:
            throw new Error(`Unknown item type: ${item.type}`);
        }
      });
    return result.join('\n');
  };
  return iter(diff);
};

export default plain;
