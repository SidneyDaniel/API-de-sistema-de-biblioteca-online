import { useBooksStore } from '@/stores/books';
const bookStore = useBooksStore();

export async function coommitBooks() {
    await bookStore.$reset()
    await bookStore.fetchBooks()
    const newCommitedBooks = await bookStore.books
    await bookStore.$patch({ books: newCommitedBooks })
}
