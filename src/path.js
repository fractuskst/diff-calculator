import path from 'path';

const convertPath = (filepath) => {
  if (!path.isAbsolute(filepath)) {
    return path.resolve(filepath);
  }
  return filepath;
};

export default convertPath;
