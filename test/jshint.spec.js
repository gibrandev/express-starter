require('mocha-jshint')({
    title: 'Code quality check',
    paths: [
        'config/',
        'controllers/',
        'libs/',
        'migrations/',
        'models/',
        'routers/'
    ]
});