import api from '/src/plugins/api'
import consts from '/src/plugins/const'
export default {
    getUserInfo({ commit }) {
        commit('SET_FRUIT', consts['OTHER/FRUIT'])
    	api['user/info']().then(resData => {
	        commit('SET_USER_INFO', resData)
    	})
    }
}
