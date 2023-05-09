# Next.js Evaluation Project (bravo edition)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080)
with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization)
to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

Variables can be set in `.env.local` (except for `PORT`).

- `PORT`: Port the server will listen to
  - can't be set in `.env.local` since server starts before it's loaded
  - Next.js defaults to `3000`
  - `npm run dev` will default to `8080`
  - override like: `PORT=4242 npm run dev`
- `LOG_LEVEL`: Verbosity level of the logger (e.g. `trace`, `error`, or `silent`)
  - default is `info`
  - example: `LOG_LEVEL=trace npm run dev`
- `MONGODB_URI`: The mongodb connection URI
- `JWT_SECRET`: The secret that will be used to sign JWTs
