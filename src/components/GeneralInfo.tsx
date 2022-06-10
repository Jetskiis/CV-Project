import * as React from "react";
import "../styles/GeneralInfo.css";

interface Props {
  onSubmit: (section: string, data: any) => void;
}

interface State {
  general: generalType,
  error: errorType,
  isEditing: boolean

}

type generalType = {
  "first-name": string,
  "last-name": string,
  "phone-number": string,
  "email": string,
  "location"?: string
}

type errorType = {
  phoneError: string,
  emailError: string
}

class GeneralInfo extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  state: State = {
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

  onChange(e: React.ChangeEvent): void {
    const arg = (e.target as HTMLFormElement).id;
    const val = (e.target as HTMLFormElement).value;
    this.setState((prevState: State) => ({
      general: {
        ...prevState.general,
        [arg]: val,
      },
    }));
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const valid: boolean = this.validateForm();
    if (valid) {
      this.props.onSubmit("general", this.state.general);
      this.setState((prevState: State) => ({ isEditing: !prevState.isEditing }));
    }
  }

  validateForm(): boolean {
    const general = this.state.general;
    let phoneError: string = "";
    let emailError: string = "";
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

    this.setState({ error: { phoneError, emailError } });
    return true;
  }

  editingForm(): JSX.Element {
    const generalState = this.state.general;
    return (
      <div className="editingGeneralInfo" >
        <div>
          <label htmlFor="first-name" > First Name: </label>
          < input
            type="text"
            id="first-name"
            placeholder="First Name"
            onChange={this.onChange}
            value={generalState["first-name"]}
            required
          />
        </div>

        < div >
          <label htmlFor="last-name" > Last Name: </label>
          < input
            type="text"
            id="last-name"
            onChange={this.onChange}
            placeholder="Last Name"
            value={generalState["last-name"]}
            required
          />
        </div>

        <div>
          <label htmlFor="phone-number" > Phone Number: </label>
          <input
            type="tel"
            id="phone-number"
            placeholder="123-456-7890"
            onChange={this.onChange}
            value={generalState["phone-number"]}
            required />
          {this.state.error.phoneError !== "" ? (
            <div className="error" > {this.state.error.phoneError} </div>) : null}
        </div>

        <div>
          <label htmlFor="email" > Email: </label>
          < input
            type="email"
            id="email"
            placeholder="ex@gmail.com"
            onChange={this.onChange}
            value={generalState["email"]}
            required />
          {this.state.error.emailError !== "" ? (
            <div className="error" > {this.state.error.emailError} </div>
          ) : null
          }
        </div>

        <div >
          <label htmlFor="location" > Location(optional): </label>
          <input
            type="text"
            id="location"
            onChange={this.onChange}
            value={generalState["location"]}
          />

        </div>
      </div>
    );
  }





  submittedForm(): JSX.Element {
    const general = this.state.general;
    return (
      <div className="submittedGeneralInfo" >
        <div className="submittedInfoText" >
          <h2>First Name: </h2> <p> {general["first-name"]}</p >
        </div>
        <div className="submittedInfoText" >
          <h2>Last Name: </h2> <p>{general["last-name"]}</p >
        </div>
        <div className="submittedInfoText" >
          <h2>Phone Number: </h2> <p>{general["phone-number"]}</p >
        </div>
        <div className="submittedInfoText" >
          <h2>Email: </h2> <p> {general["email"]}</p >
        </div>
        {
          general["location"] === "" ? null : (
            <div className="submittedInfoText" >
              <h2>Location: </h2> <p> {general["location"]}</p >
            </div>
          )
        }
      </div>
    );
  }

  render(): React.ReactNode {
    const state = this.state;
    return (
      <form onSubmit={this.onSubmit} className="generalInfo" >
        <h1>General Information </h1>

        {state.isEditing ? this.editingForm() : this.submittedForm()}

        <br></br>

        {
          state.isEditing ? (
            <button type="submit" > Submit </button>
          ) : (
            <button type="submit" > Edit </button>
          )
        }
      </form>
    );
  }
}

export default GeneralInfo
