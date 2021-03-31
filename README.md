# Nuxt Stats Plugin

> Stats plugin used to send statistics to lomkit portal.

## Setup

- Add `@lomkit/stats` dependency using yarn or npm to your project (or git if doesn't have private npm registry)
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

You need to define the device uuid using
```js
this.$stats.setUuid('721ca239-854f-4699-8755-a4320660e772')
```

```js
this.$stats.heartbeat() // Send activity ping every 15 minutes
```
