import React from "react";
import { withRouter } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import Modal from "react-modal";
import modalStyle from "../../constants/modalStyle";
import gql from "graphql-tag";

class UpdatePage extends React.Component {
  state = {
    title: this.props.location.state.title,
    image: this.props.location.state.image,
  };

  componentDidUpdate(prevProps) {
    if (!this.props.postQuery.loading && prevProps.postQuery.loading) {
      let Post = this.props.postQuery.listPosts.data
        ? this.props.postQuery.listPosts.data[0]
        : {};
      if (this.state.title !== Post.title || this.state.image !== Post.image) {
        this.setState(Post);
      }
    }
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel="Update Post"
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className="pa4 flex justify-center bg-white">
          <div style={{ maxWidth: 400 }} className="">
            {this.state.image && (
              <img src={this.state.image} alt="" className="w-100 mv3" />
            )}
            <input
              className="w-100 pa3 mv2"
              value={this.state.image}
              placeholder="Image Url"
              onChange={(e) => this.setState({ image: e.target.value })}
              autoFocus
            />
            <input
              className="w-100 pa3 mv2"
              value={this.state.title}
              placeholder="Title"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            {this.state.title && this.state.image && (
              <button
                className="pa3 bg-black-10 bn dim ttu pointer"
                onClick={this.handlePost}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </Modal>
    );
  }

  handlePost = async () => {
    const { title, image } = this.state;
    await this.props.updatePostMutation({
      variables: { _id: this.props.match.params._id, title, image },
    });
    this.props.history.replace("/post-app");
  };
}

const POST_QUERY = gql`
  query PostQuery($_id: ID!) {
    listPosts(_id: $_id) {
      data {
        _id
        image
        title
      }
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation UpdateQuery($_id: ID!, $title: String!, $image: String!) {
    updatePost(_id: $_id, title: $title, image: $image) {
      _id
      image
      title
    }
  }
`;

const UpdatePageWithGraphQL = compose(
  graphql(POST_QUERY, {
    name: "postQuery",
    options: ({ match }) => ({
      variables: {
        _id: match.params._id,
      },
    }),
  }),
  graphql(UPDATE_POST_MUTATION, {
    name: "updatePostMutation",
  })
)(UpdatePage);

const UpdatePageWithMutation = graphql(UPDATE_POST_MUTATION)(
  UpdatePageWithGraphQL
);

export default withRouter(UpdatePageWithMutation);
