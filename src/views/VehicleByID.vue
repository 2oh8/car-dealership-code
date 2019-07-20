<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card v-if="vehicle">
                    <v-img id="car_img" class="white--text" height="50vh" width="100%" :src="vehicleImgSrc">
                        <v-container style="background: linear-gradient(0deg, transparent, #424242 95%)" fill-height
                            fluid>
                            <v-layout fill-height>
                                <img class="mt-2 pr-2" height="35px"
                                    :src='`//logo.clearbit.com/${vehicle.make.replace(/\s/g, "")}.com?size=35`'>
                                <v-flex xs12 align-end flexbox>
                                    <span class="display-2">{{vehicle.year + ' ' + vehicle.make}}</span>
                                    <br />
                                    <span class="headline">{{vehicle.price}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                                <v-progress-linear color="red" v-if="loadingVehicleImg" :indeterminate="true">
                            </v-progress-linear>
                        <v-flex class="mb-2" xs12 sm6>
                            <span class="grey--text headline">model: {{vehicle.model}}</span>
                            <br />
                            <span class="grey--text headline">
                                <!-- color: -->
                                <v-icon :color="vehicle.color == 'Gray' ? 'grey' : vehicle.color.toLowerCase()">lens
                                </v-icon>
                                {{vehicle.color}}
                            </span>
                            <br />
                            <span class="headline">
                                <v-icon>gesture</v-icon>
                                {{ vehicle.miles }}
                                <small class="grey--text">mi</small>
                            </span>
                            <br />
                            <span class="headline">
                                <v-icon>local_gas_station</v-icon>
                                {{ vehicle.cityMileage.low + '/' + vehicle.cityMileage.high }}
                                <small class="grey--text">city</small>
                            </span>
                            <br />
                            <span class="headline">
                                <v-icon color="transparent">local_gas_station</v-icon>
                                {{ vehicle.highwayMileage.low + '/' + vehicle.highwayMileage.high }}
                                <small class="grey--text">highway</small>
                            </span>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <span class="title">

                                <v-icon>info</v-icon> About this Vehicle:
                            </span>
                            <p>{{vehicle.description}}</p>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import $ from "jquery";
    import unsplash from "unsplash-api";

    export default {
        watch: {
            currentVehicle(newValue, oldValue) {
                var instance = this;
                var clientId =
                    "33c8e882a00ec2f3963e08ed0201657122c1fbcfa81232774b7db0b2a9de2b8f"; //this is required to verify your application's requests
                unsplash.init(clientId);
                unsplash.searchPhotos(newValue.make + " car", null, null, null, function (
                    error,
                    photos,
                    link
                ) {
                    // console.log(error, photos)
                    let photoCount = photos.length;
                    let randomIndex = Math.floor(Math.random() * photoCount);
                    instance.vehicleImgSrc = photos[randomIndex].urls.raw;
                    setTimeout(function () {
                        instance.loadingVehicleImg = false
                    }, 1350)
                    //Access default 10 photos from first page of search results here
                });
            }
        },
        mounted() {
            var instance = this;
            this.$store
                .dispatch("getVehicleByID", this.$route.params.vehicleId)
                .then(vehicle => {
                    // console.log(vehicle);
                    instance.vehicle = vehicle;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        methods: {},
        data() {
            return {
                vehicle: null,
                vehicleImgSrc: "",
                loadingVehicleImg: true
            };
        },
        computed: {
            currentVehicle() {
                return this.vehicle;
            }
        },
        components: {}
    };
</script>