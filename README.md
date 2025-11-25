# Modern Developer Portfolio

A professional, high-performance portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. This project features a dynamic blog, project showcase, and a secure admin dashboard for managing content.

## 🚀 Features

- **Modern UI/UX**: Responsive design with a clean, professional aesthetic using Tailwind CSS.
- **Dark/Light Mode**: Fully supported theming with system preference detection.
- **MDX Blog**: Write blog posts in MDX with syntax highlighting and custom components.
- **Project Showcase**: Display your projects with images, descriptions, and links.
- **Admin Dashboard**: Secure area to manage blog posts and projects.
- **Database Powered**: PostgreSQL database with Prisma ORM for robust data management.
- **Authentication**: Secure authentication for admin access using NextAuth.js.
- **SEO Optimized**: Built-in SEO best practices with Next.js Metadata API.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/AnuragAmbuj/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    Update the variables with your configuration:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
    AUTH_SECRET="your-super-secret-key"
    ADMIN_PASSWORD="your-admin-password"
    ```

4.  **Database Setup**
    Run migrations to set up your database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Configure the **Environment Variables** (`DATABASE_URL`, `AUTH_SECRET`, etc.) in the Vercel dashboard.
4.  Deploy!

## 📄 License

This project is licensed under the MIT License.
