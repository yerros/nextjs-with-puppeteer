const jsonfile = require("jsonfile");

class Models {
  constructor(name) {
    this.name = name;
    this.path = `server/models/${name}.json`;
    this.model = jsonfile.readFileSync(this.path);
  }
}

module.exports = Models;
