import state from "../state";

export default {
  Documents: state => {
    console.log('AB getters=>', state.documents);
    return state.documents
  }
}
