# Motivation

This module was created to be used as NPM dependency to provide a pool of UI components that might possibily be reusable and resolve boilerplate.
Currently it only has React.js components

# How to use:

+ Add the NPM dependecy to the app: `npm i -D github:yoga1290/yoga1290-ui-pool#v24.10.9`
+ Make sure, Webpack loader compiles it:
```javascript
module.exports = {
    module: {
        rules: [{
        //...
            test: /\.(ts|js)x?$/,
            loader: 'babel-loader',
            exclude: /node_modules\/(?!yoga1290-ui-pool)/,
        //...
        }]
    }
}
```
+ Use the needed compoenent:
```typescript
import Card, {CardProps} from 'yoga1290-ui-pool/react/card'
expose default ({title, text, opMaterialIcon}: CardProps) => (<>
    <Card
        title={title}
        text={text}
        icon={opMaterialIcon}
        click={MyMouseEventHandler(mouseEvent)} />
</>);
```
+ [View demo on github page](https://yoga1290.github.io/yoga1290-ui-pool/)

# Dependencies

The following dependencies are expected (probably through CDN):
+ Bootstrap 5.02
+ Animate.css 4.1.1
+ Google Material Design Icons

```html
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,500,0,0" />
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous">
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    integrity="Gu3KVV2H9d+yA4QDpVB7VcOyhJlAVrcXd0thEjr4KznfaFPLe0xQJyonVxONa4ZC"
    crossorigin="anonymous">
``` 