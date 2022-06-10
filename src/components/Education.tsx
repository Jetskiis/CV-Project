import { nanoid } from "nanoid";
import * as React from "react";
import "../styles/Education.css";

interface Props {
  onSubmit: (section: string, data: any) => void;
}

interface State {
  educationObjArray: eduObj[],
  "school-name": string,
  "subject-name": string,
  "from-date": string,
  "to-date": string
  isEditingNew: boolean
}

type eduObj = {
  "id": string,
  "school-name": string,
  "subject-name": string,
  "from-date": string,
  "to-date": string
  isEditing: boolean
}


class Education extends React.Component<Props, State>{
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
    educationObjArray: [],
    "school-name": "",
    "subject-name": "",
    "from-date": "",
    "to-date": "",
    isEditingNew: true,
  }

  onChange(e: React.ChangeEvent): void {
    if (e.target != null) {
      const arg: string = (e.target as HTMLFormElement).id;
      const val: string = (e.target as HTMLFormElement).value;
      this.setState((prev: State) => ({ ...prev, [arg]: val }));
    }
  }

  onSubmit(e: React.FormEvent, isEdited: boolean, id: (string | null)): void {
    const state = this.state;

    e.preventDefault();

    if (!isEdited) {
      const educationObj = {} as eduObj;
      educationObj["school-name"] = state["school-name"];
      educationObj["subject-name"] = state["subject-name"];
      educationObj["from-date"] = state["from-date"];
      educationObj["to-date"] = state["to-date"];
      educationObj["isEditing"] = false;
      educationObj["id"] = nanoid();
      this.setState(
        (state: State) => ({
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
      const form: HTMLFormElement = e.target as HTMLFormElement;
      const elements: any = form.elements;
      const entryArr = this.state.educationObjArray;

      entryArr.forEach((obj: eduObj) => {
        if (obj["id"] === id) {
          obj["isEditing"] = false;
          obj["subject-name"] = elements["subject-name"].value;
          obj["school-name"] = elements["school-name"].value;
          obj["from-date"] = elements["from-date"].value;
          obj["to-date"] = elements["to-date"].value;
          return obj;
        } else return obj;
      });

      this.setState({ educationObjArray: entryArr }, () =>
        this.props.onSubmit("education", state.educationObjArray)
      );
    }
  }

  editEntry(e: React.MouseEvent): void {
    const entryArr = this.state.educationObjArray;
    const id = (e.target as HTMLFormElement)?.parentElement?.parentElement?.getAttribute("id");

    entryArr.forEach((obj: eduObj) => {
      if (obj["id"] === id) {
        obj["isEditing"] = true;
        return obj;
      } else return obj;
    });
    this.setState({ educationObjArray: entryArr });
  }

  deleteEntry(e: React.MouseEvent): void {
    let entryArr = this.state.educationObjArray;
    const id = (e.target as HTMLFormElement)?.parentElement?.parentElement?.getAttribute("id");

    entryArr = entryArr.filter((obj: eduObj) => obj["id"] !== id);
    if (this.state.educationObjArray.length === 1)
      this.setState({ isEditingNew: true });

    this.setState({ educationObjArray: entryArr }, () =>
      this.props.onSubmit("education", entryArr)
    );
  }

  editingForm(editObj: eduObj | null): JSX.Element {
    return (
      <form
        onSubmit={(e) => {
          if (editObj !== null)
            return this.onSubmit(e, true, editObj["id"]);
          else return this.onSubmit(e, false, null);
        }
        }
        className="editingEducationInfo"
        key={editObj !== null ? editObj["id"] : ""
        }>
        <div>
          <label htmlFor="school-name" > School Name: </label>
          < input
            type="text"
            id="school-name"
            placeholder="Name of Institution"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          />
        </div>

        < div >
          <label htmlFor="subject-name" > Subject Studied: </label>
          < input
            type="text"
            id="subject-name"
            placeholder="Subject"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          /> 
        </div>

        < div >
          <label htmlFor="from-date" > From: </label>
          < input
            type="date"
            id="from-date"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          /> 
        </div>

        < div >
          <label htmlFor="to-date" > To: </label>
          < input
            type="date"
            id="to-date"
            onChange={editObj !== null ? undefined : this.onChange}
            required
          /> 
        </div>

        < button type="submit" > Submit </button>
      </form>
    );
  }

  submittedForm(obj: eduObj): JSX.Element {
    return (
      <div className="submittedEducationText" id={obj.id} key={obj.id} >
        <div>
          <h2>School Name: </h2>
          < p > {obj["school-name"]} </p>
        </div>
        < div >
          <h2>Subject: </h2>
          < p > {obj["subject-name"]} </p>
        </div>
        < div >
          <h2>From: </h2>
          < p > {obj["from-date"]} </p>
        </div>
        < div >
          <h2>To: </h2>
          < p > {obj["to-date"]} </p>
        </div>
        < div >
          <button onClick={this.editEntry}> Edit </button>
          < button onClick={this.deleteEntry} > Delete </button>
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    const state = this.state;
    const arr = state.educationObjArray;
    return (
      <div className="education" >
        <h1>Education </h1>
        < div className="submittedEducationInfo" >
          {/* render already submitted input*/}
          {
            arr.length !== 0
              ? arr.map((obj: eduObj) => {
                if (obj["isEditing"]) return this.editingForm(obj);
                else return this.submittedForm(obj);
              })
              : null
          }
        </div>
        {/*display editing form */}
        {state.isEditingNew ? this.editingForm(null) : null}
        {/*if education submitted at least once and not currently editing display add button */}
        {
          !state.isEditingNew && arr.length !== 0 ? (
            <button
              onClick={() => {
                this.setState({ isEditingNew: true });
              }
              }
            >
              Add
            </button>
          ) : null
        }
      </div>
    );
  }
}

export default Education
