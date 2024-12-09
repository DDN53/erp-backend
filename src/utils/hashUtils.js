const crypto = require("crypto");

// Generate Salt (similar to GenerateHashSalt)
const generateHashSalt = (size) => {
  return crypto.randomBytes(size).toString("base64");
};

// Generate Hash (similar to GenerateHashPassword)
const generateHashPassword = (plainPassword, hashPwdSalt) => {
  const saltBuffer = Buffer.from(hashPwdSalt, "base64");
  return getHashString(plainPassword, saltBuffer);
};

// Get Hash String (similar to GetHashString)
const getHashString = (plainPassword, saltBuffer) => {
  const passwordBuffer = Buffer.from(plainPassword, "utf-16le"); // Use UTF-16LE to match the original
  const combined = Buffer.concat([saltBuffer, passwordBuffer]);

  // Create SHA1 hash of combined buffer (matching your SHA1 hash logic)
  const hash = crypto.createHash("sha1");
  hash.update(combined);
  return hash.digest("base64"); // Return hash as base64 string
};

module.exports = { generateHashSalt, generateHashPassword, getHashString };
