export default class BrowserPersistence {
    /* istanbul ignore next: test injects localstorage mock */
    constructor() {
        this.storage = typeof window != 'undefined' ? window.localStorage : false;
    }
    getItem(name) {
        const now = Date.now();
        const item = this.storage.getItem(name);
        if (!item) {
            return undefined;
        }
        const { value, ttl, timeStored } = JSON.parse(item);
        if (ttl && now - timeStored > ttl * 1000) {
            this.storage.removeItem(name);
            return undefined;
        }
        return JSON.parse(value);
    }
    setItem(name, value, ttl) {
        const timeStored = Date.now();
        this.storage.setItem(
            name,
            JSON.stringify({
                value: JSON.stringify(value),
                timeStored,
                ttl
            })
        );
    }
    removeItem(name) {
        this.storage.removeItem(name);
    }
}
