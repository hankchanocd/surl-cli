# surl
a cli tool for shortening url and retrieving url's usage data from third-party APIs; ```surl``` is the missing companion tool for ```curl```

# Install
```
npm install @hankchanocd/surl -g
```

# Usage
### Start by initializing surl's configuration
```
surl init
=> select your API provider (Google, Bitly)
=> provide your api key
```

### You can always come back to change configuration
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
surl --reverse goo.gl
=> www.example.com/test/test
```

### Fetch shortened URL usage data
```
surl --stats goo.gl
=> shortUrl: goo.gl
   origin: www.example.com/test/test
   created: 2009 11 12
```

<br>
Made with ❤ by Hank
