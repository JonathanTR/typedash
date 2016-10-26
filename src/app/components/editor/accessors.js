// Accessors allow the shape of the state to be maintained in one place, so you
// only have to make updates to one place if the shape of your data changes

export default {
  getPassage (state) {
    return state.editor.get('passage')
  }
}

