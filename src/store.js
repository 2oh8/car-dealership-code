import Vue from 'vue'
import Vuex from 'vuex'
import vehicles from './vehicles.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vehicles: vehicles
  },
  mutations: {

  },
  actions: {
    getVehicleByID({ commit, dispatch }, id) {
      var instance = this
      return new Promise(function (resolve, reject) {
        var vehicles = instance.state.vehicles
        var listing = vehicles.find(x => x._id === id)
        if (listing) {
          resolve(listing)
        } else {
          reject('No listing found with that ID...')
        }
      })
    },
  }
})
