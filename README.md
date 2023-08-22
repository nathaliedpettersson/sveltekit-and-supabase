## Sveltekit with Supabase as storage for fake user accounts

As part of my internship, I practised using Sveltekit and Supabase by trying to store users by registration through a form. The user should also be able to log in and log out and Supabase should save this information. 

This is not a finished app (!!) It was mainly used for practice and testing out the framework and database. 

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
