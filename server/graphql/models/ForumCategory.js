export class ForumCategory {
  constructor(model) {
    this.Model = model;
  }

  getAll() {
    return this.Model.find({});
  }
}
