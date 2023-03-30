Webpack is a module bundler, lets you write any module format(mixed), compiles them for the browser.
It supports static async bundling, The most performant way to ship JavaScript today.

Since version 4.0.0, webpack does not require a configuration file to bundle your project. However we can configure it to better fulfil our needs.


## Running webpack


## scripts for webpack
```
"scripts": {
    "webpack": "webpack"
  },
```

## modes in webpack
node supports composition for scripts.
```
"scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production"
  },
```

Webpack generates the bundle in different ways based on the mode type. 
In development mode, the bundle will be more verbose with comments. 
In production mode, Webpack does everything to use the bundle for production. It includes minification of the bundle file and other optimizations.
Default value of mode is production. Webpack does not insert anything extra in production mode, just the code that is required.
By specifying none for mode, we are opting out of any optimizations.

By default the /dist is the place where output file gets generated we can change this also.


## Debugging

```
"scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production",

// to debug wepack we can use below command
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",

    "prod:debug": "npm run debug -- --mode production",
    "dev:debug": "npm run debug -- --mode development",

// to debug a particular file
    "debugthis": "node --inspect --inspect-brk ./src/index.js" 

  },
```


## Watching mode in webpack


```
"scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development --watch",
  },
```


## Treeshaking

dead code elimination is tree shaking, webpack is using statically the syntax to identify what we are using. If we are using only one function of a library then we should only bundle one function.



## Webpack core concepts


## 1. Entry
Tells webpack what files to load for browser, compliments the output property.
An entry point indicates which module webpack should use to begin building out its internal dependency graph.
```
webpack.config.js
-----------------

module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

## 2. Output
The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to ./dist/main.js for the main output file and to the ./dist folder for any other generated file.
Tells webpack where and how to distribute bundles(compilations). Works with Entry
```
webpack.config.js
-----------------

module.exports = {
  entry: './src/index.js',
    output: {
        path: './dist',
        filename: './bundle.js'
    }
};
```

## 3. Loaders
Tells webpack how to modify files before its added to dependency graph. Loaders are also javascript modules (functions) that takes the source file, and returns it in a [modified] state.

At a high level, loaders have two properties in your webpack configuration:
1. The test property identifies which file or files should be transformed.
2. The use property indicates which loader should be used to do the transforming.
```
webpack.config.js
-----------------

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: './bundle.js'
    },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }, {test:/\.js$/, use: 'babel-loader'}, {test: /\.css$/, use: 'css-loader'}],
      },
};
```
The configuration above has defined a rules property for a single module with two required properties: test and use. This tells webpack's compiler the following:
"Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a require()/import statement, use the raw-loader to transform it before you add it to the bundle."

other properties available are 
```
module: {
    rules: [
        test: regex,
        use: (Array|String|Function),
        include: RegExp[],
        exclude: RegExp[],
        issuer: (RegExp|String)[],
        enforce: "pre"|"post"
    ]
}
```

test :  A regex that instructs the compiler which files to un the loader agfainst
use : An array/string/function that returns loader object
enforce : Can be 'pre' or 'post' , tells webpack to run this rule before or after all other rules
include : An array of regex that instruct teh compiler which forlders/files to indluce. will only search paths provided with the include
exclude : An array of regex that instructs the compiler which folder/files to ignore.



## Chaining loaders


Loaders always execute from right to left
ex:
style(css(less()))

```
rules: [
    {
        test: /\.less$/,
        use: ['style', 'css', 'less']
    }
]
```

## 4. Plugins
These are the Objects (with an 'apply' property).
Allows you to hook into the entire compilation lifecycle. Webpack has a variety of build in plugins.
A plugin us an ES5 'class' which implements apply function. The compiler uses it to emit events.

Adds additional functionality to compilations(optimized bundle modules). More powerful w/more access to CompilerAPI. Does everything else you'd ever want to in webpack.

## how to use plugin - 
1. require() plugin from node_modules into config.
2. add new instance of plugin to plugin key in config object.
3. provide additional infor for arguments.
```
var BellOnBundleErrorPlugin - require('bell-on-error')
var webpack = require('webpack')

module.exports = {
    
    plugins: [
        new BellOnBundleErrorPlugin(),
        
        // few builtin plugins
        new webpack.optimize.CommonChunkPlugin('vendors'),
        new webpack.optimize.UglifyJsPlugin()
    ]
    // ...
}
```

80% of webpack is made up of its own plugin system.


## Passing variable to webpack config

```
package.json
-----------

 "scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --env.mode development --watch",
    "prod": "npm run webpack -- --env.mode production",
}

webpack.config.js
-----------------

module.exports = env => {
    return {
        mode: env.mode,
        output: {
            filename: 'bundle.js'
        }
    }
}
```


## Adding webpack plugins

1. html-webpack-plugin
This is webpack plugin that simplifies the creation of html files to server your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.



## Splitting Environment Config files

### webpack-merge
While we will separate the production and development specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called webpack-merge. With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.



## Using CSS with Webpack


### 1. css-loader
The css-loader interprets @import and url() like import/require() and will resolve them.



### 2. style-loader
Inject CSS into the DOM.

```
module:{
        rules: [
            {test: /.css$/, use: ["style-loader","css-loader"]}
        ]
    }
```

the Css we have now is just adding a module and its blocking the main thread bec we are relying on javascript to attach the style tag.

So instead we can do is extract it out have it in a separate tag.
for this instead of using style-loader we use 

### mini-css-extract-plugin
This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
It's recommended to combine mini-css-extract-plugin with the css-loader
```
plugins: [new MiniCssExtractPlugin()],
    module:{
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
          ],
    }
```



## File Loader & URL loader

For files like image, font, videos are source and doesn't really map to browser api,  we either want to base64 inline these or emit these to our output directory and that's what url loader does for us.

### url-loader
A loader for webpack which transforms files into base64 URIs.
```
 module: {
            rules: [
                {
                    test: /\.jpe?g$/,
                    use: ["url-loader"]
                }
            ]
        },
```
we can pass some options also to url-loader to modify its configuration
```
module: {
            rules: [
                {
                    test: /\.jpe?g$/,
                    use: [
                        {
                            loader:"url-loader",
                            options:{
                                limit: 5000
                    }}]
                }
            ]
        },
```
this tell webpack that only if image is 5000 bytes or less will be ok with inlining it as a base 64 url otherwise take this file and emit it to our dist directory and instead return the hashed url of where the file will be.



## Devtools / sourcemaps

This option controls if and how source maps are generated.
```
module.exports = ()=>({
    devtool: "source-map"
})
```

