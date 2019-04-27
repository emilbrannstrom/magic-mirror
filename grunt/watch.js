module.exports = {
    express: {
      files: [
        'providers/**/*.js',
        'services/**/*.js',
        'routes/**/*.js',
        'index.js',
        'config/**/*.json'
      ],
      tasks:  [
        'express:dev'
      ],
      options: {
        spawn: false
      }
    },
    css: {
        files: [
					'src/**/*.scss'
        ],
        tasks: ['compass:dev']
    },
    js: {
      files: [
            'src/js/**/*.js'
        ],
        tasks: ['browserify:dev']
    }
}
