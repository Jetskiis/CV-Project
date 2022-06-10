import * as React from "react";
import "./App.css";
import Education from "./components/Education";
import Experience from "./components/Experience";
import GeneralInfo from "./components/GeneralInfo";
import Skills from "./components/Skills";

interface State {
  general: {
    "first-name": string,
    "last-name": string,
    "phone-number": string,
    "email": string,
    "location": string
  },
  skills: [],
  education: [],
  experience: []
}

class App extends React.Component<{}, State>{
  constructor(props: any) {
    super(props);
    this.sectionOnSave = this.sectionOnSave.bind(this);
    this.finalizeForm = this.finalizeForm.bind(this);
  }

  state: State = {
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
  }

  sectionOnSave(section: string, data: any): void {
    if (section === "education" ||
      section === "skills" ||
      section === "experience"
    ) {
      const general = this.state.general;
      this.setState((prev: State) => ({ ...prev, general: general, [section]: data }));
    }
    else if (section === "general") {
      this.setState((prev: State) => ({ ...prev, general: data }));
    }
  }

  finalizeForm(): void {
    const general: any = this.state.general;
    const skills: [] = this.state.skills;
    const education: [] = this.state.education;
    const experience: [] = this.state.experience;

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

  render(): React.ReactNode {
    document.title = "CV Generator";
    return (
      <div className="App" >
        <GeneralInfo onSubmit={this.sectionOnSave} />
        < Education onSubmit={this.sectionOnSave} />
        <Skills onSubmit={this.sectionOnSave} />
        < Experience onSubmit={this.sectionOnSave} />
        <button onClick={this.finalizeForm} id="saveCV" >
          Submit CV
        </button>
      </div>
    );
  }
}

export default App;
