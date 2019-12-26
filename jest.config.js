module.exports = {
    "transform": {
        "^.+\\.[j]sx?$": "babel-jest"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!antd).+\\.js$"
    ]

};
