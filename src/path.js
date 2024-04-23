import path from 'path';

const convertPath = (filepath) => {
  if (!path.isAbsolute(path)) {
    return path.resolve(filepath);
  }
  return filepath;
};

export default convertPath;
