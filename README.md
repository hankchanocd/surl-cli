# surl-cli  &nbsp;&nbsp;  [![Build Status](https://travis-ci.org/hankchanocd/surl-cli.svg?branch=master)](https://travis-ci.org/hankchanocd/surl-cli)  [![Known Vulnerabilities](https://snyk.io/test/github/hankchanocd/surl-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/hankchanocd/surl-cli?targetFile=package.json)  ![Github issues](https://img.shields.io/github/issues/hankchanocd/surl-cli.svg)
No more distraction from leaving to a web page just to create a short URL. ```surl``` is a CLI tool for shortening URL and retrieving URL's usage statistics from many API providers, including but not limited to <b>Bitly</b>, <b>Firebase</b>, and <b>Goo.gl</b>. The key advantage of <b>Firebase</b> API allows you to create links for Android and iOS apps in addition to web platform.

## Install
```
$ npm install surl-cli -g
```

## Usage
### Init
Before start using ```surl```, initialize configuration with ```surl init``` to select a default API provider. You must save at least one API key/token to ```surl``` from one of the three API providers (Bitly, Firebase, Goo.gl). While you can choose to store every API keys/tokens from all three service providers, ```surl``` only allows the default provider to be used at one time.
- Follow the [guide](./bitly.md) to go to <b>Bitly</b>'s API page to receive your API key/token.
- Follow the [guide](./firebase.md) to go to <b>Firebase (FDB)</b>'s API page to receive your API key/token.
- To comply with [Google's policy](https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html) on sunsetting <b>goo.gl</b> service on <b>May 2019</b>, we recommend users not to use URL shortening service from goo.gl. However, existing users of goo.gl can still receive their API keys/tokens at [console](https://console.developers.google.com/apis/credentials?project=constant-jigsaw-188105&folder&organizationId) until May 2019, while no new users are allowed to register with the service.
```
$ surl init
=> select your API provider (Bitly, Firebase, Google)
=> provide your API key/token
```

### Config
Update your API key/token and change the default API provider after `surl init`
```
$ surl config
```

### Shorten URL
```
$ surl www.example.com/test/test
=> success! https://goo.gl copied to clipboard
```

### Expand URL
```
$ surl --reverse goo.gl   (or)   surl -r goo.gl
=> success! expanded url copied to clipboard
```

### Stats
Fetch shortened URL's meta data and usage statistics, available only if the chosen provider has such feature.
```
$ surl --stats goo.gl
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
Should you have any doubt, refer to help page.
```
$ surl --help
```

## Tests
To run unit tests and API tests, run ```npm test```.

## Contributing
Please refer to the [contributing guide](./CONTRIBUTION.md) for more details.

## FAQ
1. Why is <b>ow.ly</b> not included in the CLI?
   Access to <b>ow.ly</b> API is restricted to the enterprise users of its parent company, Hootsuite. At this point, I don't see many paid users of Hootsuite requesting this feature. You can still use <b>ow.ly</b> service on Hootsuite's website though.

## License
[MIT License](./LICENSE.md) | Copyright (c) 2018 Hank Chan

