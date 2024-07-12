import { echoTest } from "@3rapp/utils";
import { Injectable } from "@nestjs/common";

import { IPost } from "./types";

@Injectable()
export class AppService {
  getHello(): string {
    return echoTest();
  }

  async getPosts(): Promise<IPost[]> {
    return [{ id: 0, title: "post1", body: "post1" }];
  }
}
