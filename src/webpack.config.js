/*
  Modules
/*---------------------------------------*/
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const globule = require("globule")
const { ProvidePlugin } = require("webpack")

/*
  Setup
/*---------------------------------------*/
const devMode = process.env.NODE_ENV !== "production";
const options = {
  srcDir: path.resolve(__dirname),
  destDir: path.resolve(__dirname, '../html'),
  fileExtension: `${process.env.FILE_EXTENSION}`
};

/*
  Loaders
/*---------------------------------------*/
//- Pug
const pugLoaderRule = [
  {
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ["pug-plain-loader"],
      },
      {
        use: ["raw-loader", "pug-plain-loader"],
      },
    ],
  },
];

//- Sass
const sassLoaderRule = [
  {
    test: /\.css/,
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          url: false,
        },
      },
    ],
  },
  {
    test: /\.sass$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          esModule: false,
          importLoaders: 2,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              require("css-mqpacker"),
              require("autoprefixer"),
              require("postcss-nested"),
            ],
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"),
          additionalData: `
            @import "${options.srcDir}/sass/additionals/_setting.sass"
            @import "${options.srcDir}/sass/additionals/_breakpoints.sass"
          `,
          sassOptions: {
            indentedSyntax: true,
          },
        },
      },
    ],
  },
];

//- JS, TS
const jsLoaderRule = [
  {
    test: /\.ts$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: ["\\.vue$"],
          // transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    ],
  },
  {
    test: /\.vue$/,
    use: ["vue-loader"],
  },
];

/*
  Webpack Config 
/*---------------------------------------*/
const config = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    bundle: `${options.srcDir}/entry.js`,
  },
  output: {
    filename: devMode
      ? `modules/js/dev.[name].js`
      : `modules/js/[contenthash].js`,
    path: `${options.destDir}`,
  },
  cache: {
    type: `filesystem`,
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [...jsLoaderRule, ...pugLoaderRule, ...sassLoaderRule],
  },
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm-bundler",
      "@": options.srcDir,
    },
  },
  watchOptions: {
    ignored: /node_modules/,
    stdin: true
  },
  externals: {
    UIkit: 'UIkit'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode
        ? `modules/css/dev.[name].css`
        : `modules/css/[contenthash].css`,
      chunkFilename: devMode
        ? `dev.[name].chunk.css`
        : `[id].css`,
    }),
    new VueLoaderPlugin(),
    new ProvidePlugin({
      UIkit: 'UIkit',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        modules: {
          name: devMode ? `chunk` : ``,
          chunks: "initial",
        },
        styles: {
          test: /\.sass$/,
          chunks: "initial",
        },
      },
    },
  },
  target: ["web", "es5"],
};

/*
  Pug files 
/*---------------------------------------*/
const pugs = globule.find([`./pug/**/*.pug`, `!./pug/_*/*.pug`]);
const unInjectDirectoryRegExp = new RegExp(
  /^\.\/pug\/(partials\/.*|footer\.pug|header\.pug|offcanvas\.pug)$/
);
pugs.forEach((filename) => {
  const isUnInjectDirectory = unInjectDirectoryRegExp.test(filename)
  const pugPathRegExp = isUnInjectDirectory 
    ? /^\.\/pug\/([\w\/]+).pug$/
    : /^\.\/pug\/([\w-_]+).pug$/
  let _filename = filename.replace(pugPathRegExp, `$1.${options.fileExtension}`)
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${_filename}`,
      inject: isUnInjectDirectory ? false : "head", //- partialsディレクトリの場合はinjectをfalseに
      template: `${filename}`,
      publicPath: "./",
      scriptLoading: "defer",
    })
  );
});

/*
  Export 
/*---------------------------------------*/
module.exports = config;
