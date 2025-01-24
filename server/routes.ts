import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { articles, revisions, sections } from "@db/schema";
import { eq, or, ilike, asc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get all sections for the table of contents
  app.get("/api/sections", async (_req, res) => {
    try {
      const results = await db
        .select()
        .from(sections)
        .orderBy(asc(sections.order_index));
      res.json(results);
    } catch (error) {
      console.error("Error fetching sections:", error);
      res.status(500).send("Error fetching sections");
    }
  });

  // Get all articles for the sidebar navigation
  app.get("/api/articles", async (_req, res) => {
    try {
      const results = await db
        .select()
        .from(articles)
        .orderBy(asc(articles.title));
      res.json(results);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).send("Error fetching articles");
    }
  });

  // Get a single article by path
  app.get("/api/articles/:path(*)", async (req, res) => {
    try {
      const [article] = await db
        .select()
        .from(articles)
        .where(eq(articles.path, req.params.path))
        .limit(1);

      if (!article) {
        return res.status(404).send("Article not found");
      }

      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).send("Error fetching article");
    }
  });

  // Update an article (protected route)
  app.put("/api/articles/:path(*)", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not logged in");
    }

    if (!req.user || !('isEditor' in req.user) || !req.user.isEditor) {
      return res.status(403).send("Not authorized");
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).send("Content is required");
    }

    try {
      const [article] = await db
        .select()
        .from(articles)
        .where(eq(articles.path, req.params.path))
        .limit(1);

      if (!article) {
        return res.status(404).send("Article not found");
      }

      // Save the current version as a revision
      await db.insert(revisions).values({
        articleId: article.id,
        content: article.content,
        authorId: req.user.id,
      });

      // Update the article
      const [updated] = await db
        .update(articles)
        .set({
          content,
          updatedAt: new Date(),
        })
        .where(eq(articles.id, article.id))
        .returning();

      res.json(updated);
    } catch (error) {
      console.error("Error updating article:", error);
      res.status(500).send("Error updating article");
    }
  });

  // Search articles
  app.get("/api/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query || query.length < 3) {
      return res.json([]);
    }

    try {
      const results = await db
        .select({
          id: articles.id,
          title: articles.title,
          path: articles.path,
          excerpt: articles.content,
        })
        .from(articles)
        .where(
          or(
            ilike(articles.title, `%${query}%`),
            ilike(articles.content, `%${query}%`)
          )
        )
        .limit(10);

      res.json(results.map(r => ({
        ...r,
        excerpt: r.excerpt.substring(0, 150) + "..."
      })));
    } catch (error) {
      console.error("Error searching articles:", error);
      res.status(500).send("Error searching articles");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}