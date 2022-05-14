const jsonfile = require("jsonfile");

const Selector = {
  file: null,
  config: name => (Selector.file = `server/selectors/${name}.json`),
  json: () => jsonfile.readFileSync(Selector.file),
  get: name => Selector.json()[name],
  set: obj => jsonfile.writeFileSync(Selector.file, obj, { space: 2 })
};

module.exports = Selector;
