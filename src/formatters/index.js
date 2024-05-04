import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Unknown format type ${formatType}`);
  }
};

export default format;
