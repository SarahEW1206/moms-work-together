import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
import styled, { keyframes } from "styled-components";
import StyledHeadingOne from "../elements/StyledHeadingOne";
import StyledHeadingTwo from "../elements/StyledHeadingTwo";

const slideIn = keyframes`
  from {
    transform: translateX(700px);
  }

  to {
    transform: translateX(0);
  }
`;

const FeaturedContainer = styled.div`
  background-color: #ffebcd;
  width: 70%;
  transform: translateX(700px);
  animation: ${slideIn} 3s linear forwards;
  animation-delay: 1s;
  -webkit-clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
  clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);

  .inner-cont {
    margin-left: 60px;
    padding: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (max-width: 900px) {
    width: 100%;
    animation: none;
    transform: translateX(0px);

    -webkit-clip-path: polygon(0 13%, 100% 0%, 100% 100%, 0% 100%);
    clip-path: polygon(0 13%, 100% 0%, 100% 100%, 0% 100%);

    .inner-cont {
      margin-left: 0px;
      padding: 120px 40px;
    }
  }
`;

const FeatProfTopRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;

  i {
    font-size: 16px;
  }

  img {
    margin-bottom: 20px;
  }

  @media (min-width: 650px) {
    flex-direction: row;

    img {
      margin-right: 20px;
    }
  }

  @media (min-width: 900px) {
    flex-direction: column;

    img {
      margin-right: 0px;
    }
  }

  @media (min-width: 1400px) {
    flex-direction: row;

    img {
      margin-right: 50px;
    }
  }
`;

class FeaturedProfile extends Component {
  render() {
    const { users } = this.props;

    return (
      <FeaturedContainer>
        <div className="inner-cont">
          <StyledHeadingOne content="Featured Project" />
          {users
            .filter(item => item.user_id === "iDX0VulK2xOkRjWlFxYlmQfivc62")
            .map(feature => (
              <Fragment key={feature.user_id}>
                <FeatProfTopRow>
                  <img src={feature.imgURL} alt={feature.bizName} />
                  <div>
                    <StyledHeadingTwo content={feature.bizName} color="#333" />
                    <p>
                      Rating:
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </p>
                    <p>{feature.bizDesc}</p>
                    <p>
                      <strong>Owner: </strong>
                      {feature.firstName} {feature.lastName}
                    </p>
                    <p>
                      <strong>Category: </strong>
                      {feature.category}
                    </p>
                  </div>
                </FeatProfTopRow>
              </Fragment>
            ))}
        </div>
      </FeaturedContainer>
    );
  }
}

// export default compose(
//   firestoreConnect([{ collection: "users" }]),
//   connect((state, props) => ({
//     users: state.firestore.ordered.users
//   }))
// )(FeaturedProfile);

export default FeaturedProfile;
