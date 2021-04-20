import { Credential, User, Email } from "../entities";

export interface SignUpService {
  signUpUser: (user: User, credential: Credential) => Promise<User>;
}

export class SignUpInteractor {
  signUpService: SignUpService;

  constructor(signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  async signUp(
    firstName: string,
    lastName: string,
    credential: Credential
  ): Promise<User> {
    console.log("sign up interactor called/  email " + credential.email);
    const user = new User(firstName, lastName, credential.email);
    return this.signUpService.signUpUser(user, credential);
  }
}
