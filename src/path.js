import path from 'path';

const convertPath = (filepath) => {
  if (!path.isAbsolute(process.cwd(), filepath)) {
    return path.resolve(filepath);
  }
  return filepath;
};

export default convertPath;
