run:
		node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 9898 --host 0.0.0.0 --config webpack.config.js --content-base build/ --hot --progress --inline

publish:
		git subtree push --prefix build origin gh-pages