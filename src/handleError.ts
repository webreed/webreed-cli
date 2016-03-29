// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


export function handleError(err: any): void {
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
