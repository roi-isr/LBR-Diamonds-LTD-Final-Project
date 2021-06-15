import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RE5 from '../../../Assets/Dmn_pic/RE5.jpg';
import { connect } from 'react-redux';
import { save_token } from '../../../store/actions/index';
import Admin from '../../Admin/Admin';
import Loader from 'react-loader-spinner';
import styled from 'styled-components/macro';
import { fetchAuthRequest } from '../../../ApiEndpoints/Authentication';

const LoadingDiv = styled.div
  `
  text-align: right;
`;

// copyright for using Material-UI style template
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// Apply style on login elements
const useStyles = makeStyles((theme) => ({
  root: {
    height: '40vh',
  },
  image: {
    backgroundImage: `url(${RE5})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1.5),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    },
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide(props) {
  const classes = useStyles();
  // Using React Hooks in order to manage component's states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inSignProcess, setInSignProcess] = useState(false)

  const authHandler = async (event) => {
    event.preventDefault();
    setInSignProcess(true);
    const httpContent =
    {
      username: email,
      password: password,
    };

    try {
      // Authenticate admin
      const tokens = await fetchAuthRequest(httpContent);
      props.tokenSaver(tokens);
    } catch (error) {
      alert(error);
    } finally {
      setInSignProcess(false);
    }
  }
  const SignInForm =
    <Grid
      container
      component="main"
      className={classes.root}
      onSubmit={(e) => authHandler(e)}>
      <CssBaseline />
      <Grid
        item xs={false}
        sm={4} md={7}
        className={classes.image}
      />
      <Grid
        item
        xs={12} sm={8} md={5}
        component={Paper}
        elevation={6}
        square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5">
            Sign in
    </Typography>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <LoadingDiv>
              <Loader
                type='ThreeDots'
                height={40}
                width={40}
                color="SlateBlue"
                visible={inSignProcess}
              />
            </LoadingDiv>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
      </Button>
            <Box sx={{ mt: 5 }}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>

  return (
    <React.Fragment>
      {props.auth_stat ?
        <Admin /> :
        SignInForm
      }
    </React.Fragment>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    tokenSaver: (tokens) => dispatch(save_token(tokens))
  }
}

const mapStateToProp = (state) => {
  return {
    auth_stat: state.tokenSaver.isLoggedIn
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(SignInSide);
