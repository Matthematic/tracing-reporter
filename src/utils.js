const fs = require('fs')

const createCallback = (resolve, reject) => (err, data) => {
  if (err) reject(err)
  else resolve(data)
}

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', createCallback(resolve, reject))
  })
}

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, createCallback(resolve, reject))
  })
}

const fileExists = (path) => {
  return new Promise(resolve => {
    fs.access(path, err => resolve(!err))
  })
}

const readJson = async (path) => {
  if (await fileExists(path) === false) {
    return null
  }
  return JSON.parse(await readFile(path))
}

module.exports = {
  readFile,
  writeFile,
  fileExists,
  readJson,
}