# Svg #

### #元素 ###

+ __文本__

    ```html
    <text>
        <tspan dx="" dy=""></tspan>
    </text>
    ```
    
+ __矩形__

    ```html
    <rect rx="" ry="" />
    ```
    
+ __圆形__
    
    ```html
    <circle cx="" cy="" r="" /> 
    ```
    
+ __椭圆__

    ```html
    <ellipse cx="" cy="" rx="" ry="" />
    ```
    
+ __直线__
    
    ```html
    <line x1="" y1="" x2="" y2="" />
    ```
    
+ __折线__ (非自动闭合)

    ```html
    <polyline points="" />
    ```
    
+ __多边形__ (自动闭合)

    ```html
    <polygon points="" />
    ```
    
+ _模块_

    ```html
    <symbol id="shapeId">
        <circle />
    </symbol>
    <use xlink:href="#shapeId" />
    ```
    ```html
    <defs>
        <g id="shapeId"></g>
    </defs>
    <use xlink:href="#shapeId" />
    ```
    
+ _路径_

    ```html
    <path d="" />
    ```

    ___d = "M | l | h | v | c | s | q | t | a | Z"___
    + c + q, s + t (使控制点对称以保证平滑过渡即斜率一致)  
    + a <-- 轴半径 旋转角 角度范围 弧线方向 终点 -->

*****

+ __边框属性__

    + stroke
    
    + stroke-width
    
    + stroke-linecap
    
    + stroke-linejoin
    
    + stroke-dasharray
    
    + stroke-dashoffset
    
    + stroke-opacity

+ __填充属性__
    
    + fill
    
    + fill-rule
        
        + nonezero 非零填充规则 
                   
            > 从左向右穿过区域射线 +1，从右向左穿过区域射线 -1。矢量和：为 0 为图形外部；非 0 为图形内部。
            
        + evenodd 奇偶填充规则
                    
            > 区域射线与图形路径交点个数：偶数个为图形外部；奇数个为图形内部。

    + fill-opacity
    
    #### *渐变 ####
    
    + stop-color
    
    + stop-opacity

*****

+ __滤镜__

    ```html
    <defs>
        <filter id="filterId">
            <feGaussianBlur />
        </filter>
    </defs>
    <rect filter="url(#filterId)" />
    ```
    
+ __渐变__
    
    + 放射渐变
    
        ```html
        <defs> 
            <radialGradient id="radialId" cx="" cy="" r="" fx="" fy="">
                <stop />                           
            </radialGradient>                      
        </defs>
        <ellipse fill="url(#radialId)" />
        ```

        备注：渐变焦点与渐变圆相切 / 相离时会出现裁切效果
            
    + 线性渐变
    
        ```html
        <defs>
            <linearGradient id="linearId" x1="" y1="" x2="" y2="">
                <stop offset="" />
            </linearGradient>    
        </defs>
        <ellipse fill="url(#linearId)" />
        ```

    ___spreadMethod = "pad | repeat | reflect"___
    + pad 剩余平铺    
    + repeat 重复平铺   
    + reflect 镜像平铺

+ __贴图__

    ```html
    <defs>
        <pattern id="patternId">
            <path />
        </pattern>
    </defs>
    <rect filter="url(#patternId)" />
    ```

    ___patternUnits = "userSpaceOnUse | objectBoundingBox"___    
    + userSpaceOnUse 图案单位不缩放    
    + objectBoundingBox 图案单位缩放

+ __衔接点__

    ```html
    <defs>
        <marker id="markerId" markerWidth="" markerHeight="" refX="" refY="" orient="">
            <circle />
        </marker>
    </defs>
    ```

    ___markerUnits = "strokeWidth | userSpaceOnUse"___   
    + strokeWidth 适应路径描边   
    + userSpaceOnUse

+ __文字路径__

    ```html
    <defs>
        <path id="pathId" />
    </defs>
    <text>
        <textPath xlink:href="#pathId"></textPath>
    </text>
    ```

+ __裁剪__

    ```html
    <defs>
        <clipPath id="clipPath">
            <rect />
        </clipPath>
    </defs>
    <circle style="clip-path: url(#clipPath);" />
    ```

*****

### #动画 ###

```html
<circle id="ball" />
<animate xlink:href="#ball" attributeName="" from="" to="" dur="" />
```
```html
<circle>
    <animate attributeName="" from="" to="" dur="" />
</circle>
```
```html
<animateTransform attributeName="transform" />
```
```html
<animateMotion path="" />
```
```html
<animateMotion>
    <mpath />
</animateMotion>
```

___fill = "freeze | remove"___

___type = "translate | scale | rotate | skewX | skewY"___

___restart = "always | whenNotActive | never"___

___repeatCount = "count | indefinite"___

___repeatDur = "time | indefinite"___

___accumulate = "none | sum"___

___additive = "replace | sum"___

___calcMode = "discrete | linear | paced |spline"___
+ discrete 离散
+ linear 线性 (不同 keyTimes 间不匀速)
+ paced 踏步 (不同 keyTimes 间匀速)
+ spline 样条

*****

+ __暂停__

    ```javascript
    svg.pauseAnimations();
    ```
    
+ __重启__

    ```javascript
    svg.unpauseAnimations();
    ```