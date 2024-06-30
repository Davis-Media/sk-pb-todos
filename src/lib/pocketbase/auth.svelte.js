import { pb } from '$lib/pocketbase';
import { getContext, setContext } from 'svelte';

class AuthStore {
	user = $state(null);
	isSynced = $state(false);

	constructor() {
		// runs on mount
		$effect(() => {
			if (pb.authStore.isValid) {
				this.user = pb.authStore.model;
			}
			this.isSynced = true;
		});
	}

	async signInWithDiscord() {
		this.user = (await pb.collection('users').authWithOAuth2({ provider: 'discord' })).record;
	}

	async signInWithGithub() {
		this.user = (await pb.collection('users').authWithOAuth2({ provider: 'github' })).record;
	}

	logout() {
		pb.authStore.clear();
		this.user = null;
	}
}

// this is important if u are gonna have any SSR
// https://www.youtube.com/watch?v=EyDV5XLfagg
// https://kit.svelte.dev/docs/state-management

const AUTH_STORE_KEY = 'auth store';

export const setAuthContext = () => {
	const nAuthStore = new AuthStore();
	return setContext(AUTH_STORE_KEY, nAuthStore);
};

export const getAuthContext = () => {
	return getContext(AUTH_STORE_KEY);
};
