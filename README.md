# surl-cli
No more distraction from leaving to an URL shortening page just to create a short URL. ```surl``` is a CLI tool for shortening URL and retrieving URL's usage statistics from many API providers, including but not limited to <b>Bitly</b>, <b>Firebase</b>, and <b>Owly</b>;

## Install
```
npm install surl-cli -g
```

## Usage
### Init
Before you start using ```surl```, initialize ```surl```'s configuration of API providers. You must save at least one API key/token/token to ```surl``` from one of the four API providers below. While you can choose to store API key/tokens/tokens from all four service providers, ```surl``` only allows you to use service from a single default provider at a time.
- Follow the [guide](./bitly.md) to go to <b>Bitly</b>'s API page to receive your API key/token.
- Follow the [guide](./firebase.md) to go to <b>Firebase (FDB)</b>'s API page to receive your API key/token/token here.
- Follow the [guide](./owly.md) to go to <b>Owly</b>'s API page to receive your API key/token here.
- To comply with [Google's policy](https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html) on sunsetting <b>goo.gl</b> service on <b>May 2019</b>, we recommend users not to use URL shortening service from goo.gl. However, existing users of goo.gl can still receive their API keys/tokens [here](https://console.developers.google.com/apis/credentials?project=constant-jigsaw-188105&folder&organizationId) until May 2019. To create an API key/token on goo.gl, follow the [guide](./google.md) to create a credential which will in turn produce an API key/token for you.
```
surl init
=> select your API provider (Bitly, Firebase, Owly, Google)
=> provide your API key/token
```

### Config
Should you want to update your API key/token or change the default API provider, you can always come back to change configuration.
```
surl config
```

### Shorten URL
```
surl www.example.com/test/test
=> goo.gl
```

### Expand URL
```
surl --reverse goo.gl   (or)   surl -r goo.gl
=> www.example.com/test/test
```

### Stats
Fetch shortened URL's meta data and usage statistics, if provided by the chosen API service.
```
surl --stats goo.gl
=> shortUrl: goo.gl
   origin: www.example.com/test/test
   created: 2009 11 12
   clicks: 
       PERIOD   SHORTURL  LONGURL      COUNTRIES DATA
       allTime  30        40           Canada       5
       month    0         0            Australia    2
       week     0         0
       day      0         0
       twoHours 0         0
```

### Help
Should you have any doubt, refer to the help page.
```
surl --help
```

## Tests
To run unit tests and API tests, run ```npm test```.

## Contributing
Please refer to the [contributing guide](./CONTRIBUTION.md) for more details.

## License
[MIT License](./LICENSE.md) | Copyright (c) 2018 Hank Chan

