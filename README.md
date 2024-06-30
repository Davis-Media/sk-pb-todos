## SvelteKit + PocketBase Todo App

This app is built with SvelteKit in SPA mode, uses PocketBase as a backend, and does not use TypeScript. This is designed above all else for two things: **speed & simplicity**. I would NOT recommend you try and use this to build a startup, or something critical at work. This is instead designed for simple and very low traffic (internal or personal) tools.

I made some weird choices here, here's why:

1. Why SvelteKit in SPA mode? SvelteKit has a server, why not use it? Because in my opinion that completely defeats the purpose of using pocketbase. Pocketbase gives us a nice client side SDK that makes it extremely to work with our db and auth. Adding our own server, just to talk to Pocketbase when we could do it from the client introduces complexity. This project HATES complexity.
2. Why Pocketbase instead of Supabase? Because as stated above this project is designed to be as simple as humanly possible for rapid iteration on INTERNAL or PERSONAL tools. Supabase requires you to setup a decent amount to get working locally, pocketbase starts up with `./pocketbase serve`. It is smaller and quicker to work with which is perfect for this.
3. Why no TypeScript? I'm gonna be honest this started as a meme. I tried out building with TypeScript expecting to hate it, and honestly I really did for a while. But then I got into the flow state, and realized just how nice it is to have TypeScript shut his yap and just let me write stuff. In a larger more complex app I would NEVER get rid of TypeScript, and please do not use this as ammo in the anti-TS war. I am not on your side, all of my big projects have and will continue to use TypeScript. I just think these tiny little tools just don't need it. Like do I really need to fumble around with interfaces and the like for all my db queries or can I just know that my todos, or images, or whatever I'm working with just has the 4 properties I can see in the console. Look at how simple/small the code is in here, its just not needed and would only slow things down.
4. Why the heavy uses of classes of all things? Because they kinda accidentally became amazing ways of grouping the logical parts of my app. Creating an auth store that held my user state, as well as all the functions to interface with it felt really, really good. It seems like a super natural way to build this client only app that talks to a DB of HTTP. All of the app's "logic" lives in the store for that piece. Does this scale? Probably not, but again for the types of app that this stack is for IT SHOULD NOT HAVE TO.
5. How would you host this? The 5 dollar VPS bros are finally getting their day. I genuinely think that this is the perfect type of app to host there. I've got a couple of these cooking right now (will open source all of them) and I intend to host them all on a $5 VPS. Would be really cool if I could get like 3 of them each running in their own docker container all on the same VPS. Not sure if this is possible, but it will be a fun challenge.

## Getting Started

1. Clone the repo
2. Install packages `pnpm i`
3. Install the pocketbase binary and put it in the `POCKETBASE` directory: https://pocketbase.io/docs/
4. Start the pocketbase server `pnpm run pb:start`
5. Fill in the oauth creds in the pocketbase admin dashboard for github/discord
6. Start the SvelteKit app `pnpm run dev`
