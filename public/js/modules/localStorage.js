
class LocalStorage {
    constructor() {
        if (!window.localStorage) {
            /*TODO polyfill for local storage in operative memory. YAGNI.*/
            throw new Error("Local storage is not supported");
        }
        this.storage = window.localStorage;
    }

    setItem(key, item) {
        const itemString = JSON.stringify(item);
        this.storage.setItem(key, itemString);
        return this;
    }

    getItem(key) {
        const stringed = this.storage.getItem(key);
        try {
            return JSON.parse(stringed);
        } catch {
            return null;
        }
    }

    removeItem(key) {
        this.storage.setItem(key, null);
        return this;
    }

    clear() {
        this.storage.clear();
        return this;
    }
}

const localStorageSingleton = new LocalStorage();

export {localStorageSingleton as localStorage};