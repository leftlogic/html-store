# html-store

Document-oriented key-value storage in an HTML file. Built for [jsbin](https://github.com/remy/jsbin).

## Install

```
npm install html-store
```

## Basic usage

To begin, create a new file and initiliase it with some base HTML. html-store does its best to preserve this original HTML.

```javascript
var htmlstore = require('html-store');

var file = Object.create(htmlstore.file);

file.init('<!doctype html>\n<title>Hello!</title>\n<h1>Hello, world!</h1>');
```

Now you can add some data (`.set`) and meta-data (`.meta`).

```javascript
file.set({
  markdown: '# Hello, world!',
  less: 'body { h1 { color: red; } }'
});

file.meta({
  description: 'My nice page.'
});
```

### Render

To get a rendered output, use `.render`:

```javascript
var html = file.render();
```

The output of the above is:

```html
<!doctype html>
<title>Hello!</title>
<meta name="description" content="My nice page.">

<h1>Hello, world!</h1>

<script type="text" data-name="markdown">
# Hello, world!
</script>

<script type="text" data-name="less">
body { h1 { color: red; } }
</script>
```

### Parse

You can get data back from a rendered (or manually modified) HTML file using `htmlstore.parse`:

```javascript
var newFile = htmlstore.parse(html);
```

The file object you'll get is:

```javascript
{ metadata: { description: 'My nice page.' },
  data:
   { markdown: '# Hello, world!',
     less: 'body { h1 { color: red; } }' },
  raw: '<!doctype html>\n><title>Hello!</title>\n<h1>Hello, world!</h1>' }
```

## License

MIT