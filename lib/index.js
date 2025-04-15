let pully = {};

modcore.fs.delete("storage/pully/tmp");

require("modules/pully/lib/download.js");
require("modules/pully/lib/scan.js");
require("modules/pully/lib/config.js");
