import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../../constants/modalStyle'
import gql from 'graphql-tag'

class CreatePage extends React.Component {
  state = {
    title: '',
    image: ''
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className='pa4 flex justify-center bg-white'>
          <div style={{ maxWidth: 400 }} className=''>
            {this.state.image && (
              <img src={this.state.image} alt='' className='w-100 mv3' />
            )}
            <input
              className='w-100 pa3 mv2'
              value={this.state.image}
              placeholder='Image Url'
              onChange={e => this.setState({ image: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.title}
              placeholder='Title'
              onChange={e => this.setState({ title: e.target.value })}
            />
            {this.state.title &&
              this.state.image && (
                <button
                  className='pa3 bg-black-10 bn dim ttu pointer'
                  onClick={this.handlePost}
                >
                  Post
                </button>
              )}
          </div>
        </div>
      </Modal>
    )
  }

  handlePost = async () => {
    const { title, image } = this.state
    await this.props.createPostMutation({ variables: { title, image } })
    this.props.history.replace('/post-app')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation PostQuery($title: String!, $image: String!) {
    addPost(data: { title: $title, image: $image }) {
      data {
        _id
        image
        title
      }
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_POST_MUTATION, {
  name: 'createPostMutation'
})(CreatePage)
export default withRouter(CreatePageWithMutation)
