## [vuex](https://github.com/vuejs/vuex) ##

```
├── App.vue
│
├── main.js
│
├── components
│   │
│   └── Component.vue
│
└── vuex
    │
    ├── store.js
    │
    ├── actions.js
    │
    ├── mutation-types.js
    │
    └── modules
        │
        └── module.js
```

*****

Component.vue
```html
<template>
    <ul>
        <li v-for="item in items">{{ item.title }}</li>
    </ul>
    <button @click="checkout(item)"></button>
</template>
<script>
    import {checkout} from '../vuex/actions'
    
    export default {
        vuex: {
            getters: {
                items: ({module}) => module.items
            },
            actions: {
                checkout
            }
        }
    }
</script>
```

store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import module from './modules/module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        module
    }
})
```

actions.js
```javascript
import * as types from './mutation-types'

export const checkout = ({dispatch, state}, item) => {
    var items = state.module.items
    items[item.id] || dispatch(types.ADDITEM, item)
}
```

mutation-types.js
```javascript
export const ADDITEM = 'ADDITEM'
```

module.js
```javascript
import {ADDITEM} from '../mutation-types'

const state = {
    items: {}
}
const mutations = {
    [ADDITEM] (state, item) {
        state.items[item.id] = item
    }
}

export default {
    state,
    mutations
}
```