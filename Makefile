run:
	node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 9898 --host 0.0.0.0 --config webpack.config.js --content-base build/ --hot --progress --inline

publish:
	npm run build
	git checkout gh-pages && cp -rf ./build/* . && rm -rf ./build
	git add . && git commit -m 'Latest build.' --allow-empty
	git push origin gh-pages --force
	git checkout master
