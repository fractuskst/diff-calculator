import stylish from './stylish.js';

const format = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown format type ${formatType}`);
  }
};

export default format;
