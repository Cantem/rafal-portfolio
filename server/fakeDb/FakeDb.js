import { data } from "./data.js";
import { Portfolio } from "../db/models/portfolio.js";
import { User } from "../db/models/user.js";
import { ForumCategory } from "../db/models/forumCategory.js";
import { Topic } from "../db/models/topic.js";

export default class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
  }

  async addData() {
    await User.create(data.users);
    await Portfolio.create(data.portfolios);
    await ForumCategory.create(data.forumCategories);
    await Topic.create(data.topics);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}
