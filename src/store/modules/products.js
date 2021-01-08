const state = {
	products: {}
}

const getters = {
	products: state => state.products
}

const actions = {
	initStore: ({commit}) => {
		axios.get('static/products.json')
			.then(response => {
				commit('SET_STORE', response.data.products)
			})
			.catch(error => console.log(error + " Check path to json"))
	}
}

const mutations = {
	'SET_STORE'(state, products) {
		state.products = products
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}