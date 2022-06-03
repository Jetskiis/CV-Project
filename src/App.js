import React from "react";
import "./App.css";
import Education from "./components/Education";
import Experience from "./components/Experience";
import GeneralInfo from "./components/GeneralInfo";
import Skills from "./components/Skills";
class App extends React.Component {
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
      skills: [],
      education: [],
      experience: [],
    };
    this.sectionOnSave = this.sectionOnSave.bind(this);
    this.finalizeForm = this.finalizeForm.bind(this);
  }

  sectionOnSave(section, data) {
    if (
      section === "general" ||
      section === "education" ||
      section === "skills" ||
      section === "experience"
    ) {
      this.setState({
        [section]: data,
      });
    }
  }

  finalizeForm() {
    const general = this.state.general;
    const skills = this.state.skills;
    const education = this.state.education;
    const experience = this.state.experience;

    if (
      skills.length === 0 ||
      education.length === 0 ||
      experience.length === 0 ||
      general["first-name"] === ""
    ) {
      alert("Fill out all the sections before saving the CV");
      return;
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach((node) => node.remove());
  }

  render() {
    document.title = "CV Generator";
    const general = this.state.general;
    return (
      <div className="App">
        <GeneralInfo onSubmit={this.sectionOnSave} />
        <Education onSubmit={this.sectionOnSave} />
        <Skills onSubmit={this.sectionOnSave} />
        <Experience onSubmit={this.sectionOnSave} />
        <button onClick={this.finalizeForm} id="saveCV">
          Submit CV
        </button>
      </div>
    );
  }
}

export default App;
