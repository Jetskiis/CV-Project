import { nanoid } from "nanoid";
import React from "react";
import "../styles/Skills.css";

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      newSkill: "",
      isEditing: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editingForm = this.editingForm.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  onChange(e) {
    const val = e.target.value;
    this.setState({
      newSkill: val,
    });
  }

  onSubmit(e) {
    const item = {};
    const val = this.state.newSkill;

    item["val"] = val;
    item["id"] = nanoid();

    this.setState(
      (state) => ({
        skills: [...state.skills, item],
      }),
      () => this.props.onSubmit("skills", this.state.skills)
    );
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    this.setState({ newSkill: "" });
  }

  deleteEntry(e) {
    let entryArr = this.state.skills;
    const id = e.target.parentElement.parentElement.getAttribute("id");

    entryArr = entryArr.filter((obj) => obj["id"] !== id);

    this.setState({ skills: entryArr }, () =>
      this.props.onSubmit("skills", entryArr)
    );
  }

  editingForm() {
    const state = this.state;
    return (
      <div className="editingSkillsInfo">
        <label htmlFor="skill">Enter a skill:</label>
        <input
          type="text"
          id="skill"
          name="skill"
          value={state["newSkill"]}
          onChange={this.onChange}
          required
        />
        <button onClick={this.onSubmit}>Add</button>
      </div>
    );
  }

  submittedForm(obj) {
    const state = this.state;
    return (
      <li className="submittedSkillsText" id={obj.id} key={obj.id}>
        <div>
          {obj.val}
          <button onClick={this.deleteEntry}>Delete</button>
        </div>
      </li>
    );
  }

  render() {
    const state = this.state;
    const arr = state.skills;
    return (
      <div className="skills">
        <h1>Skills</h1>
        <div className="submittedSkillsInfo">
          <ul>
            {/* render already submitted input*/}
            {arr.length !== 0
              ? arr.map((obj) => this.submittedForm(obj))
              : null}
          </ul>
        </div>
        {/*display editing form */}
        {state.isEditing ? this.editingForm() : null}
        {/*if skills submitted at least once and not currently editing display add button */}
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

export default Skills;
