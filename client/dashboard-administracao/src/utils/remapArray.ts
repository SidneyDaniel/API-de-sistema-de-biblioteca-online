import type { InputUser, OutputUser } from "@/types/booksTypes";

function isActive(date: Date) {
    const today = new Date()
    const twoMontAgo = new Date()
    const lastSignIn = new Date(date)
    twoMontAgo.setMonth(today.getMonth() - 2)

    return lastSignIn >= twoMontAgo
}

function remapArray(arrayValues: InputUser[]): OutputUser[] {
    const mappedArray: OutputUser[] = arrayValues.map(user => ({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        status: isActive(user.lastSignInTime)
    }))

    return mappedArray
}

export default remapArray