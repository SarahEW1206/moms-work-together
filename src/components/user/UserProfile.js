import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import styled from "styled-components";
import StyledHeadingOne from "../elements/StyledHeadingOne";
import StyledHeadingTwo from "../elements/StyledHeadingTwo";
import PatternedHeader from "../elements/PatternedHeader";

const ProfileContainer = styled.div`
  width: 100%;
  padding: 0px;
`;

const ProfileInnerCont = styled.div`
  width: 95%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  border: 1px solid var(--light-teal);
  padding: 50px;
  margin-top: -200px;
  background-color: white;
  position: relative;
  z-index: 1000;
  box-shadow: 0px 2px 3px #999;
  text-align: center;

  img {
    width: 200px;
    height: 200px;
    margin: 20px 0;
    border-radius: 100%;
  }
`;

class UserProfile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
    console.log("profile unmounted");
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <ProfileContainer>
          <PatternedHeader />
          <ProfileInnerCont>
            <StyledHeadingOne
              content={`${user.firstName} ${user.lastName}`}
              color="var(--dark-teal)"
            />
            <StyledHeadingTwo
              content={`${user.bizName}`}
              color="var(--dark-peach)"
            />
            <img src={user.imgURL} alt={user.bizName} />
            <p>{user.bizDesc}</p>
            {user.extURL && (
              <p>
                <a
                  href={user.extURL}
                  className="link-highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </p>
            )}

            <p>
              <span className="info-label">Email:</span> {user.email}
            </p>
            <p className="biz-category">
              <span className="info-label">Category:</span> {user.category}
            </p>
            <Link className="link-highlight" to="/marketplace">
              Back to Marketplace
            </Link>
          </ProfileInnerCont>
        </ProfileContainer>
      );
    } else {
      return <div style={{ height: "100vh" }} />;
    }
  }
}

UserProfile.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "users", storeAs: "user", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    user: ordered.user && ordered.user[0]
  }))
)(UserProfile);
