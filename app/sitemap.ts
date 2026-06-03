import { getBlogPosts } from "app/blog/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://where-do-we-start.dev";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
