/*
  Vue Cores
/*---------------------------------------*/
import { createApp } from 'vue'

/*
  Vue SFCs
/*---------------------------------------*/
import VueHome from '@/vue/VueHome'

/*
  Init 
/*---------------------------------------*/
function init () {

  /*
    Vue App 
  /*---------------------------------------*/
  const appConfig = {
    components: {
      VueHome
    }
  }
  const app = createApp(appConfig)

  /*
    GlobalProperties for Filter
  /*---------------------------------------*/
  //- @how_to_user {{ $filters.currency(value) }}
  // app.config.globalProperties.$filters = {
  //   currency(value) {
  //     return currency.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  //   }
  // }

  /*
    Mount App
  /*---------------------------------------*/
  app.mount("#test")

}
document.addEventListener('DOMContentLoaded', init)
