# shpesfba

Three main Entry points currently:
- index.html
- about.html
- calendar.html

TODO: refactor so that header and footer isn't duplicated in all three pages

### Installation

```
npm install
```

### Run development

```
npm start
```

### Build Static site for production

```
npm build
```

### Netlify Deploy Build settings

* Add your repository normally
* Build command: webpack --config webpack-prod.config.js --colors --optimize-minimize
* Publish directory: dist

### Features:

* Static-site
* SEO friendly
* Webpack 4
* Bootstrap 4
* FontAwesome 5
* BrowserSync with localtunnel, xip.io, ...
* Hot Module Replacement
* ES6 Support via [babel-loader](https://github.com/babel/babel-loader)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
