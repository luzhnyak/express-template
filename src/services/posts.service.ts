import { PostDto } from "../types/Dto";
import posts from "../data/posts.json";

export class PostsService {
  static async getAllPosts() {
    return posts;
  }

  static async getPostById(id: number) {
    return posts.find((post) => post.id === id);
  }

  static async createProduct(postObj: PostDto) {
    return postObj;
  }

  static async updateProductById(postObj: PostDto, id: number) {
    return postObj;
  }

  static async deleteProductById(id: number) {
    return posts.find((post) => post.id === id);
  }
}
