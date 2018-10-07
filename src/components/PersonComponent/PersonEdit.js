import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import "moment/locale/nl";

const styles = theme => ({
  card: {
    width: 275,
    textAlign: "left"
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  chipTitle: {
    fontSize: 13,
    marginBottom: 5
  },
  cardActions: {
    justifyContent: "space-between"
  },
  formLine: {
    marginBottom: 20
  }
});

class PersonEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.person,
      newHobby: "",
      newVakgebiedLabel: ""
    };
  }

  render() {
    const { classes } = this.props;
    const { person } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <TextField
            className={classes.formLine}
            label="Voornaam"
            type="text"
            value={person.voornaam}
            onChange={e =>
              this.setState({ person: { ...person, voornaam: e.target.value } })
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={classes.formLine}
            label="Achternaam"
            type="text"
            value={person.achternaam}
            onChange={e =>
              this.setState({
                person: { ...person, achternaam: e.target.value }
              })
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={classes.formLine}
            label="Geboortedatum"
            type="date"
            value={person.geboortedatum}
            onChange={e =>
              this.setState({
                person: { ...person, geboortedatum: e.target.value }
              })
            }
            InputLabelProps={{
              shrink: true
            }}
          />

          <div className={classes.formLine}>
            <Typography className={classes.chipTitle} color="textPrimary">
              Hobbies
            </Typography>
            {person.hobbies.map((hobby, index) => (
              <Chip
                label={hobby}
                color="primary"
                key={hobby}
                className={classes.chip}
                onDelete={() => this.deleteHobby(index)}
              />
            ))}
            <form
              onSubmit={e => {
                e.preventDefault();
                this.addHobby(this.state.newHobby);
              }}
            >
              <Input
                value={this.state.newHobby}
                onChange={e => this.setState({ newHobby: e.target.value })}
              />
            </form>
          </div>
          <div className={classes.formLine}>
            <Typography className={classes.chipTitle} color="textPrimary">
              Vakgebieden
            </Typography>

            {person.vakgebieden.map((vakgebied, index) => (
              <Chip
                label={vakgebied.label}
                color={vakgebied.actief ? "primary" : "default"}
                key={vakgebied.label}
                className={classes.chip}
                onDelete={() => this.deleteVakgebied(index)}
                onClick={() => this.toggleVakgebied(index)}
              />
            ))}
            <form
              onSubmit={e => {
                e.preventDefault();
                this.addVakgebied(this.state.newVakgebiedLabel);
              }}
            >
              <Input
                value={this.state.newVakgebiedLabel}
                onChange={e =>
                  this.setState({ newVakgebiedLabel: e.target.value })
                }
              />
            </form>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="Opslaan">
            <SaveIcon onClick={() => this.props.onSave(this.state.person)} />
          </IconButton>
          <IconButton
            aria-label="Verwijderen"
            onClick={() => this.props.onCancel()}
          >
            <CancelIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  addVakgebied(vakgebiedLabel) {
    const { person } = this.state;
    const vakgebieden = this.state.person.vakgebieden;
    this.setState({
      newVakgebiedLabel: "",
      person: {
        ...person,
        vakgebieden: [...vakgebieden, { label: vakgebiedLabel, actief: true }]
      }
    });
  }

  addHobby(hobby) {
    const { person } = this.state;
    const hobbies = this.state.person.hobbies;
    this.setState({
      newHobby: "",
      person: { ...person, hobbies: [...hobbies, hobby] }
    });
  }

  deleteHobby(index) {
    const { person } = this.state;
    const hobbies = this.state.person.hobbies;
    hobbies.splice(index, 1);
    this.setState({ person: { ...person, hobbies } });
  }

  deleteVakgebied(index) {
    const { person } = this.state;
    const vakgebieden = this.state.person.vakgebieden;
    vakgebieden.splice(index, 1);
    this.setState({ person: { ...person, vakgebieden } });
  }

  toggleVakgebied(index) {
    const { person } = this.state;
    const vakgebieden = this.state.person.vakgebieden;
    const thisVakgebied = vakgebieden[index];
    vakgebieden.splice(index, 1, {
      ...thisVakgebied,
      actief: !thisVakgebied.actief
    });
    this.setState({ person: { ...person, vakgebieden } });
  }
}
export default withStyles(styles)(PersonEdit);
