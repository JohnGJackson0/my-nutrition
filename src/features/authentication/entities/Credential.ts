export class Credential {
  _email: string;
  _password: string;

  constructor(email: string, password: string) {
    if (isInvalid(password)) {
      throw new Error("Your password must contains only letter and numbers");
    }

    this._password = password;
    this._email = email;

    if (isInvalidAddress(email)) {
      throw new Error("Invalid email address: " + email);
    } else {
      this._email = email.toLowerCase();
    }
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}

function isInvalid(password: string) {
  const passwordRegex = /^[a-zA-Z0-9_.-]*$/;
  return !passwordRegex.test(password);
}

function isInvalidAddress(address: string) {
  const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !validEmailRegex.test(address);
}
