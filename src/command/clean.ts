// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import program = require("commander");

import {handleError} from "../handleError";
import {init} from "../init";


program
  .parse(process.argv);


// Program Start:

(async function () {
  try {
    let env = init(program.args[0]);

    console.log("Cleaning...", env.projectRootPath);
    await env.clean();
  }
  catch (err) {
    handleError(err);
  }
})();
