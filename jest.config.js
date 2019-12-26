module.exports = {
    "transform": {
        "^.+\\.[j]sx?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!antd).+\\.js$"
    ]

};
