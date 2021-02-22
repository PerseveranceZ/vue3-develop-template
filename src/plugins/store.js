import { createStore } from "vuex";
import { VUEX_DEFAULT_CONFIG } from '/src/config'
import commonStore from '/src/service/store/common'

export default createStore({
  ...commonStore,
  ...VUEX_DEFAULT_CONFIG,
})