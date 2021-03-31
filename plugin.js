/**
 * Nuxt.js plugin - Stats
 * @copyright : 2021 Lomkit
 */

import Vue from 'vue'
import axios from 'axios'

class Stats {
  constructor() {
    this.version = '1.0.0'

    if (!'<%= options.application_id %>' || !'<%= options.url %>') {
      console.error( 'Please make sure you added application_id to stats options');
    }

    this.application_id = '<%= options.application_id %>'
    this.url = '<%= options.url %>'
    this.$axios = axios
    this.$axios.defaults.baseURL = this.url
  }

  setUuid(uuid) {
    this.uuid = uuid
  }

  clearHeartbeat() {
    clearInterval(this.heartbeatInterval)
  }

  heartbeat() {
    if (this.heartbeatInterval) {
      this.clearHeartbeat()
    }

    this.userActivityPost(this)
    this.heartbeatInterval = setInterval(
      (function(self) {
        return function() {
          self.userActivityPost(self)
        }
      })(this)
      , 900000)
  }

  userActivityPost(self) {
    self.$axios.post('api/statistics/user-activity',{
      device_id: self.uuid,
      application_id: self.application_id
    })
  }
}

const StatsPlugin = {
  install(Vue) {
    Vue.stats = Vue.prototype.$stats = new Stats()
  }
}

export default (app, inject) => {
  Vue.use(StatsPlugin, {})

  inject('stats', Vue.stats)
}
