export function loadState<T>(key: string): T | null {
    try {
        const jsonState = localStorage.getItem(key);

        if (!jsonState) {
            return null;
        }

        return JSON.parse(jsonState);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function saveState<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);
}
