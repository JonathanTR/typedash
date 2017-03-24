Typedash is a minimalist typewriter that forces you to write without overthinking. It gives you three options: a target word count, session length, and fade timer. If you reach your target word count or type until the end of your session, you'll see an option to download your work as a text file. If you slow down for longer than fade timer, you'll lose your work!

### Installation
To run locally it locally,
1. Clone the repo: `git clone git@github.com:JonathanTR/typedash.git && cd typedash`
2. Install dependencies: `npm install`
3. Use the Makefile to run: `make run`
4. The app will be available at `localhost:9898`

### Deployment
Typedash is built and hosted on Github pages. To build and deploy to `gh-pages`, use the convenience script `make publish`.
