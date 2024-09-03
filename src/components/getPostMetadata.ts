import fs from "fs";
import matter from "gray-matter";
import PostMetadata from "@/components/PostMetadata";
import { Logger } from 'simple-logging-system';

const getPostMetadata = (): PostMetadata[] => {

  const folder = "src/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`src/posts/${fileName}`, "utf8");
    const logger = new Logger("getPostMetadata")
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: '/assets/' + fileName.replace(".md", ".pdf"),
      resume: matterResult.data.resume,
      image: matterResult.data.image,
      content: matterResult.content,
      key: fileName.replace(".md", "")
    };
  });

  return posts;
};

export default getPostMetadata;