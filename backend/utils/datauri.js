import DataUriParser from "datauri/parser.js";

import path from "path";

const getDataUri = (file) => {
  try {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
  } catch (err) {
    console.error('[getDataUri Error]:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default getDataUri;
