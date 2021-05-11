export class User {
  firstName: string;
  lastName: string;
  email: string;

  // TODO:
  //It's difficult to have nested entities due to redux-persist
  //so I removed them in this version but will need to clean up later
  //we also need to change this away from class based
  //components due to redux toolkit

  constructor(firstName: string, lastName: string, email: string) {
    if (isEmptyOrNull(firstName) || isEmptyOrNull(lastName)) {
      throw new Error("You must fill first name and last name");
    }
    this.email = email;
    if (isInvalidAddress(email)) {
      throw new Error("Invalid email address: " + email);
    } else {
      this.email = email.toLowerCase();
    }

    this.firstName = firstName.toLocaleLowerCase();
    this.lastName = lastName.toLocaleLowerCase();
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

function isEmptyOrNull(word: string) {
  return !word || word.trim().length === 0;
}

function isInvalidAddress(address: string) {
  const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !validEmailRegex.test(address);
}
