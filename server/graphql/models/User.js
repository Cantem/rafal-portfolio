export class User {
  constructor(model) {
    this.Model = model;
  }
  signIn() {
    return "Signing In...";
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }

    return this.Model.create(signUpData);
  }

  signOut() {
    return "Signing Out...";
  }
}
