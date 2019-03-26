import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";

const SignUpContainer = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 100px;

  img {
    width: 100%;
  }
`;

const SignUpImage = styled.div`
background-image: url("https://picsum.photos/2000/1000?random");
background-size: cover;
width 100%;
height: 300px;
`;

const SignUpForm = styled.form`
  width: 95%;
  max-width: 800px;
  margin: 50px auto;
  border: 1px solid var(--light-teal);
  padding: 20px;
  margin-top: -200px;
  background-color: white;
  position: relative;
  z-index: 1000;

  input {
    width: 100%;
  }
`;

class SignUp extends Component {
  state = {
    bizDesc: "",
    bizName: "",
    category: "",
    email: "",
    extURL: "",
    firstName: "",
    imgURL: "",
    lastName: "",
    password: "",
    phone: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCreate = e => {
    e.preventDefault();
    const { firestore, firebase, history } = this.props;

    //Get items from state to use to set values in the create method below.

    const {
      bizDesc,
      bizName,
      category,
      email,
      extURL,
      firstName,
      imgURL,
      lastName,
      password,
      phone
    } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        //Get the unique UID generated by firebase and use it to set the doc name.
        let user_id = user.user.uid;
        firestore
          .collection("users")
          .doc(user_id)
          .set({
            //These values will come from the state unless explicitly specified below.
            user_id: user_id,
            featured: true,
            bizDesc,
            bizName,
            category: "Business Category",
            email,
            extURL: "https://sassafrasbiz.com",
            firstName,
            imgURL: "https://picsum.photos/200/200",
            lastName,
            password,
            phone: "111-111-1111"
          })
          .then(() => history.push(`/edit/${user_id}`));
      })
      .catch(error => alert(error));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <SignUpContainer>
        <SignUpImage />
        <SignUpForm>
          <h1>Create Account</h1>
          <p style={{ color: "red" }}>
            <em>
              Make this a full signup form with all info including selector for
              category, etc.
            </em>
          </p>
          <form onSubmit={this.onCreate}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bizName">Business Name</label>
              <input
                type="text"
                className="form-control"
                name="bizName"
                required
                value={this.state.bizName}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bizDesc">Business Description</label>
              <textarea
                type="text"
                className="form-control"
                name="bizDesc"
                required
                value={this.state.bizDesc}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <input
              type="submit"
              value="CREATE"
              className="btn btn-primary btn-block"
            />
          </form>
        </SignUpForm>
      </SignUpContainer>
    );
  }
}

SignUp.propTypes = {
  firebase: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(SignUp);
