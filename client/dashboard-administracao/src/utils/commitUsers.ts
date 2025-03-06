import { useUserStore } from '@/stores/usersStore';

const usersStore = useUserStore()

export async function commitUsers() {
    await usersStore.$reset()
    await usersStore.fetchUsersData()
    const newCommitedUsers = await usersStore.listOfUsers
    await usersStore.$patch({ listOfUsers: newCommitedUsers })
}
