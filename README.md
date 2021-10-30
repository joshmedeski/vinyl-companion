This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- [x] Connect to Discogs API
- [x] Display vinyls (offline fist with IndexedDB)
- [x] Show contextual sorting screen
- [x] Set `<title>` tag

## Future Features

- [ ] Vinyl “shuffle” feature
	- "I don’t know what to listen to, choose for me"
- [ ] Download newly added Discogs vinyls into IndexedDB
- [ ] List all my vinyls in a random order (ultimate shuffle)
- [ ] Download all vinyls (repeat because of API limit)
- [ ] Reset offline storage
- [ ] Check for new vinyl on load
- [ ] Put Discogs button on home page
- [ ] Create pretty preview page
- [ ] Increase range input button (for iPad mini)
	- [ ] Or change to + / - buttons
- [ ] Playlist feature
- [ ] “What am I in the mood for” feature
	- Pick music based off what I’m in the mood for (ex: “pop”)
- [ ] Add more details to detailed album screen (on press)
	- [ ] Separate screen (with back button)
	- [ ] Show Vinyl inline (but bigger)
	- [ ] Year
	- [ ] Outsource links
		- Lookup on Spotify (via Spotify link)
		- Lookup on Wikipedia
		- Lookup on MetaCritic
	- [ ] Investigate more details
- [ ] Show left to right OR top to bottom
- [ ] Sort by
	- [ ] A-Z or Z-A
	- [ ] Recently added 
- [ ] If less than a month old add “newly added” label
- [ ] Group by purchases (month to month)
- [ ] Add social media image when sharing #marketing
- [ ] Allow people to share their own collection (via `/collections/{collection_id}`)
- [ ] Auto-generate user-specific social share image (like Spotify's playlist titles)
- [ ] Share custom vinyl collections (like a playlist)
- [ ] Scan barcode to and show vinyl in app
- [ ] Track what I've listened to
		- [ ] Watch log (with quick add)
		- [ ] Reset my watch state
		- [ ] Track in external db (paid feature?)
- [ ] Get the offline page working
