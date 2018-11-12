const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.pug', '.scss']
  },
  entry: {
		// work:'./src/js/work.js',
		index:'./src/js/index.js'},
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
  			test: /\.pug$/,
  			include: path.resolve(__dirname, '../src/pug'),
  			use: [{
  				loader: 'html-loader'
  			},
  			{
  				loader: 'pug-html-loader',
  				options: {
  					pretty: true
  				}
  			}]
  		},
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?plugins=transform-runtime&presets=es2015',
        exclude: /node_modules/
      }, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }]
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/'
				}
      }, {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/'
				}
      },
			// {
      //   test: /\.(mp4|mov|wav|webm)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file-loader',
			// 	options: {
			// 		name: '[path][name].[ext]'
			// 	}
      // }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ProgressPlugin(),
    new webpack.LoaderOptionsPlugin({
			minimize: process.env.NODE_ENV === 'production',
		}),
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      // Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
		}),
		new CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify( process.env.NODE_ENV )
			}
		}),
		new HtmlwebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/pug/index.pug'),
			minify: false,
			hash: true,
			chunks: ['vendor','index'],
			chunksSortMode: 'manual'
		}),
    new ExtractTextPlugin('styles.min.css'),
   	new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../assets/images'),
      to: path.resolve(__dirname, '../dist/assets/images')
    }]),
		// new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, '../assets/videos'),
    //   to: path.resolve(__dirname, '../dist/assets/videos')
    // }])
  ]
};
