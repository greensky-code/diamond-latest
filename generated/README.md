# Diamond

An Angular 7 based application for the Diamond project.

## Initial Setup

Node.js and npm are required to build this code. NPM comes preinstalled with Node.
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running Node `v10.9.0` or above
by running `node -v` in a terminal/console window.

The correct NPM version comes preinstalled with each version of Node. 

Angular 7 does not support older versions of Node and thus will produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node.

## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm install` command installs all required packages defined in package.json.
The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`. 
This `lite-server` allows for local development.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.

## Building and Running

### npm Commands

Use the **npm start** command to run the web application locally. I new web page will be opened in your browser.

The following commands defined in the 'package.json' file run npm scripts:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run lite` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server.


Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run e2e` - run protractor e2e tests, written in JavaScript (*e2e-spec.js)


### Deployment
use Angular CLI(https://cli.angular.io/) command to compile the application for production

* `ng build --prod --env=prod` - uglify JS file and use the production environment.
You can modify the environmental variable inside src/environment.
This will create index.html and JS file inside dist directory.

### Internationalization(i18N)
The following are the steps to deploy application using different language:

* execute `ng xi18n --locale nb`- this will create messages.xlf inside src directory. `nb` is the locally ID of Norwegian
see(https://angular.io/guide/i18n) for other LOCALE ID.
* rename messages.xlf to messages.<locale ID>.xlf(e.g. messages.nb.xlf) and put it inside src/locale directory.
* Edit the translation of .xlf file by adding <target>Translation</target> in each source tag
    example:
        <source>Menu 1</source>
        <target>Meny 1</target>
* serve or build the application using command `ng serve --aot --locale nb --i18n-format xlf --i18n-file src/locale/messages.nb.xlf`

## Testing

Both karma/jasmine unit test and protractor end-to-end testing are used in this project.

These tools are configured for specific conventions described below.

### Unit Tests

TypeScript unit-tests are in the `app` folder. Their filenames must end in `.spec`.

Run unit tests with the **npm test** command

This command first compiles the application, then simultaneously re-compiles and runs the karma test-runner.
Both the compiler and the karma watch for (different) file changes.

Shut it down manually with `Ctrl-C`.

Test-runner output appears in the terminal window.
We can update our app and our tests in real-time, keeping an eye on the console for broken tests.
Karma is occasionally confused and it is often necessary to shut down its browser or even shut the command down (`Ctrl-C`) and
restart it. 

### End-to-end (E2E) Tests

Run the E2E tests with *npm run e2e* command.

This command first compiles, then simultaneously starts the Http-Server at `localhost:8080`
and launches protractor. 

E2E tests (i.e. functional tests) are in the `e2e` directory, side by side with the `app` folder.
Their filenames must end in `.e2e-spec.ts`. Protractor is configured to find these tests in this location.

The pass/fail test results appear at the bottom of the terminal window.
A custom reporter (see `protractor.config.js`) generates a  `./_test-output/protractor-results.txt` file
which is easier to read; this file is excluded from source control.

Shut it down manually with `Ctrl-C`.

## Files and Folder Structure

Files outside the `src` concern building, deploying, and testing your app. They include configuration files and external dependencies.

Files inside the `src` directory *belong* to your app.

### Top-Level Project Directory Files

#### .editorconfig

Visual Studio Code editor configuration settings that are convenient for Angular 2 development.

#### .gitignore

Files that git should ignore. 

#### karma.config.js

Karma js unit testing configuration settings

#### karma-test-shim.js

Defines the folder structure that drives the unit tests. 

#### package.json

Standard nodejs module configuration and depencencies file. 

#### protractor.config.js

Angular functional testing library that uses webdriver and selenium for end-to-end testing.

#### styles.css

Project specific css settings.

#### systemjs.config.js

SystemJS (a javascript module loader) configuration files. 

#### systemjs.config.extras.js

Additional SystemJS loaded Angular 2 barrels and other js config files.

#### tsconfig.json

Typescript compiler configuration settings for compiling .ts files. 

#### tslint.json

Lint for checking Typescript syntax and standards.