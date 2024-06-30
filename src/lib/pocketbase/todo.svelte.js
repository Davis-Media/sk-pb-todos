import { pb } from '.';
import { getContext, setContext } from 'svelte';

class TodoStore {
	todos = $state([]);

	constructor() {
		// runs on mount to fetch the todos
		$effect(async () => {
			this.todos = await pb.collection('todos').getFullList();
		});
	}

	async createTodo(name) {
		await pb.collection('todos').create({ name, isDone: false });
		this.todos = await pb.collection('todos').getFullList();
	}

	async toggleTodo(id) {
		const curTodo = await pb.collection('todos').getOne(id);
		console.log(curTodo);
		await pb.collection('todos').update(id, { isDone: !curTodo.isDone });
		this.todos = await pb.collection('todos').getFullList();
	}

	async deleteTodo(id) {
		await pb.collection('todos').delete(id);
		this.todos = await pb.collection('todos').getFullList();
	}
}

// this is important if u are gonna have any SSR
// https://www.youtube.com/watch?v=EyDV5XLfagg
// https://kit.svelte.dev/docs/state-management

const TODO_STORE_KEY = 'todo store';

export const setTodoContext = () => {
	const nTodoStore = new TodoStore();
	return setContext(TODO_STORE_KEY, nTodoStore);
};

export const getTodoContext = () => {
	return getContext(TODO_STORE_KEY);
};
