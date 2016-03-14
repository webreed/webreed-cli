// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import path from "path";

import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";

import {init} from "../lib/init";


describe("init(projectRootPath)", function () {

  it("is a function", function () {
    init
      .should.be.a.Function();
  });


  it("returns a webreed environment", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-json-config");
    let env = init(projectRootPath);
    env
      .should.be.instanceOf(Environment);
  });

  it("assigns project root path to the webreed environment", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-json-config");
    let env = init(projectRootPath);
    env.projectRootPath
      .should.be.eql(projectRootPath);
  });

  it("throws error when webreed project does not contain a configuration file", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-no-config");
    (() => init(projectRootPath))
      .should.throw("Project does not contain a 'webreed-config.yaml' or 'webreed-config.json' file.");
  });


  it("passes json configuration to webreed setup function", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-json-config");
    let env = init(projectRootPath);
    env.baseUrl
      .should.be.eql("http://example.com/json");
  });

  it("passes yaml configuration to webreed setup function", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-yaml-config");
    let env = init(projectRootPath);
    env.baseUrl
      .should.be.eql("http://example.com/yaml");
  });

  it("favors yaml configuration over json configuration when both are present", function () {
    let projectRootPath = path.join(__dirname, "fixtures/project-with-yaml-and-json-config");
    let env = init(projectRootPath);
    env.baseUrl
      .should.be.eql("http://example.com/yaml");
  });

});
