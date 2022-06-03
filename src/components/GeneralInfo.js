import React from "react";
import "../styles/GeneralInfo.css";

class GeneralInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      general: {
        "first-name": "",
        "last-name": "",
        "phone-number": "",
        email: "",
        location: "",
      },
      error: {
        phoneError: "",
        emailError: "",
      },
      isEditing: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onChange(e) {
    const arg = e.target.id;
    const val = e.target.value;
    this.setState((prevState) => ({
      general: {
        ...prevState.general,
        [arg]: val,
      },
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const valid = this.validateForm();
    if (valid) {
      this.props.onSubmit("general", this.state.general);
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  validateForm() {
    const general = this.state.general;
    let phoneError = "";
    let emailError = "";
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!general.email.includes("@")) {
      emailError = "invalid email";
    }

    if (!re.test(general["phone-number"])) {
      phoneError = "invalid phone number, use dashes";
    }

    if (emailError || phoneError) {
      this.setState(() => ({
        error: {
          phoneError,
          emailError,
        },
      }));
      return false;
    }

    this.setState({ error: phoneError, emailError });
    return true;
  }

  editingForm() {
    const generalState = this.state.general;
    return (
      <div className="editingGeneralInfo">
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            placeholder="First Name"
            onChange={this.onChange}
            value={generalState["first-name"]}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            onChange={this.onChange}
            placeholder="Last Name"
            value={generalState["last-name"]}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            placeholder="123-456-7890"
            onChange={this.onChange}
            value={generalState["phone-number"]}
            required
          ></input>
          {this.state.error.phoneError !== "" ? (
            <div className="error">{this.state.error.phoneError}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="ex@gmail.com"
            onChange={this.onChange}
            value={generalState["email"]}
            required
          ></input>
          {this.state.error.emailError !== "" ? (
            <div className="error">{this.state.error.emailError}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="location">Location (optional):</label>
          <input
            type="text"
            id="location"
            onChange={this.onChange}
            value={generalState["location"]}
          ></input>
        </div>
      </div>
    );
  }

  submittedForm() {
    const general = this.state.general;
    return (
      <div className="submittedGeneralInfo">
        <div className="submittedInfoText">
          <h2>First Name:</h2> <p> {general["first-name"]}</p>
        </div>
        <div className="submittedInfoText">
          <h2>Last Name:</h2> <p>{general["last-name"]}</p>
        </div>
        <div className="submittedInfoText">
          <h2>Phone Number:</h2> <p>{general["phone-number"]}</p>
        </div>
        <div className="submittedInfoText">
          <h2>Email:</h2> <p> {general["email"]}</p>
        </div>
        {general["location"] === "" ? null : (
          <div className="submittedInfoText">
            <h2>Location:</h2> <p> {general["location"]}</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    const state = this.state;
    return (
      <form onSubmit={this.onSubmit} className="generalInfo">
        <h1>General Information</h1>

        {state.isEditing ? this.editingForm() : this.submittedForm()}

        <br></br>

        {state.isEditing ? (
          <button type="submit">Submit</button>
        ) : (
          <button type="submit"> Edit</button>
        )}
      </form>
    );
  }
}

export default GeneralInfo;
