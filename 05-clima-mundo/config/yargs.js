const direccion = {
    demandOption: true,
    alias: "p",
};

const argv = require("yargs").options({ direccion }).argv;

module.exports = {
    argv,
};