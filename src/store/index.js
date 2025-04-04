import { createStore } from 'vuex'

export default createStore({
    state: {
      items: [], // De array die we willen beheren
    },
    mutations: {
      ADD_ITEM(state, item) {
        state.items.push(item);
      },
      REMOVE_ITEM(state, index) {
        state.items.splice(index, 1);
      },
    },
    actions: {
      addItem({ commit }, item) {
        commit('ADD_ITEM', item);
      },
      removeItem({ commit }, index) {
        commit('REMOVE_ITEM', index);
      },
    },
    getters: {
      allItems: (state) => state.items,
    },
  });