class LRUCache {
    constructor(size) {
        this.size = size || 3
        this.cache = new Map()
    }

    put(key, val) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            this.cache.delete(key)
        }
        this.cache.set(key, val)
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
        return true
    }

    get(key) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            const val = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, val)
            return val
        }
        return -1
    }

    items() {
        return this.cache.entries()
    }
}

const cache = new LRUCache(3)

cache.put(1,1)
cache.put(2,2)
cache.put(3,3)
console.log(cache.items())
cache.get(1)
console.log(cache.items())
cache.get(3)
console.log(cache.items())
cache.put(4,4)
console.log(cache.items())