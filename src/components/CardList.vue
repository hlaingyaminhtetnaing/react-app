<template>
    <div id="centerText">
        <h1 id="title">Ricky and Morty </h1>
        <p id="subtitle">
            Are you looking for a character?
        </p>
        <input type="text" v-model="search" placeholder="Write your name...." @keyup.enter="filterData(search, false)" />         
                    <v-btn class="ma-2" outlined color="indigo" style="margin-bottom: 30px;"
                            v-on:click="clearSearch()" v-if="showClear">
                           Clear Search
                    </v-btn>
         <!--
             <v-text-field outlined shaped solo label="Write your name...." clearable append-icon="mdi-magnify"
            v-model="search" @keyup="filterData(search, false)">
        </v-text-field> 
            <input type="text" v-model="search" placeholder="Write your name...." @keyup="filterData(search, false)" append-icon="mdi-magnify"/>
           <v-btn large>
            <v-icon color="black" dark>
                mdi-magnify
            </v-icon>
        </v-btn>                  
        -->
        <v-container justify="center">
            <v-row no glutters cols="12" sm="2" md="3" lg="4" xl="4">
                <v-col v-for="user in users" :key="user.id">
                    <v-card class="mx-auto" max-width="400" style="background-color: #D1C4E9;padding: 30px;">
                        <v-img :src="user.image" id="rounded-card"></v-img>
                        <v-card-title class="justify-center">{{ user.name }}</v-card-title>
                        <v-card-title class="justify-center">
                            <v-avatar color="green" size="10" v-show="user.status == 'Alive'">
                            </v-avatar>
                            <v-avatar color="pink" size="10" v-show="user.status == 'Dead'">
                            </v-avatar>
                            <v-avatar color="#E3F2FD" size="10" v-show="user.status == 'unknown'">
                            </v-avatar>
                            &nbsp;&nbsp;{{ user.status }} - {{ user.species }}
                        </v-card-title>
                        <v-btn class="ma-2" outlined color="indigo" style="margin-bottom: 30px;"
                            v-on:click="BtnClick(user.id)">
                            See Details
                        </v-btn>
                    </v-card>
                </v-col>
                
            </v-row>
        </v-container>
        <div class="text-center">
            <v-pagination v-model="page" :value="page" :length="totalPages" :total-visible="7"></v-pagination>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "CardList",
    data() {
        return {
            users: [],
            search: "",
            page: 1,
            totalPages: null,
            showClear:false,
        };
    },
    mounted() {
        let self = this;
        self.getData(self.page);
    },
    watch: {
        page() {
            let self = this;
            if (self.search) {
                self.filterData(self.search, true);
            } else {
                self.getData(self.page);
            }

        },
    },
    methods: {
        getData(page) {
            let self = this;
            axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(response => {
                    self.users = response.data.results;
                    self.totalPages = response.data.info.pages;
                });
        },
        BtnClick(index) {
            this.$router.push(`/itemdetail/${index}`);
        },
        filterData(search, isPagation) {
            let self = this;
            self.showClear=true;
            if (!isPagation) self.page = 1;
            axios.get(`https://rickandmortyapi.com/api/character/?page=${self.page}&name=${search}`)
                .then(response => {
                    self.users = response.data.results;
                    self.totalPages = response.data.info.pages;
                });
        },
        clearSearch() {
            let self = this;
            self.search = "";
            self.getData(self.page);
            self.showClear = false;
        }
    },

}
</script>
<style scoped>
#subtitle {
    font-style: italic;
    font-family: "Times New Roman", Times, serif;
    margin-top: 40px;
    font-size: 30px;
}

#centerText {
    text-align: center;
    margin-top: 50px;
}

#title {
    font-style: oblique;
    font-size: 50px;
    font-family: "Segoe Script";
}

>>>.v-text-field {
    margin: 50px 500px;
    border-color: burlywood;
}

#rounded-card {
    border-radius: 50%;
    min-height: 30px;
    min-width: 50px;
    margin: 30px 50px;
}

input[type=text],
select {
    width: 50%;
    padding: 18px 20px;
    margin: 30px 100px 50px 100px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px 20px 4px 4px;
    box-sizing: border-box;
    background-color: azure;
}

>>>.v-row {
    font-family: "Corbel";
    font-size: 55px !important;
    margin: 30px 100px;
}

.pages {
    font-size: 20px;
}
</style>