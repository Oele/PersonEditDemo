import React, { Component } from "react";
import PersonView from "./PersonView";
import PersonEdit from "./PersonEdit";

class PersonComponent extends Component {
  constructor(props) {
    super(props);
    let editing = false;

    const { person } = props;

    if (person.voornaam === "" && person.achternaam === "") {
      editing = true;
    }

    this.state = { editing };
  }
  render() {
    const { person } = this.props;
    if (this.state.editing) {
      return (
        <PersonEdit
          person={person}
          onCancel={() => this.onCancelEdit()}
          onSave={person => this.onSave(person)}
        />
      );
    } else {
      return (
        <PersonView
          person={person}
          onRemove={this.props.onRemove}
          onEdit={() => this.onEdit()}
        />
      );
    }
  }

  onEdit() {
    this.setState({ editing: true });
  }

  onCancelEdit() {
    this.setState({ editing: false });
  }

  onSave(person) {
    this.props.onSave(person);
    this.setState({ editing: false });
  }
}
export default PersonComponent;
