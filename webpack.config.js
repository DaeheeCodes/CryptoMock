var path = require('path');

module.exports = {
    entry: [ './src/main/js/singleDayTable.js', './src/main/js/userData.js', './src/main/js/navBar.js', './src/main/js/home.js' ],
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ]
    }
};