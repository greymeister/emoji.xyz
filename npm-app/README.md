# emoji.xyz

The silly url shortening service. No one asked for it, no one wants it.
Started from [node-js-sample](https://github.com/heroku/node-js-sample)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone git@github.com:greymeister/emoji.xyz.git # or clone your own fork
cd emoji.xyz
npm install
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Documentation

For more information about using Node.js, see these Dev Center articles:

- [10 Habits of a Happy Node Hacker](https://blog.heroku.com/archives/2014/3/11/node-habits)
- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Build steps

- Run the following command to create minimized CSS:

        purifycss public/css/bootstrap.min.css public/css/bootstrap-theme.min.css public/css/main.css public/index.html --min --info --out public/css/app.css

- Then build the archive using the following commands:

        mkdir -p build
        tar -zcf ./build/emoji-web.tar.gz --exclude=./.git --exclude=./build ./