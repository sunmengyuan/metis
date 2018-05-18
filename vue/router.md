## [vue-router](https://github.com/vuejs/vue-router) ##

```javascript
router.map({
    '/post': {
        component: Post,
        subRoutes: {
            '/': {
                component: PlaceHolder
            },
            '/topic': {
                component: Topic
            },
            '/diary': {
                component: Diary
            }
        }
    }
})
```

#### *具名路径 ####

```javascript
router.map({
    '/profile/:user_id': {
        name: 'profile',
        component: Profile
    }
})
```
```javascript
router.go({name: 'profile', params: {user_id: 1}})
```
```html
<a v-link="{name: 'profile', params: {user_id: 1}}"></a>
```

*****

+ __$route.query__

    | 模式 | 路径 | 解析结果 |
    | ------------------------------ | --------------------------------- | -------------------------- |
    | /user/diary?user_id=&diary_id= | /user/diary?user_id=1&diary_id=10 | {user_id: 1, diary_id: 10} |

+ __$route.params__

    | 模式 | 路径 | 解析结果 |
    | ------------------------------ | ------------------- | -------------------------- |
    | /user/:user_id/diary/:diary_id | /user/1/diary/10    | {user_id: 1, diary_id: 10} |
    | /diary/*key/publish            | /diary/1/10/publish | {key: 1/10}                |

*****

+ __router.go()__

+ __router.redirect()__ (重定向)

+ __router.replace()__ (无历史记录)

+ __router.alias()__ (全局别名规则)

*****

### #钩子函数 ###

+ __全局钩子函数__

    + router.beforeEach()

    + router.afterEach()

+ __组件钩子函数__

    ```
                        ┌──── canActivate ─────> activate ─────> data
                        │      ┌──────>          ┌──────>
    ├──── canReuse ────>│      │                 │
                        │      └───────          └───────
                        └──── canDeactivate ───> deactivate
    ```

#### *切换对象 ####

+ transition.to

+ transition.from

+ transition.next()

+ transition.abort()

+ transition.redirect()