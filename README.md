## Dev.to Clone

This project is a full-stack clone-like version of [Dev.to](https://dev.to), built with Next.js 13 and TypeScript. The application implements user authentication using Auth.js (formerly Next Auth), supports infinite scrolling, bookmarking, tag and reaction systems, and allows posts to be written using Markdown. Server-Side Rendering (SSR) by default to provide excellent Search Engine Optimization (SEO).

## Features
* OAuth with Google and Github
* Public username modification
* Ability to create posts with markdown
* Infinite scroll for fetching posts
* Tagging system (e.g., #javascript, #html)
* Toggle between light and themes
* Bookmark system to save posts for future reading
* Comment system
* Users can edit their own posts
* User details can be edited (username, bio, location, and website)
* Users can enter the URL of their cover post image
* Reaction system
* Form validation and toast notifications for errors or other notifications

# Tech Stack
The following technologies were used in this project:
* Next.js 13 App router + Typescript
* Route handlers (API)
* Prisma ORM
* PostgreSQL + Docker
* TailwindCSS + ShadcnUI
* Zod validation
* Next Auth
* MDX

## Getting Started
1. Clone this repository
```sh
git clone https://github.com/kypexfly/devto-clone.git
```

2. Move the folder an install dependencies
```sh
cd devto-clone
npm install
```

3. Create the `.env` file at root with the following variables:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_generated_string
GOOGLE_CLIENT_ID=read_https://next-auth.js.org/providers/google
GOOGLE_CLIENT_SECRET=read_https://next-auth.js.org/providers/google
GITHUB_ID=read_https://next-auth.js.org/providers/github
GITHUB_SECRET=read_https://next-auth.js.org/providers/github
```

4. Start PostgreSQL database with Docker Compose.
```sh
docker compose up -d
```

5. Generate Prisma types and push schemas to DB.
```sh
npx prisma generate
npx prisma db push
```

6. Run devlopment mode
```sh
npm dev
```

## Inspiration
* [dev.to](https://dev.to)
* [reddit.com](https://www.reddit.com/)
* [Breadit by joschan21](https://github.com/joschan21/breadit)