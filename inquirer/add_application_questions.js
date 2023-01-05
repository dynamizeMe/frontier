import { name, numbersOnly } from '../utils/regex.js'

export const questions = [
  {
    type: 'list',
    message: 'What type of app would you like to add',
    name: 'appType',
    choices: ['host', 'remote'],
    default() {
      return 'host';
    },
  },
  {
    type: 'input',
    name: 'appName',
    message: "Please name your app",
    default() {
      return 'newApp';
    },
    validate(value) {
      const pass = value.match(name);
      if (pass) {
        return true;
      }

      return 'Please enter a valid app name(no stand alone numbers, special characters or spaces)';
    },
  },
  {
    type: 'input',
    name: 'port',
    message: "What port would you like the host app to use",
    validate(value) {
      const pass = value.match(numbersOnly);
      if (pass) {
        return true;
      }

      return 'Please enter a valid port number(digits only)';
    },
  },
];
