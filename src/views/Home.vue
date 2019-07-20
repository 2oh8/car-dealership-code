<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="grey darken-4">

          <v-card-title>
            <v-toolbar-title class="headline text-uppercase">

              <span>Browse</span>
              <span class="font-weight-light"> Inventory</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search by make, model, year, etc..." single-line
              hide-details></v-text-field>
          </v-card-title>
          <v-layout class="pl-2 pr-2" row wrap>
            <v-chip v-for="(filter, index) in filters" close :color="filter.value.toLowerCase() + ' darken-2'"
              text-color="white">
              <v-avatar>
                <v-icon></v-icon>
              </v-avatar>
              {{filter.name}}: {{filter.value}}
            </v-chip>
            <v-btn :disabled="filters.length == 0" @click="filters = [], initVehicleList()" color="#be2231" small round>Clear Filters</v-btn>
          </v-layout>
          <v-card-title class="pt-0 pb-0">
            <v-select label="Filter By" :items="['Make', 'Model', 'Color']" v-model="filterBy"></v-select>
            <v-select v-if="filterBy == 'Make'" label="Value" :items="makes" v-model="make"></v-select>
            <v-select v-if="filterBy == 'Model'" label="Value" :items="models" v-model="model"></v-select>
            <v-select v-if="filterBy == 'Color'" label="Value" :items="colors" v-model="color"></v-select>
            <v-btn @click="addFilter('Make', 'make', make)" v-if="filterBy == 'Make'" color="grey darken-1">Add
              </v-btn>
            <v-btn @click="addFilter('Model', 'model', model)" v-if="filterBy == 'Model'" color="grey darken-1">Add
            </v-btn>
            <v-btn @click="addFilter('Color', 'color', color)" v-if="filterBy == 'Color'" color="grey darken-1">Add
            </v-btn>
          </v-card-title>
          <v-card-title class="pt-2 pb-0">

              <v-range-slider
              color="#be2231"
              v-model="year"
              :max="2016"
              :min="1980"
              :step="1"
              thumb-color="#be2231"
              thumb-label="always"
            ></v-range-slider>
          </v-card-title>
          <v-flex>
            </v-flex>
              <v-layout row>
                <div style="width: 100%; position: relative;" class="text-xs-center">
                <small class="grey--text">(click to view vehicle)</small>
                </div>
              </v-layout>
          <v-data-table :search="search" :headers="headers" :items="vehicleList" class="elevation-1"
            :disable-initial-sort="true" :pagination.sync="pagination"
            :rows-per-page-items='[50,100,250,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'>
            <template v-slot:items="props">
              <tr @click="navigate('/vehicles/' + props.item._id)">
                <td><img :src='`//logo.clearbit.com/${props.item.make.replace(/\s/g, "")}.com?size=35`'>
                  <!-- <v-icon color="grey" :v-if="props.item.loaded == false">drive_eta</v-icon> -->
                </td>
                <td>{{ props.item.make }}</td>
                <td class="text-xs-left">{{ props.item.model }}</td>
                <td class="text-xs-left">{{ props.item.year }}</td>
                <td class="text-xs-left">{{ props.item.miles }}</td>
                <td class="text-xs-left">{{ props.item.price }}</td>
                <td class="text-xs-left">
                  <v-icon :color="props.item.color == 'Gray' ? 'grey' : props.item.color.toLowerCase()" small>lens
                  </v-icon> {{props.item.color}}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    watch: {
      watchYearSlider(newValue) {
        // console.log(newValue)
        var vehicleListCopy = this.$store.state.vehicles
        this.vehicleList = vehicleListCopy.filter(i => i.year >= newValue[0])
        this.vehicleList = vehicleListCopy.filter(i => i.year <= newValue[1])
      },
      watchFilters(newValue, oldValue) {
        // console.log(newValue)
        var instance = this
        newValue.forEach(function (filter) {
          instance.vehicleList = instance.vehicleList.filter(i => i[filter.key] == filter.value)
        })
        this.colors = []
        this.models = []
        this.makes = []
        instance.vehicleList.forEach(function (v) {
          if (instance.colors.includes(v.color) == false) {
            instance.colors.push(v.color)
          }
          if (instance.models.includes(v.model) == false) {
            instance.models.push(v.model)
          }
          if (instance.makes.includes(v.make) == false) {
            instance.makes.push(v.make)
          }
        })
      }
    },
    mounted() {
      // console.log(this.$router)
      this.initVehicleList()
    },
    methods: {
      initVehicleList() {
        // console.log(this.$store.state.vehicles)
        var instance = this
        var vehicles = this.$store.state.vehicles
        var min = 0
        var max = 0
        vehicles.forEach(function (v, index) {
          if (instance.colors.includes(v.color) == false) {
            instance.colors.push(v.color)
          }
          if (instance.models.includes(v.model) == false) {
            instance.models.push(v.model)
          }
          if (instance.makes.includes(v.make) == false) {
            instance.makes.push(v.make)
          }
          if (index == 0) {
            min = v.year
            max = v.year
          } else {
            if (v.year <= min) {
              min = v.year
            }
            if (v.year >= max) {
              max = v.year
            }
            if (index == vehicles.length - 1) {
              instance.year.push(min)
              instance.year.push(max)
            }
          }
        })
        this.vehicleList = vehicles
      },
      navigate(route) {
        this.$router.push(route)
      },
      addFilter(name, key, value) {
        this.filters.push({
          name: name,
          key: key,
          value: value
        })
      }
    },
    data() {
      return {
        year: [],
        vehicleList: [],
        filterBy: '',
        filters: [],
        make: '',
        model: '',
        color: '',
        makes: [],
        models: [],
        colors: [],
        search: '',
        pagination: {
          rowsPerPage: 50
        },
        headers: [
          {
            text: '',
            align: 'left',
            sortable: true,
            value: 'make'
          },
          {
            text: 'Make',
            align: 'left',
            sortable: true,
            value: 'make'
          },
          {
            text: 'Model',
            align: 'left',
            sortable: true,
            value: 'model'
          },
          {
            text: 'Year',
            align: 'left',
            sortable: true,
            value: 'year'
          },
          {
            text: 'Miles',
            align: 'left',
            sortable: true,
            value: 'miles'
          },
          {
            text: 'Price',
            align: 'left',
            sortable: true,
            value: 'price'
          },
          {
            text: 'Color',
            align: 'left',
            sortable: true,
            value: 'color'
          }
        ],
      };
    },
    computed: {
      watchFilters() {
        return this.filters
      },
      watchYearSlider() {
        return this.year
      }
    },
    components: {

    }
  }
</script>