# Canvas #

### #路径 ###

```javascript
context.beginPath();
```
```javascript
context.closePath();
```

注意：若未开启新路径，原路径与新路径首尾相接

+ __圆弧__

    ```javascript
    context.arc(x, y, r, sAngle, eAngle, clockwise);
    ```
    
+ __矩形__

    ```javascript
    context.rect(x, y, w, h);
    ```
    
+ __线段__

    ```javascript
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    ```
    
+ __贝塞尔曲线__

    ```javascript
    context.quadraticCurveTo(cX, cY, endX, endY);
    ```
    ```javascript
    context.bezierCurveTo(cX1, cY1, cX2, cY2, endX, endY);
    ```

*****

### #填充 ###

+ __渐变填充__

    ```javascript
    context.createLinearGradient(startX, startY, endX, endY);
    ```
    ```javascript
    context.createRadialGradient(startX, startY, startR, endX, endY, endR);
    ```

#### *非零环绕规则 ####

> 区域校验线段所通过的所有路径的方向矢量和：为 0 不填充；非 0 填充。

```javascript
context.beginPath();
context.arc(100, 100, 70, 0, 2 * Math.PI, false);
context.arc(100, 100, 50, 0, 2 * Math.PI, true);
context.fill();
```

*****

+ __画布裁切__

    ```javascript
    // 存储画布未被裁切时状态
    context.save();
    
    // 按裁切路径将画布进行裁切
    context.rect(95, 95, 105, 105);
    context.clip();
    
    // 绘制被裁切对象 (被裁切)
    context.beginPath();
    context.arc(200, 200, 100, 0, 2 * Math.PI);
    context.stroke();
    
    // 恢复画布未被裁切时状态
    context.restore();
    
    // 绘制新对象 (不被裁切)
    context.beginPath();
    context.arc(250, 250, 100, 0, 2 * Math.PI);
    context.stroke();
    ```
    
+ __坐标变换__

    ```javascript
    context.rotate(angle);
    ```
    ```javascript
    context.translate(x, y);
    ```
    ```javascript
    context.scale(num, num);
    ```

    _混合变换_
    ```javascript
    context.transform(a, b, c, d, e, f);
    ```
    ```javascript
    context.setTransform(a, b, c, d, e, f);
    ```
    
+ __图像数据__

    ```javascript
    context.getImageData(x, y, w, h);
    ```
    ```javascript  
    context.putImageData(data, x, y, dirtyX, dirtyY, dirtyW, dirtyH);
    ```
    ```javascript
    context.createImageData(w, h);
    ```
    ```javascript
    context.drawImage(imageObj, sX, sY, sW, sH, dX, dY, dW, dH);
    ```

*****

+ __矩形__

    ```javascript
    context.strokeRect(x, y, w, h);
    ```
    ```javascript
    context.fillRect(x, y, w, h);
    ```
    ```javascript
    context.clearRect(x, y, w, h);
    ```
    
+ __文本__

    ```javascript
    context.strokeText(text, x, y, maxWidth);
    ```
    ```javascript
    context.fillText(text, x, y, maxWidth);
    ```
    ```javascript
    context.measureText(text);
    ```

*****

+ __全局属性__

    + globalAlpha
    
    + globalCompositeOperation
    
+ __阴影属性__

    + shadowColor

    + shadowOffsetX

    + shadowOffsetY

    + shadowBlur

+ __线段属性__

    + lineWidth

    + lineJoin

    + lineCap

    + miterLimit

+ __文本属性__

    + font

    + textAlign

    + textBaseline