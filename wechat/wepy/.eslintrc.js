module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    settings: {
        'html/html-extensions': ['.html', '.wpy']
    },
    'rules': {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'indent': [1, 4, {'SwitchCase': 1}]
    }
}
