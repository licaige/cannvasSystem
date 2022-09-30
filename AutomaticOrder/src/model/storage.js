var storage = {
    /** 获取本地存储 */
    get: function(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    /** 设置本地存储 */
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    /** 删除本地存储 */
    remove: function(key) {
        localStorage.removeItem(key)
    }

}


export default storage