import {defineStore } from "pinia";

type UserInfo = {
    displayName: string | null
    email: string | null
}

export const useCurrentUserStore = defineStore('currentUserStore', {
    state: () => ({
      currentUser: {displayName: '', email: ''} as UserInfo,
    }),
    actions: {
        setUserData(displayName: string, email: string) {
            this.currentUser.displayName = displayName
            this.currentUser.email = email
        }
    }
  })