import { nanoid } from "nanoid";
import React from "react";
import "../styles/Education.css";

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationObjArray: [],
      "school-name": "",
      "subject-name": "",
      "from-date": "",
      "to-date": "",
      isEditingNew: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  onChange(e) {
    const arg = e.target.id;
    const val = e.target.value;
    this.setState({ [arg]: val });
  }

  onSubmit(e, isEdited, id) {
    const state = this.state;

    e.preventDefault();

    if (!isEdited) {
      const educationObj = {};
      educationObj["school-name"] = state["school-name"];
      educationObj["subject-name"] = state["subject-name"];
      educationObj["from-date"] = state["from-date"];
      educationObj["to-date"] = state["to-date"];
      educationObj["isEditing"] = false;
      educationObj["id"] = nanoid();
      this.setState(
        (state) => ({
          educationObjArray: [...state.educationObjArray, educationObj],
        }),
        () => this.props.onSubmit("education", this.state.educationObjArray)
      );
      //clear editing state
      this.setState({ "school-name": "" });
      this.setState({ "subject-name": "" });
      this.setState({ "from-date": "" });
      this.setState({ "to-date": "" });
      //no longer editing because form submitted
      this.setState({ isEditingNew: false });
    } else {
      const form = e.target;
      const entryArr = this.state.educationObjArray;

      entryArr.forEach((obj) => {
        if (obj["id"] === id) {
          obj["isEditing"] = false;
          obj["subject-name"] = form.elements["subject-name"].value;
          obj["school-name"] = form.elements["school-name"].value;
          obj["from-date"] = form.elements["from-date"].value;
          obj["to-date"] = form.elements["to-date"].value;
          return obj;
        } else return obj;
      });

      this.setState({ educationObjArray: entryArr }, () =>
        this.props.onSubmit("education", state.educationObjArray)
      );
    }
  }

  editEntry(e) {
    const entryArr = this.state.educationObjArray;
    const id = e.target.parentElement.parentElement.getAttribute("id");

    entryArr.forEach((obj) => {
      if (obj["id"] === id) {
        obj["isEditing"] = true;
        return obj;
      } else return obj;
    });
    this.setState({ educationObjArray: entryArr });
  }

  deleteEntry(e) {
    let entryArr = this.state.educationObjArray;
    const id = e.target.parentElement.parentElement.getAttribute("id");

    entryArr = entryArr.filter((obj) => obj["id"] !== id);
    if (this.state.educationObjArray.length === 1)
      this.setState({ isEditingNew: true });

    this.setState({ educationObjArray: entryArr }, () =>
      this.props.onSubmit("education", entryArr)
    );
  }

  editingForm(editObj) {
    const arr = this.state.educationObjArray;

    return (
      <form
        onSubmit={(e) => {
          if (editObj !== undefined)
            return this.onSubmit(e, true, editObj["id"]);
          else return this.onSubmit(e, false, null);
        }}
        className="editingEducationInfo"
        key={editObj !== undefined ? editObj["id"] : ""}
      >
        <div>
          <label htmlFor="school-name">School Name:</label>
          <input
            type="text"
            id="school-name"
            placeholder="Name of Institution"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="subject-name">Subject Studied:</label>
          <input
            type="text"
            id="subject-name"
            placeholder="Subject"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }

  submittedForm(obj) {
    return (
      <div className="submittedEducationText" id={obj.id} key={obj.id}>
        <div>
          <h2>School Name:</h2>
          <p>{obj["school-name"]}</p>
        </div>
        <div>
          <h2>Subject:</h2>
          <p>{obj["subject-name"]}</p>
        </div>
        <div>
          <h2>From:</h2>
          <p>{obj["from-date"]}</p>
        </div>
        <div>
          <h2>To:</h2>
          <p>{obj["to-date"]}</p>
        </div>
        <div>
          <button onClick={this.editEntry}>Edit</button>
          <button onClick={this.deleteEntry}>Delete</button>
        </div>
      </div>
    );
  }

  render() {
    const state = this.state;
    const arr = state.educationObjArray;
    return (
      <div className="education">
        <h1>Education</h1>
        <div className="submittedEducationInfo">
          {/* render already submitted input*/}
          {arr.length !== 0
            ? arr.map((obj) => {
                if (obj["isEditing"]) return this.editingForm(obj);
                else return this.submittedForm(obj);
              })
            : null}
        </div>
        {/*display editing form */}
        {state.isEditingNew ? this.editingForm() : null}
        {/*if education submitted at least once and not currently editing display add button */}
        {!state.isEditingNew && arr.length !== 0 ? (
          <button
            onClick={() => {
              this.setState({ isEditingNew: true });
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
