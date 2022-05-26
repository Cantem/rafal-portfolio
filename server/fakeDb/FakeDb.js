import { data } from "./data.js";
import { Portfolio } from "../db/models/portfolio.js";
import { User } from "../db/models/user.js";

export default class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
  }

  async addData() {
    await User.create(data.users);
    await Portfolio.create(data.portfolios);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}
