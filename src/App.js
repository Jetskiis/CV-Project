import React from "react";
import "./App.css";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
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
  }

  sectionOnSave(section, data) {
    if (section === "general" || section === "education") {
      this.setState({
        [section]: data,
      });
    }
  }

  render() {
    document.title = "CV Generator";
    const general = this.state.general;
    return (
      <div className="App">
        <GeneralInfo onSubmit={this.sectionOnSave} />
        <Education onSubmit={this.sectionOnSave}/>
        <Skills onSubmit={this.sectionOnSave}/>
      </div>
    );
  }
}

export default App;
