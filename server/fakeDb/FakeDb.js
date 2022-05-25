import { data } from "./data.js";
import { Portfolio } from "../db/models/portfolio.js";

export default class FakeDb {
  async clean() {
    await Portfolio.deleteMany({});
  }

  async addData() {
    await Portfolio.create(data.portfolios);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}
