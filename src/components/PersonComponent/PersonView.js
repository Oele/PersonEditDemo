import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import "moment/locale/nl";

const styles = theme => ({
  card: {
    width: 275,
    textAlign: "left"
  },
  title: {
    fontSize: 14
  },
  birthDate: {
    marginBottom: 14
  },
  hobbies: {
    marginBottom: 14
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  chipTitle: {
    fontSize: 13
  },
  cardActions: {
    justifyContent: "space-between"
  }
});

class PersonView extends Component {
  constructor(props) {
    super(props);
    moment.locale("nl");
  }

  render() {
    const { person, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary">
            {person.voornaam} {person.achternaam}
          </Typography>
          <Typography color="textSecondary" className={classes.birthDate}>
            {person.geboortedatum &&
              moment(person.geboortedatum).format("DD MMMM YYYY")}
          </Typography>
          {person.hobbies.length > 0 && (
            <div className={classes.hobbies}>
              <Typography className={classes.chipTitle} color="textPrimary">
                Hobbies
              </Typography>
              {person.hobbies.map(hobby => (
                <Chip
                  label={hobby}
                  color="primary"
                  key={hobby}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          {person.vakgebieden.length > 0 && (
            <div>
              <Typography className={classes.chipTitle} color="textPrimary">
                Vakgebieden
              </Typography>

              {person.vakgebieden.map(vakgebied => (
                <Chip
                  label={vakgebied.label}
                  color={vakgebied.actief ? "primary" : "default"}
                  key={vakgebied.label}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="Aanpassen">
            <EditIcon onClick={() => this.props.onEdit()} />
          </IconButton>
          <IconButton
            aria-label="Verwijderen"
            onClick={() => this.props.onRemove()}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(styles)(PersonView);
