import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as storyActions from '../../actions/storyActions'


export class newStoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: ''};
  }

  handleSubmit(e) {
    e.preventDefault()

    const title = this.refs.titleInput
    const description = this.refs.descriptionInput

    if (title.value && description.value) {
      this.props.addStory(title.value, description.value)

      title.value = ''
      description.value = ''
      this.setState({ error: '' })
    } else {
      this.setState({ error: 'Fill in values.' })
    }
  }

  render () {
    var storyError = <div id="new-story-error">Fill in values.</div>

    return (
      <div id="new-story" onSubmit={this.handleSubmit.bind(this)}>
        { this.state.error.length ? storyError : null }

        <form>
          <input ref='titleInput' />
          <input ref='descriptionInput' />
          <button type='submit'>Add Todo</button>
        </form>
      </div>
    )
  }
}

// Smart component!
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storyActions, dispatch)
  };
}

export default connect(
  mapDispatchToProps
)(newStoryPage)
