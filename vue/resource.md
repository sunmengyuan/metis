## [vue-resource](https://github.com/vuejs/vue-resource) ##

```javascript
this.$http.get(url, options)
    .then((response) => {
        // 请求成功回调
    }, (response) => {
        // 请求失败回调
    })
```
```javascript
this.$http.post(url, body, options)
    .then((response) => {
        // 请求成功回调
    }, (response) => {
        // 请求失败回调
    })
```

*****

### #拦截器 ###

```javascript
Vue.http.interceptors.push((request, next) => {
		// 请求发送前回调
	next((response) => {
		// 请求发送后回调
		return response
	})
})
```