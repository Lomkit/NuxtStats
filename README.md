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
        url: 'http://localhost/'
    }
}
```

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

To manually call the heartbeat:
```js
this.$toast.heartbeat() // Called automatically every 15 minutes
```

## Store validation

The validation url is automatically set by the module.
