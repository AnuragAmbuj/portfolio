# Extensibility Roadmap

## 1. Themes & Customization
- **Dynamic Theming**: Implement a theme editor in the Admin Panel to change colors (CSS variables) at runtime.
- **Multiple Layouts**: Add support for different blog layouts (Grid vs List) configurable via Admin.

## 2. Plugins & Integrations
- **Newsletter**: Integrate ConvertKit or Mailchimp API for newsletter subscription form in Footer or Blog Post.
- **Comments**: Add Giscus (GitHub Discussions) or a custom comment system for blog posts.
- **Analytics**: Integrate Plausible or Google Analytics for more detailed tracking.

## 3. Content Management
- **Draft Mode**: Implement Next.js Draft Mode for previewing unpublished content securely.
- **Versioning**: Store post history in a separate table (`PostVersion`) to allow rolling back changes.
- **Media Library**: Build a drag-and-drop media manager uploading to AWS S3 or Supabase Storage.

## 4. Features
- **Search**: Implement full-text search using Fuse.js (client-side) or PostgreSQL FTS (server-side).
- **Tags Page**: Create a dedicated page for browsing posts by tag.
- **RSS Feed**: Generate an RSS feed for the blog.
