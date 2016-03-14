// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import * as fs from "fs";
import * as path from "path";

import yaml = require("js-yaml");

import webreed from "webreed";
import {Environment} from "webreed-core/lib/Environment";


export function init(projectRootPath: string): Environment {
  projectRootPath = path.resolve(projectRootPath || "");
  let config = readConfig(projectRootPath);
  return webreed(projectRootPath, config);
}


function readConfig(projectRootPath: string): any {
  let yamlConfig = getFileContents(projectRootPath, "webreed-config.yaml");
  if (yamlConfig !== null) {
    return yaml.safeLoad(yamlConfig);
  }

  let jsonConfig = getFileContents(projectRootPath, "webreed-config.json");
  if (jsonConfig !== null) {
    return JSON.parse(jsonConfig);
  }

  throw new Error("Project does not contain a 'webreed-config.yaml' or 'webreed-config.json' file.")
}

function getFileContents(projectRootPath: string, fileName: string): string {
  let filePath = path.join(projectRootPath, fileName);
  try {
    fs.accessSync(filePath);
  }
  catch (err) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}
