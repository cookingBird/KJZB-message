function writePkgFile (prodOps) {
  const fs = require('fs-extra')
  const pkgJsonFile = JSON.parse(fs.readFileSync('./package.json'))
  for (const key in prodOps) {
    pkgJsonFile[key] = prodOps[key]
  }
  fs.writeFileSync('./package.json', JSON.stringify(pkgJsonFile))
}

writePkgFile({
  main: 'src/index.js'
})
