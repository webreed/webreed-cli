// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import program = require("commander");

import {init} from "../init";


program
  .parse(process.argv);


// Program Start:

build();


async function build(): Promise<void> {
  try {
    let env = init(program.args[0]);

    console.log("Building...", env.projectRootPath);
    await env.build();
  }
  catch (err) {
    if (err.code === "WEBREED_INVALID_CONFIG") {
      for (let issue of err.issues) {
        console.error(`${err.name}: ${err.message}`);
        console.log(`  ${ issue.field.substr(5) }: ${ issue.message }`);
      }
    }
    else {
      console.error(err.stack);
    }

    process.exit(1);
  }
}
