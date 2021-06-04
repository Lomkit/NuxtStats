# Nuxt Stats Plugin

> Stats plugin used to send data to Lomkit portal.

## Setup
- Run `npm install git+https://github.com/Lomkit/NuxtStats.git`
- Add `@lomkit/stats` to `modules` section of `nuxt.config.js` (or `~/modules/stats` via git)

```js
{
    modules: [
        '@lomkit/stats'
    ],

    stats: {
        application_id: 0,
        url: 'http://localhost/',
        test: {
              date: '2021-04-15', // Date of beginning of tests
              duration: 7 // Number of days
        }
    }
}
```

## Testing mode

While the application is in test mode, nothing will be sent to the lomkit portal.

## Usage
You can use **$stats** in almost any context using `ctx.$stats` or `app.$stats` or `this.$stats` (Including store actions).

You can overwrite the device UUID using:  
*This is called automatically with device uuid in cordova if using cordova-plugin-device*
```js
this.$stats.setUuid('721ca239-854f-4699-8755-a4320660e772')
```

You can send a comment using:
```js
this.$stats.sendComment('My comment')
```

To get the Lomkit url to redirect to stores:
```js
this.$stats.redirectStore()
```

To manually call the heartbeat:
```js
this.$stats.heartbeat() // Called automatically every 15 minutes
```

## Store validation

The validation url is automatically set by the module.
