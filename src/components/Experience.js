import { nanoid } from "nanoid";
import React from "react";
import "../styles/Experience.css";
class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceObjArray: [],
      name: "",
      desc: "",
      "from-date": "",
      "to-date": "",
      location: "",
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
      const experienceObj = {};
      experienceObj["name"] = state["name"];
      experienceObj["desc"] = state["desc"];
      experienceObj["from-date"] = state["from-date"];
      experienceObj["to-date"] = state["to-date"];
      experienceObj["location"] = state["location"];
      experienceObj["isEditing"] = false;
      experienceObj["id"] = nanoid();
      this.setState(
        (state) => ({
          experienceObjArray: [...state.experienceObjArray, experienceObj],
        }),
        () => this.props.onSubmit("experience", this.state.experienceObjArray)
      );
      //clear editing state
      this.setState({ name: "" });
      this.setState({ desc: "" });
      this.setState({ "from-date": "" });
      this.setState({ "to-date": "" });
      this.setState({ location: "" });
      //no longer editing because form submitted
      this.setState({ isEditingNew: false });
    } else {
      const form = e.target;
      const entryArr = this.state.experienceObjArray;

      entryArr.forEach((obj) => {
        if (obj["id"] === id) {
          obj["isEditing"] = false;
          obj["name"] = form.elements["name"].value;
          obj["desc"] = form.elements["desc"].value;
          obj["from-date"] = form.elements["from-date"].value;
          obj["to-date"] = form.elements["to-date"].value;
          obj["location"] = form.elements["location"].value;
          return obj;
        } else return obj;
      });

      this.setState({ experienceObjArray: entryArr }, () =>
        this.props.onSubmit("experience", state.experienceObjArray)
      );
    }
  }

  editEntry(e) {
    const entryArr = this.state.experienceObjArray;
    const id = e.target.parentElement.parentElement.getAttribute("id");

    entryArr.forEach((obj) => {
      if (obj["id"] === id) {
        obj["isEditing"] = true;
        return obj;
      } else return obj;
    });
    this.setState({ experienceObjArray: entryArr });
  }

  deleteEntry(e) {
    let entryArr = this.state.experienceObjArray;
    const id = e.target.parentElement.parentElement.getAttribute("id");

    entryArr = entryArr.filter((obj) => obj["id"] !== id);
    if (this.state.experienceObjArray.length === 1)
      this.setState({ isEditingNew: true });

    this.setState({ experienceObjArray: entryArr }, () =>
      this.props.onSubmit("experience", entryArr)
    );
  }

  editingForm(editObj) {
    const arr = this.state.experienceObjArray;

    return (
      <form
        onSubmit={(e) => {
          if (editObj !== undefined)
            return this.onSubmit(e, true, editObj["id"]);
          else return this.onSubmit(e, false, null);
        }}
        className="editingExperienceInfo"
        key={editObj !== undefined ? editObj["id"] : ""}
      >
        <div>
          <label htmlFor="name">Name Of Workplace:</label>
          <input
            type="text"
            id="name"
            placeholder="Name of Workplace"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            type="text"
            id="desc"
            placeholder="Description"
            onChange={editObj !== undefined ? null : this.onChange}
            required
          ></textarea>
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

        <div>
          <label htmlFor="location">Location (optional):</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={editObj !== undefined ? null : this.onChange}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }

  submittedForm(obj) {
    return (
      <div className="submittedExperienceText" id={obj.id} key={obj.id}>
        <div>
          <h2>Name:</h2>
          <p>{obj["name"]}</p>
        </div>
        <div>
          <h2>Description:</h2>
          <p>{obj["desc"]}</p>
        </div>
        <div>
          <h2>From:</h2>
          <p>{obj["from-date"]}</p>
        </div>
        <div>
          <h2>To:</h2>
          <p>{obj["to-date"]}</p>
        </div>

        {obj["location"] !== "" ? (
          <div>
            <h2>Location:</h2>
            <p>{obj["location"]}</p>
          </div>
        ) : null}

        <div>
          <button onClick={this.editEntry}>Edit</button>
          <button onClick={this.deleteEntry}>Delete</button>
        </div>
      </div>
    );
  }

  render() {
    const state = this.state;
    const arr = state.experienceObjArray;
    return (
      <div className="experience">
        <h1>Experience</h1>
        <div className="submittedExperienceInfo">
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
        {/*if experience submitted at least once and not currently editing display add button */}
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

export default Experience;
