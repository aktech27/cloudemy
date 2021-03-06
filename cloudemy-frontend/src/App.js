import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userType";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import VerifyAccount from "./pages/verifyAccount";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import Dashboard from "./pages/dashboard";
import EditProfile from "./pages/editProfile";
import CreateRoom from "./pages/createRoom";
import CreateShelf from "./pages/createShelf";
import RoomView from "./pages/roomView";
import ShelfView from "./pages/shelfView";
import JoinRoom from "./pages/joinRoom";
import Error404 from "./pages/error404";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={localStorage.getItem("Token") ? Dashboard : Signin} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/verify/:accountToken" component={VerifyAccount} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/reset" component={ResetPassword} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/createroom" component={CreateRoom} />
          <Route path="/:roomCode/createshelf" component={CreateShelf} />
          <Route path="/join" component={JoinRoom} />
          <Route exact path="/room/:roomCode" component={RoomView} />
          <Route exact path="/shelf/:shelfCode" component={ShelfView} />
          <Route component={Error404} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
