'use strict';

/*
  Plugins
/*---------------------------------------*/
import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './mutation-types';

/*
  Use 
/*---------------------------------------*/
Vue.use(Vuex);

export default new Vuex.Store({
  /*
    States 
  /*---------------------------------------*/
  state: {
    root: 'http://localhost:3000',


  },

  /*
    Getters 
  /*---------------------------------------*/
  getters: {
    root: state => state.root,


  },

  /*
    Mutations 
  /*---------------------------------------*/
  mutations: {
    [types.CHANGE_MENU](state,menu){
      state.isfood = (menu === 'food')?true:false;
    },


  },

  /*
    Actions 
  /*---------------------------------------*/
  actions: {
    [types.CHANGE_MENU]({commit},menu){
      commit(types.CHANGE_MENU,menu);
    },

  }

});

