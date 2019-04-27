module.exports = {
	options: {
    bundleExec: true
	},
	dev: {
		options: {
			sassDir: 'src/sass',
			cssDir: 'public/stylesheets',
			outputStyle: 'expanded'
		}
	},
	prod: {
		options: {
			sassDir: 'src/sass',
			cssDir: 'public/css',
			outputStyle: 'compressed'
		}
	}
}
