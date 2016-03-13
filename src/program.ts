// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import program = require("commander");


program
  .version(require("../package").version)
  .command("build [project-path]", "process source content and build output", { isDefault: true })
  .command("clean [project-path]", "clean previous build output")
  .parse(process.argv);
