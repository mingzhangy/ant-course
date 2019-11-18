import { queryList, addOne, updateOne, deleteOne, getStatistic } from '../services/cards';

export default {
  namespace: "cards",

  state: {
    cardsList: [],
    statistic: {},
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(queryList);
      console.log('queryList');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { cardsList: rsp.result } });
    },
    *addOne({ payload }, { call, put }) {
      const rsp = yield call(addOne, payload);
      yield put({ type: 'queryList' });
      return rsp;
    },
    *updateOne({ id, params }, { call, put }) {
      const rsp = yield call(updateOne, id, params);
      yield put({ type: 'queryList' });
      return rsp;
    },
    *deleteOne({ id }, { call, put }) {
      const rsp = yield call(deleteOne, id);
      yield put({ type: 'queryList' });
      return rsp;
    },
    *getStatistic({ payload }, { call, put }) {
      const rsp = yield call(getStatistic, payload);
      yield put({
        type: 'saveStatistic',
        payload: {
          id: payload,
          data: rsp.result,
        },
      });
      return rsp;
    },
  },

  reducers: {
    saveList(state, { payload: { cardsList } }) {
      return {
        ...state,
        cardsList,
      }
    },
    saveStatistic(state, { payload: { id, data } }) {
      return {
        ...state,
        statistic: {
          ...state.statistic,
          [id]: data,
        },
      }
    },
  }

}