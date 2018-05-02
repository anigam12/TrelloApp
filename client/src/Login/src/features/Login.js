import React from "react";
//import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle} from "../helpers/auth";
import {firebaseAuth} from "../config/constants";
import firebase from 'firebase'
import { Header, Button ,Icon, Segment ,Message} from 'semantic-ui-react';


const displayName ="displayName";
const emailInfo = "emailInfo";
const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const square = { width: 300, height: 300 }
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        // this.writeUsers = this.writeUsers.bind(this);
    }



    // writeUsers(userId, name, email, imageUrl){
    //     firebase.database().ref('userDetails/' + userId).set({
    //                 username: name,
    //                 email: email,
    //                 profile_picture : imageUrl
    //             });

    // }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {

        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push("/app/home");
            return;
        }


        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                const emailInfoValue = user.email.substring(0,user.email.indexOf('@'));
                localStorage.setItem(emailInfo,emailInfoValue)
                localStorage.setItem(displayName,user.displayName);
                localStorage.removeItem(firebaseAuthKey);
                localStorage.setItem("photoURL",user.photoURL);
                localStorage.setItem(appTokenKey, user.uid);

                // store the token
                this.props.history.push("/app/home")
            }
        });
    }

    render() {
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
        if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}


const LoginPage = ({handleGoogleLogin}) => (
  <div >
      <div style={{position:'fixed', top:'25%', left:'30%'}}>
        <Segment circular style={square}>
        <Header as='h2' icon textAlign='center' style={{height:80, marginTop:-5}}>
          <Icon name='users' circular />
            TRELLO
        </Header>
      </Segment>
      </div>
    <div style={{position:'fixed', top:'25%', right:'30%'}}>
      <Segment circular style={square}>
        <h1>Login</h1>
        <div>
          <Button color='google plus' onClick={handleGoogleLogin}>
            <Icon name='google plus' /> Google Plus
          </Button>
        </div>
      </Segment>
    </div>
  </div>
);
const SplashScreen = () => (<p><Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Hang on for a while</Message.Header>
      We are fetching the content for you.
    </Message.Content>
  </Message></p>)
