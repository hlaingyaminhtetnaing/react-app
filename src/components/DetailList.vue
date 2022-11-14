<template>
    <v-container justify="center">
        <h1 id="title">Ricky and Morty </h1>
        <v-row no glutters  style="margin-left: 30px;">
            <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                <v-img :src=" userDetail.image" id="square-card">
                </v-img>
            </v-col>
            <v-col>
                <p id="nameId">
                    {{ userDetail.name }}
                </p>
                <p class="subtitle">
                    Status:
                </p>
                <span class="sub">
                    <v-avatar color="green" size="10" v-show="userDetail.status == 'Alive'">
                    </v-avatar>
                    <v-avatar color="pink" size="10" v-show="userDetail.status == 'Dead'">
                    </v-avatar>
                    <v-avatar color="#E3F2FD" size="10" v-show="userDetail.status == 'unknown'">
                    </v-avatar>
                    {{ userDetail.status }}
                </span>
                <v-row>
                    <p class="subtitlee">
                        Species:
                    </p>
                    <v-spacer></v-spacer>
                    <p class="subtitle">
                        Gender:
                    </p>
                </v-row>
                <v-row>
                    <span class="subb">
                        {{ userDetail.species }}
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subb">
                        {{ userDetail.gender }}
                    </span>
                </v-row>
                <v-row>
                    <p class="subtitlee">
                        Origen:
                    </p>
                    <v-spacer></v-spacer>
                    <p class="subtitle">
                        Last Known location:
                    </p>
                </v-row>
                <v-row>
                    <span class="subb">
                        {{ userDetail.origin.name }}
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subb">
                        {{ userDetail.location.name }}
                    </span>
                </v-row>
                <v-row>

                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" outlined color="indigo" v-on:click="MainBtnClick">
                        Go To Main Menu
                    </v-btn>
                </v-row>

            </v-col>
        </v-row>
    </v-container>

</template>
<script>
import axios from 'axios';
export default {
    name: 'DetailList',
    data() {
        return {
            userDetail: [],
        }
    },
    methods: {
        getByUserID() {
            let self = this;
            axios.get('https://rickandmortyapi.com/api/character/' + self.$route.params.id)
                .then(response => {
                    self.userDetail = response.data;
                    console.log(self.userDetail);
                });
        },
        MainBtnClick() {
            this.$router.push(`/`);
        }
    },
    mounted() {
        let self = this;
        self.getByUserID();
    }
}
</script>
<style scoped>
#title {
    font-style: oblique;
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
    font-family: "Segoe Script";
}

#square-card {
    border-radius: 5%;
    max-height: 500px;
    max-width: 500px;
    margin-top: 50px;
    margin-left: 100px;
    margin-right: 100px;
}

#nameId {
    margin-top: 120px;
    font-size: 30px;
    font-weight: bold;
    font-family: "Bahnschrift SemiBold";
}

.subtitle {
    margin-top: 30px;
    font-size: 25px;
    font-weight: bold;
    font-family: "Corbel";
}

.subtitlee {
    margin-top: 30px;
    font-size: 25px;
    font-weight: bold;
    font-family: "Corbel";
}

.sub {
    margin-top: 20px;
    font-size: 20px;
    font-family: "Comic Sans MS";
}

.subb {
    font-size: 20px;
    font-family: "Comic Sans MS";
    margin-bottom: 30px;
}
</style>

