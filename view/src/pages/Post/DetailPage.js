import React from "react";
import { graphql, compose } from "react-apollo";
import Modal from "react-modal";
import modalStyle from "../../constants/modalStyle";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
  },
};

class DetailPage extends React.Component {
  componentDidUpdate() {
    if (!this.props.postQuery.listPosts.data) {
      this.props.history.replace("/post-app");
    }
  }

  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    let Post = this.props.postQuery.listPosts.data
      ? this.props.postQuery.listPosts.data[0]
      : {};

    return (
      <Modal
        isOpen
        contentLabel="Create Post"
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className="close fixed right-0 top-0 pointer"
          onClick={this.props.history.goBack}
        >
          <img src={require("../../assets/close.svg")} alt="" />
        </div>
        <div
          className="delete ttu white pointer fw6 absolute left-0 top-0 br2"
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div
          className="update ttu white pointer fw6 absolute right-0 top-0 br2"
          onClick={() =>
            this.props.history.replace("/post-app/update/" + Post._id, Post)
          }
        >
          Update
        </div>
        <div className="bg-white detail flex flex-column no-underline br2 h-100">
          <img className="image" src={Post.image} alt="" />
          <div className="flex items-center black-80 fw3 description">
            {Post.title}
          </div>
        </div>
      </Modal>
    );
  }

  handleDelete = async () => {
    await this.props.deletePostMutation({
      variables: { _id: this.props.postQuery.listPosts.data[0]._id },
    });
    this.props.history.replace("/post-app");
  };
}

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($_id: ID!) {
    removePost(_id: $_id) {
      message
    }
  }
`;

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

const DetailPageWithGraphQL = compose(
  graphql(POST_QUERY, {
    name: "postQuery",
    options: ({ match }) => ({
      variables: {
        _id: match.params._id,
      },
    }),
  }),
  graphql(DELETE_POST_MUTATION, {
    name: "deletePostMutation",
  })
)(DetailPage);

const DetailPageWithDelete = graphql(DELETE_POST_MUTATION)(
  DetailPageWithGraphQL
);

export default withRouter(DetailPageWithDelete);
