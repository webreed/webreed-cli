// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import program = require("commander");

import {init} from "../init";


program
  .parse(process.argv);


// Program Start:

let env = init(program.args[0]);

console.log("Building...", env.projectRootPath);
env.build()
  .catch(err => console.error(err));
