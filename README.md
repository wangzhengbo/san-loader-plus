# san-loader-plus

[![Build Status](https://circleci.com/gh/ecomfe/san-loader/tree/master.svg?style=shield)](https://circleci.com/gh/ecomfe/san-loader/tree/master) [![npm package](https://img.shields.io/npm/v/san-loader.svg?maxAge=2592000)](https://www.npmjs.com/package/san-loader) [![Dependencies](http://img.shields.io/david/ecomfe/san-loader.svg)](https://david-dm.org/ecomfe/san-loader)

> [San](https://github.com/baidu/san) component loader for [Webpack](http://webpack.github.io) with mixin, global component and global filter supports.


It allows you to write your components in this format:

globalComponent.san
```
<template>
    <div class="global-component">Hello global component</div>
</template>
<script>
    export default {
    }
</script>
```

anotherGlobalComponent.san
```
<template>
    <div class="another-global-component">Hello another global component</div>
</template>
<script>
    export default {
    }
</script>
```

globalFilter.js
```
export const toUpperCase = function(value) {
  return value.toUpperCase()
}

export const toLowerCase = function(value) {
  return value.toLowerCase()
}
```

globalMixin.js
```js
    export default {
        attached() {
            console.log('global mixin attached')
        }
    }
```

anotherGlobalMixin.js
```js
    export default {
        attached() {
            console.log('another global mixin attached')
        }
    }
```

mixin.js
```js
    import globalComponent from './globalComponent.san'

    export default {
        // register component with mixin
        components: {
          'global-component': globalComponent
        },
        attached() {
            console.log('mixin attached')
        }
    }
```

main.js
```js
    import { mixin, component, filter } from 'san-loader-plus/lib/helper'
    import anotherGlobalComponent from './anotherGlobalComponent.san'
    import globalMixin from './globalMixin'
    import anotherGlobalMixin from './anotherGlobalMixin'
    import { toUpperCase, toLowerCase } from './globalFilter'

    // register global component
    component('another-global-component', anotherGlobalComponent)
    filter('upper', toUpperCase)
    filter('lower', toLowerCase)

    // register global mixin
    mixin(globalMixin)
    mixin(anotherGlobalMixin)
```

page.san
```
<template>
    <div class="hello">
      hello {{ msg | upper }},
      hello {{ msg | lower }}
      <global-component />
      <another-global-component />
    </div>
</template>
<script>
    import mixin from './mixin'

    export default {
        mixins: [mixin],
        data: {
            msg: 'World'
        }
    }
</script>
<style>
    .hello {
        color: blue;
    }
</style>
```

## Usage

```
{
    module: {
        loaders: [
            {
                test: /\.san$/,
                loader: 'san-loader-plus'
            }
        ]
    }
}

```

## Thanks

* [san-mixin](https://github.com/Dafrok/san-mixin)
* [san-loader](https://github.com/ecomfe/san-loader)
* [vue-loader](https://github.com/vuejs/vue-loader)

## License

[MIT](http://opensource.org/licenses/MIT)
