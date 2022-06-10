import { nanoid } from "nanoid";
import * as React from "react";
import "../styles/Experience.css";

interface Props {
  onSubmit: (section: string, data: any) => void;
}

interface State {
  experienceObjArray: expObj[],
  "name": string,
  "desc": string,
  "from-date": string,
  "to-date": string,
  "location"?: string,
  isEditingNew: boolean
}

type expObj = {
  "id": string,
  "name": string,
  "desc": string,
  "from-date": string,
  "to-date": string,
  "location"?: string,
  "isEditing": boolean
}

class Experience extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  state: State = {
    experienceObjArray: [],
    name: "",
    desc: "",
    "from-date": "",
    "to-date": "",
    location: "",
    isEditingNew: true,
  }

  onChange(e: React.ChangeEvent): void {
    if (e.target != null) {
      const arg: string = (e.target as HTMLFormElement).id;
      const val: string = (e.target as HTMLFormElement).value;
      this.setState((prev: State) => ({ ...prev, [arg]: val }));
    }
  }

  onSubmit(e: React.FormEvent, isEdited: boolean, id: (string | null)) {
    const state = this.state;

    e.preventDefault();

    if (!isEdited) {
      const experienceObj = {} as expObj;
      experienceObj["name"] = state["name"];
      experienceObj["desc"] = state["desc"];
      experienceObj["from-date"] = state["from-date"];
      experienceObj["to-date"] = state["to-date"];
      experienceObj["location"] = state["location"];
      experienceObj["isEditing"] = false;
      experienceObj["id"] = nanoid();
      this.setState(
        (state: State) => ({
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
      const form: HTMLFormElement = e.target as HTMLFormElement;
      const entryArr = this.state.experienceObjArray;
      const elements: any = form.elements;

      entryArr.forEach((obj: expObj) => {
        if (obj["id"] === id) {
          obj["isEditing"] = false;
          obj["name"] = elements["name"].value;
          obj["desc"] = elements["desc"].value;
          obj["from-date"] = elements["from-date"].value;
          obj["to-date"] = elements["to-date"].value;
          obj["location"] = elements["location"].value;
          return obj;
        } else return obj;
      });

      this.setState({ experienceObjArray: entryArr }, () =>
        this.props.onSubmit("experience", state.experienceObjArray)
      );
    }
  }

  editEntry(e: React.MouseEvent): void {
    const entryArr = this.state.experienceObjArray;
    const id = (e.target as HTMLFormElement)?.parentElement?.parentElement?.getAttribute("id");

    entryArr.forEach((obj: expObj) => {
      if (obj["id"] === id) {
        obj["isEditing"] = true;
        return obj;
      } else return obj;
    });
    this.setState({ experienceObjArray: entryArr });
  }

  deleteEntry(e: React.MouseEvent): void {
    let entryArr = this.state.experienceObjArray;
    const id = (e.target as HTMLFormElement)?.parentElement?.parentElement?.getAttribute("id");

    entryArr = entryArr.filter((obj: expObj) => obj["id"] !== id);
    if (this.state.experienceObjArray.length === 1)
      this.setState({ isEditingNew: true });

    this.setState({ experienceObjArray: entryArr }, () =>
      this.props.onSubmit("experience", entryArr)
    );
  }

  editingForm(editObj: expObj | null): JSX.Element {
    return (
      <form
        onSubmit={(e) => {
          if (editObj !== null)
            return this.onSubmit(e, true, editObj["id"]);
          else return this.onSubmit(e, false, null);
        }}
        className="editingExperienceInfo"
        key={editObj !== null ? editObj["id"] : ""}
      >
        <div>
          <label htmlFor="name">Name Of Workplace:</label>
          <input
            type="text"
            id="name"
            placeholder="Name of Workplace"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            placeholder="Description"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location (optional):</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={editObj !== null ? undefined : this.onChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }

  submittedForm(obj: expObj): JSX.Element {
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

  render(): React.ReactNode {
    const state = this.state;
    const arr = state.experienceObjArray;
    return (
      <div className="experience">
        <h1>Experience</h1>
        <div className="submittedExperienceInfo">
          {/* render already submitted input*/}
          {arr.length !== 0
            ? arr.map((obj: expObj) => {
              if (obj["isEditing"]) return this.editingForm(obj);
              else return this.submittedForm(obj);
            })
            : null}
        </div>
        {/*display editing form */}
        {state.isEditingNew ? this.editingForm(null) : null}
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
