import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { articles, revisions } from "@db/schema";
import { eq, or, ilike } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.get("/api/articles", async (req, res) => {
    const results = await db
      .select()
      .from(articles)
      .orderBy(articles.title);
    res.json(results);
  });

  app.get("/api/articles/:path(*)", async (req, res) => {
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.path, req.params.path))
      .limit(1);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.json(article);
  });

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
  });

  app.get("/api/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query || query.length < 3) {
      return res.json([]);
    }

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
  });

  const httpServer = createServer(app);
  return httpServer;
}