# Deployment Guide

## Option 1: Vercel (Recommended)

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Import to Vercel**: Go to [Vercel Dashboard](https://vercel.com/new) and import your repository.
3.  **Environment Variables**: Add the following environment variables in Vercel Project Settings:
    *   `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Vercel Postgres or Neon).
    *   `AUTH_SECRET`: A random string (generate with `openssl rand -base64 32`).
    *   `ADMIN_PASSWORD`: Your desired admin password.
4.  **Deploy**: Click Deploy. Vercel will automatically build and deploy your Next.js app.

## Option 2: Docker / VPS (Fly.io, DigitalOcean)

1.  **Build Docker Image**:
    ```bash
    docker build -t portfolio .
    ```
2.  **Run Container**:
    ```bash
    docker run -p 3000:3000 \
      -e DATABASE_URL="postgresql://..." \
      -e AUTH_SECRET="secret" \
      -e ADMIN_PASSWORD="admin" \
      portfolio
    ```

## Database Migrations

After deployment, ensure you run migrations:
*   **Vercel**: Add a build command override or run locally against production DB: `npx prisma migrate deploy`.
*   **Docker**: Include migration step in entrypoint or run manually.
