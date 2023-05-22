import './css/public.css'
import './css/index.css'

import 'jquery'
import './js/public'
import './js/nav'

// 1. 通过解构获取方法，可以触发 treeshaking 
// 2. 调用的 npm 包必须满足 ES module 
/* export function a() { } // 这种才行
export default { // 这种不行
  a() { },
  b() { }
} */
// import { get } from 'lodash'

/* import { get } from 'lodash-es'
console.log(get({ a: 1 }, 'a')) */

// 3. 同一文件下 treeshaking 触发条件是 mode=production

import { get } from 'lodash-es'
console.log(get({ a: 1 }, 'a'))