import { getAuth, onAuthStateChanged } from "firebase/auth";

export const requireAuth = (to, from, next) => {
    const auth = getAuth();

    const checkAuthState = () => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    checkAuthState().then((user) => {
        if (user) {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.fullPath } });
        }
    });
};