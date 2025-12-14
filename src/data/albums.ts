export interface Track {
	number: number
	title: string
	duration: string
	spotifyUrl: string
	videoUrl?: string
}

export interface Album {
	slug: string
	title: string
	year: number
	releaseDate?: string
	coverImage: string
	description: string
	tracks: Track[]
	streamingLinks: {
		spotify: string
		appleMusic?: string
		youtubeMusic?: string
		deezer?: string
	}
}

export const albums: Album[] = [
	{
		slug: 'the-last-bead-on-a-cord-of-songs',
		title: 'the last bead on a cord of songs',
		year: 2024,
		releaseDate: '12.1.2024',
		coverImage: '/music/tlboacos-album.webp',
		description: 'Debut album featuring crushing soundscapes, nihilistic themes, and massive melodies.',
		tracks: [
			{ number: 1, title: 'maniya', duration: '4:22', spotifyUrl: 'https://open.spotify.com/track/1dS6zDr54ZVfXXN2u3J4Zk' },
			{ number: 2, title: 'xiii (the death)', duration: '4:00', spotifyUrl: 'https://open.spotify.com/track/6V4GC2bHeKPcRpy9De8JTU', videoUrl: 'https://www.youtube.com/watch?v=rjff_WUvBhk' },
			{ number: 3, title: 'colorblind', duration: '4:14', spotifyUrl: 'https://open.spotify.com/track/2Qf8QmjDmSWtMGJRlOJwPS' },
			{ number: 4, title: 'shut your mouth', duration: '2:54', spotifyUrl: 'https://open.spotify.com/track/5wYqGpxhrDHs7nunqL7LZ5' },
			{ number: 5, title: 'we are expendable', duration: '4:26', spotifyUrl: 'https://open.spotify.com/track/1jeq3OmgcaGckBqNmgGhzF' },
			{ number: 6, title: 'medusa', duration: '5:02', spotifyUrl: 'https://open.spotify.com/track/28Pjxc8qjgdq7mOOff88Su' },
			{ number: 7, title: 'sleeper I (crossroads)', duration: '3:05', spotifyUrl: 'https://open.spotify.com/track/6xmqsTTY6hOD1qz0xvqG4H' },
			{ number: 8, title: 'sleeper II (final breath)', duration: '4:45', spotifyUrl: 'https://open.spotify.com/track/3sD1z2RjiDIntkKLqQXgW9' },
		],
		streamingLinks: {
			spotify: 'https://open.spotify.com/album/4wUaeA2NL4yZq0OOzw8xUy',
			appleMusic: 'https://music.apple.com/tr/album/the-last-bead-on-a-cord-of-songs/1723544456',
			youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_kS6yu_-rFmwegiEajR2Ey7JPOCLe7FEpw',
			deezer: 'https://www.deezer.com/fi/album/529196392',
		}
	},
	// Future albums can be added here
]

export function getAlbumBySlug(slug: string): Album | undefined {
	return albums.find(album => album.slug === slug)
}

export function getAllAlbums(): Album[] {
	return albums
}
