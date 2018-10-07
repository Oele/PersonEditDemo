import React, { Component } from "react";
import PersonComponent from "./PersonComponent/index";
import persons from "../data";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  }
});

class MainApp extends Component {
  state = { persons };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={() => this.addPerson()}
        >
          <AddIcon />
        </Button>
        <Grid container spacing={24} align="center">
          {this.state.persons.map((person, index) => (
            <Grid item xs={12} md={3} key={index}>
              <PersonComponent
                person={person}
                onRemove={() => this.onRemove(index)}
                onSave={person => this.onSave(index, person)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  onRemove(index) {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons
    });
  }

  onSave(index, person) {
    const persons = [...this.state.persons];
    persons.splice(index, 1, person);
    this.setState({
      persons
    });
  }

  addPerson() {
    this.setState({
      persons: [
        ...this.state.persons,
        {
          voornaam: "",
          achternaam: "",
          geboortedatum: "",
          hobbies: [],
          vakgebieden: []
        }
      ]
    });
  }
}

export default withStyles(styles)(MainApp);
