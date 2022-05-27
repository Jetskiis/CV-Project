import { nanoid } from "nanoid";
import React from "react";

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationObjArray: [],
      "school-name": "",
      "subject-name": "",
      "from-date": "",
      "to-date": "",
      isEditing: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  onChange(e) {
    const arg = e.target.id;
    const val = e.target.value;
    this.setState({ [arg]: val });
  }

  onSubmit(e) {
    const state = this.state;

    e.preventDefault();
    const educationObj = {};
    educationObj["school-name"] = state["school-name"];
    educationObj["subject-name"] = state["subject-name"];
    educationObj["from-date"] = state["from-date"];
    educationObj["to-date"] = state["to-date"];
    educationObj["id"] = nanoid();
    this.setState((state) => ({
      educationObjArray: [...state.educationObjArray, educationObj],
    }));
    //clear editing state
    this.setState({ "school-name": "" });
    this.setState({ "subject-name": "" });
    this.setState({ "from-date": "" });
    this.setState({ "to-date": "" });
    //no longer editing because form submitted
    this.setState({ isEditing: false });
  }

  editingForm() {
    const arr = this.state.educationObjArray;

    return (
      <form onSubmit={this.onSubmit} className="editingEducationInfo">
        <div>
          <label htmlFor="school-name">School Name:</label>
          <input
            type="text"
            id="school-name"
            placeholder="Name of Institution"
            onChange={this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="subject-name">Subject Studied:</label>
          <input
            type="text"
            id="subject-name"
            placeholder="Subject"
            onChange={this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            onChange={this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            onChange={this.onChange}
            required
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }

  submittedForm(obj) {
    return (
      <div className="submittedEducationText" key={obj.id}>
        <h2>School Name:</h2><p>{obj["school-name"]}</p>
        <h2>Subject:</h2><p>{obj["subject-name"]}</p>
        <h2>From:</h2><p>{obj["from-date"]}</p>
        <h2>To:</h2><p>{obj["to-date"]}</p>
      </div>
    );
  }

  render() {
    const state = this.state;
    const arr = state.educationObjArray;
    return (
      <div className="education">
        <h2>Education</h2>
        <div className="submittedEducationInfo">
          {/* render already submitted input*/}
          {arr.length !== 0 ? arr.map((obj) => this.submittedForm(obj)) : null}
        </div>
        {/*display editing form */}
        {state.isEditing ? this.editingForm() : null}
        {/*if education submitted at least once and not currently editing display add button */}
        {!state.isEditing && arr.length !== 0 ? (
          <button
            onClick={() => {
              this.setState({ isEditing: true });
            }}
          >
            Add
          </button>
        ) : null}
      </div>
    );
  }
}

export default Education;
