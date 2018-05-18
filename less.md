# Less #

__特性__
- 变量
- 运算
- 嵌套
- 属性集
- 函数

__解析__
```bash
lessc $source.less > $target.css
```

压缩
+ -x
+ --clean-css __[npm install -g less-plugin-clean-css]__

*****

### #变量 ###

@变量名: 变量值;

*****

### #层级 ###

```
父级 {
    属性名: 属性值;
    ...

    属性集(参数);
    ...

    &选择器 {
        属性名: 属性值;
        ...
    }
    ...

    子级 {
        属性名: 属性值;
        ...
    }
    ...
}
```

```css
.border (@color: red, @radius: 10px) {
    border: 1px solid @color;
    border-radius: @radius * 2;
}
.shadow (@x, @y, @blur, @color) {
    box-shadow: @arguments;
}
.tag (@color: pink) {
    &:before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: @color;
    }
}

.l-hd {
    .border;
    .tag;

    padding: 15px 0;

    span {
        font-size: 14px;
        color: red;
    }
}
.l-ft {
    .border(green, 20px);
    .shadow(2px, 2px, 5px, #000);
    .tag(blue);

    margin: 15px 0;

    span {
        font-size: 24px;
        color: green;
    }

    &:after {
        content: "after 伪类";
        display: block;
        color: #005d50;
    }
}
```

*****

### #匹配 ###

```css
.style (lighter, @color) {
    opacity: 0.2;
}
.style(darker, @color) {
    opacity: 0.8;
}
.style (@_, @color) {
    background-color: @color;
    border: 1px solid @color;
    border-radius: 10px;
    height: 20px;
}

.l-hd {
    .style(lighter, red);
}
.l-ft {
    .style(darker, red);
}
```

*****

### #导引 ###

when (表达式)
+ \> \>= = =< <
+ not and ,(or)

```css
.style (@x, @y) when (@x > @y){
    border: 1px solid red;
}
.style (@x, @y) when (@x < @y) {
    border: 2px solid green;
}

.l-hd {
    .style(1, 0);
}
.l-ft {
    .style(0, 1);
}
```

*****

### #函数 ###

<http://www.lesscss.net/functions/>

*****

### #命名空间 ###

```css
#control {
    .btn (@color: #333) {
        font-size: 14px;
        line-height: 26px;
        text-decoration: none;
        color: #fff;
        background-color: @color;
        padding: 0 15px;
        border-radius: 5px;
        display: inline-block;
    }
    .input (@width: 200px) {
        width: @width;
    }
    .textarea (@width: 300px, @height: 200px) {
        width: @width;
        height: @height;
    }
}

.btn {#control > .btn(green)}
.input {#control > .input(220px)}
.textarea {#control > .textarea(200px, 100px)}
```

*****

### #作用域 ###

```css
@color: red;

.item {
    color: @color; // green

    span {
        @color: blue;
        color: @color; // yellow
        @color: yellow;
    }
    @color: green;
}
```

*****

+ "...@{变量名}..."

+ \`javascript 表达式\`