## Dev.to Clone
This is a fullstack clone-like version of [dev.to](https://dev.to) with Next.js 13 and TypeScript.

> This project is still in development. Not production ready yet.

# Tech Stack
* Next.js 13 App router + Typescript
* Next API routes for backend endpoints
* Prisma + PostgreSQL (Supabase)
* TailwindCSS + Shadcn UI
* Zod validation
* Auth.js
* MDX

## Features
- [x] OAuth with Google and Github
- [x] Change public username
- [x] Create posts with markdown
- [x] Infinite scroll for posts fetching
- [x] Tag system (ex: #javascript, #html)
- [x] Light, dark and system default theme toggle
- [x] Bookmark system (save post for future reading)
- [x] Comment system
- [x] Users can edit their posts
- [ ] Edit user details (name, username, description, contact, etc.)
- [ ] User can upload their cover post
- [ ] Reaction system

## To do
- [x] Implement react-hook-form with Zod input validation
- [ ] Table of content

## Bugs
- [ ] Posts with mdx errors won't load
- [ ] Bookmark button not updating state

## Inspiration
* [dev.to](https://dev.to)
* [reddit.com](https://www.reddit.com/)
* [Breadit by joschan21](https://github.com/joschan21/breadit)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create the .env file at root with the following variables:
```yaml
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
