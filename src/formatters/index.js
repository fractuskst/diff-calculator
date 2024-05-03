import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unknown format type ${formatType}`);
  }
};

export default format;
