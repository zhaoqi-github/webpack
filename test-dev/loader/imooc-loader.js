// \s: 空字符，\S: 非空字符
const Reg = /<script>([\s\S]+?)<\/script>/;
module.exports = function (source) {
  console.log('imooc-loader running', source);
  const _source = source.match(Reg);
  console.log('imooc-loader running', _source);
  return _source && _source[1] ? _source[1] : source
}

// 判断当前模块是否为主模块，如果是主模块，则运行一下代码
// 用来对  loader 进行测试
if (require.main === module) {
  const source = `<script>
    export default {
      a: 1,
      b: 2
    }
  </script>`
  const match = source.match(Reg);
  console.log(match);
}