# charles-alternative

A little nodejs tool to replace files on the fly in a remote html page.

## how it works

You define a list of URLs to map to local files like this:
```javascript
  const substitutions = [
    {from: 'script.js', to: './my-version.js'},
    {from: 'http://.*\.website.com/.*\.css', to: './my-custom.css'},
  ];
```

When you load a web page if a URL matches one of your rules, it will be served the file you specified. For example `http://www.abcd.com/foo/bar/script.js` will load normally but with the content of your file `./my-custom.css`.

## install and use

Install dependencies and run the app:

```sh
$ npm i
$ npm run start
```

Display the logs:

```sh
$ node_modules/.bin/pm2 logs

```

Use this [chrome extension](http://www.samabox.com/projects/chrome/switchy) to proxy all your requests to `localhost:5050`.

[Then change the code here to replace files on the fly](https://github.com/lexoyo/charles-alternative/blob/master/index.js#L17)
