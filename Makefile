run:
    node ./node_modules/webpack-dev-server/bin/webpack-dev-server --port 9898 --host 0.0.0.0 --config webpack.config.js --content-base build/ --hot --progress --inline

publish:
    npm run build
    git add . && git commit -m 'Latest build.'
    git subtree push --prefix build origin gh-pages
    rm build/bundle.js