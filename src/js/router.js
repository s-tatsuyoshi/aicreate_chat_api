/*
  Modules 
/*---------------------------------------*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../vue/home';

/*
  User 
/*---------------------------------------*/
Vue.use(VueRouter);


/*
  Routes 
/*---------------------------------------*/
const routes = [
	{path: '/', name: 'home', component: Home},
];

/*
  Export 
/*---------------------------------------*/
export default new VueRouter({
	routes,
})
