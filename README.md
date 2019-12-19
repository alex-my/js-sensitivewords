## 说明

提供敏感词检测，替换功能。使用`DFA`算法，性能优秀

如果是超大的敏感词库，例如 1W 以上，如果对初始化词库时长敏感，可以使用以下方法查看初始化所消耗的时间

```js
console.time("spend time");
sw.addWord("管理员");
console.timeEnd("spend time");
```

## egg 版本

egg 版本见 https://github.com/alex-my/egg-full-sensitivewords

## 安装

```bash
$ npm i js-sensitivewords --save
```

## 示例

可以通过`sw`来调用

测试示例见 [test/test-dfa.js](./test/test-dfa.js)

所有接口的示例如下:

```js
const sw = require("js-sensitivewords");

// 初始化敏感词库，建议在启动的时候执行
sw.addWords(["天安门", "毛主席", "周总理"]);
sw.addWord("管理员");

// 判断是否包含敏感词，返回值 true: 包含; false: 不包含
sw.containsDfa("我爱北京天安门"); // => true
sw.containsDfa("主席毛泽东同志"); // => false

// 获取含有的敏感词内容，返回值 字符串数组
sw.wordsDfa("我爱毛主席和周总理"); // => ['毛主席', '周总理']

// 替换敏感词，当once=true时，对于每一个出现的敏感词，只替换一次。默认 once = false
sw.replaceDfa("我是管理员", "*", true); // => 我是*
// 替换敏感词, 当once=false时，对于每一个出现的敏感词，按照其长度替换。默认 once = false
sw.replaceDfa("我是管理员", "*", false); // => 我是***
```

## License

[MIT](./LICENSE)
