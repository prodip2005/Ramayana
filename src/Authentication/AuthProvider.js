import { ref, readonly } from 'vue'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import app from '@/firebase/firebase.config'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export function useAuthProvider() {
    const user = ref(null)
    const loading = ref(true)

    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        loading.value = false
    })

    const loginWithGoogle = () => signInWithPopup(auth, googleProvider)
    const logout = () => signOut(auth)

    return {
        user: readonly(user),
        loading: readonly(loading),
        loginWithGoogle,
        logout
    }
}