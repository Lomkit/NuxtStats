/**
 * Nuxt.js plugin - Stats
 * @copyright : 2021 Lomkit
 */
/* global device, store */

import Vue from 'vue'
import axios from 'axios'

class Stats {

  validationUrl = 'api/in-app-purchase/verify';

  constructor() {
    this.version = '1.0.0'

    if (!'<%= options.application_id %>' || !'<%= options.url %>') {
      console.error( 'Please make sure you added application_id to stats options')
      return;
    }

    this.application_id = '<%= options.application_id %>'
    this.url = '<%= options.url %>'
    this.$axios = axios
    this.$axios.defaults.baseURL = this.url

    const that = this
    document.addEventListener('deviceready', () => {
      if (device === undefined || store === undefined)
        console.error('The store and/or device module are not installed')

      if (device !== undefined)
        that.setUuid(device.uuid)

      if (store !== undefined)
        store.validator = that.url + that.validationUrl;
    }, false);
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

  sendComment(content) {
    this.commentStore(content)
  }

  userActivityPost(self) {
    self.$axios.post('api/statistics/user-activity',{
      device_uuid: self.uuid,
      application_id: self.application_id
    })
  }

  commentStore(content) {
    this.$axios.post('api/comments',{
      application_id: this.application_id,
      content
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
