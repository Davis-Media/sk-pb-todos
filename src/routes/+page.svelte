<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { pb } from '$lib/pocketbase';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { getAuthContext } from '$lib/pocketbase/auth.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { setTodoContext } from '$lib/pocketbase/todo.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	const auth = getAuthContext();

	const todo = setTodoContext();

	const signInWithDiscord = async () => {
		await auth.signInWithDiscord();
	};

	const signInWithGithub = async () => {
		await auth.signInWithGithub();
	};

	let todoName = $state('');
	let isLoading = $state(false);
</script>

{#if auth.user}
	<div class="grid w-full min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
		<div class="flex items-center justify-center bg-muted p-6 lg:p-12">
			<div class="max-w-md space-y-4">
				<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Welcome {auth.user.username}
				</h1>
				<p class="text-muted-foreground">This is a very basic todo app demo of this stack</p>
				<Button onclick={() => auth.logout()}>Sign Out</Button>
			</div>
		</div>
		<div class="flex items-center justify-center bg-background p-4">
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>Todo App</Card.Title>
				</Card.Header>
				<div class="w-full px-4">
					{#each todo.todos as t}
						<div class="w-full flex flex-row justify-between items-center p-3">
							<h4>{t.name}</h4>
							<Switch
								checked={t.isDone}
								disabled={isLoading}
								onclick={async () => {
									isLoading = true;
									await todo.toggleTodo(t.id);
									isLoading = false;
								}}
							/>
						</div>
						<Separator />
					{/each}
				</div>
				<Card.Footer class="w-full flex flex-col items-start gap-3 pt-3">
					<Label for="task">Task Name</Label>
					<div class="w-full flex flex-row justify-between gap-3 items-center">
						<Input placeholder="my task" class="grow" name="task" bind:value={todoName}></Input>
						<Button
							disabled={isLoading || todoName === ''}
							onclick={async () => {
								isLoading = true;
								await todo.createTodo(todoName);
								isLoading = false;
							}}>Create</Button
						>
					</div>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
{:else}
	<div class="grid w-full min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
		<div class="flex items-center justify-center bg-muted p-6 lg:p-12">
			<div class="max-w-md space-y-4">
				<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Welcome to our amazing product
				</h1>
				<p class="text-muted-foreground">
					Discover the power of our innovative solution and transform the way you work.
				</p>
			</div>
		</div>
		<div class="flex items-center justify-center bg-background p-6 lg:p-12">
			<div class="w-full max-w-md space-y-4">
				<h2 class="text-2xl font-bold">Login</h2>
				<div class="space-y-4">
					<Button class="w-full" onclick={signInWithDiscord}>Sign in with Discord</Button>
					<Button class="w-full" onclick={signInWithGithub}>Sign in with Github</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
