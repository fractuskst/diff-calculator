import _ from 'lodash';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const startIndent = ' '.repeat(depth * 4);
  const bracketIndent = ' '.repeat((depth * 4) - 4);
  const lines = Object.entries(data)
    .map(([key, value]) => `${startIndent}${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (currentNode, depth) => {
    const startIndent = ' '.repeat((depth * 4) - 2);
    const bracketIndent = ' '.repeat((depth * 4) - 4);
    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'added':
          return `${startIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${startIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${startIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [
            `${startIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
            `${startIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${startIndent}  ${node.key}: ${iter(node.value, depth + 1)}`;
        default:
          throw new Error(`Unknown node type (${node.type})!`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
