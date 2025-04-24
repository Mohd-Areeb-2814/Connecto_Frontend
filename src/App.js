import "./App.css";
import Home from "./Component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import {
 
  Route,
  
  Routes,
} from "react-router-dom";
import NewUser from "./Component/NewUser";
import Login from "./Component/Login";

import Dashboard from "./Component/Dashboard";

// import NewPage from "./Component/NewPage";
import PostList from "./modules/PostModule/PostList";
import CreatePost from "./modules/PostModule/CreatePost";
// import FindFriends from "./modules/PostModule/FindFriends";
// import Feeed from "./modules/PostModule/Feeed";
// import DashboardNavbar from "./modules/PostModule/DashboardNavbar";
import ProfileDetails from "./modules/PostModule/ProfileDetails";
// import FriendsSideBar from "./modules/PostModule/FriendsSideBar";
import FriendsPage from "./modules/PostModule/FriendsPage";
import CreatePostButton from "./modules/PostModule/CreatePostButton";
import ForgotPassword from "./Component/ForgotPassword";
import PrivateRoute from "./Authntication/PrivateRoute";
import PostDetails from "./modules/PostModule/PostDetails";
import UserProfile from "./modules/PostModule/UserProfile";
import ProfileSettings from "./modules/PostModule/ProfileSettings";
import Settings from "./modules/PostModule/Settings";
import ViewPhotos from "./modules/PostModule/ViewPhotos";
import ViewFriends from "./modules/PostModule/ViewFriends";
import ViewAbout from "./modules/PostModule/ViewAbout";
// import AllFriends from "./modules/PostModule/AllFriends";

function App() {
  return (
    <>
      
        <Routes>

          {/* <Route path="/allfriends" element={<AllFriends setActiveTab={setActiveTab}/>} /> */}


        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/profilesettings" element={<ProfileSettings />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/viewphotos" element={<ViewPhotos/>} />
        <Route exact path="/viewfriends" element={<ViewFriends/>} />
        <Route exact path="/viewabout" element={<ViewAbout/>} />


          <Route exact path="/*" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/newuser" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword"   element={<ForgotPassword/>} />
          {/* Public Route */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/feed"
            element={<PrivateRoute element={<PostList />} />}
          />
          <Route
            path="/createpost"
            element={<PrivateRoute element={<CreatePost />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfileDetails />} />}
          />
          <Route
            path="/friendspage"
            element={<PrivateRoute element={<FriendsPage />} />}
          />v
          <Route
            path="/createpostbutton"
            element={<PrivateRoute element={<CreatePostButton />} />}
          />
          <Route
            path="/post/:postId"
            element={<PrivateRoute element={<PostDetails/>} />}
          />
          {/* Private Route */}
          {/* Add more private routes if needed */}
        </Routes>
      

      {/* <NewPage/> */}
      {/* <NewRegistration/> */}

      {/* <Routes>
    

   <Route exact path="/*"   element={<Home/>} />
   <Route exact path="/newuser"   element={<NewUser/>} />
   <Route exact path="/login"   element={<Login/>} />
   <Route exact path="/dashboard"   element={<Dashboard/>} />
   
   </Routes> */}

      {/* <PostList/> */}
      {/* <CreatePost/> */}
      {/* <FindFriends/> */}
      {/* <Routes>
    
  <Route exact path="/*"   element={<Home/>} />
  <Route exact path="/home"   element={<Home/>} />
  <Route exact path="/newuser"   element={<NewUser/>} />
   <Route exact path="/login"   element={<Login/>} />
   <Route exact path="/dashboard"   element={<Dashboard/>} />
    <Route exact path="/feed"   element={<PostList/>} />
    <Route exact path="/createpost"   element={<CreatePost/>} />
    <Route exact path="/profile"   element={<ProfileDetails/>} />
    <Route exact path="/friends"   element={<FindFriends/>} />
    <Route exact path="/friendspage"   element={<FriendsPage/>} />
    <Route exact path="/createpostbutton"   element={<CreatePostButton/>} />
    <Route exact path="/forgotpassword"   element={<ForgotPassword/>} />

    
    </Routes>  */}
      {/* changes made formauthentication on 12-16-2024 */}
      {/* <Router>
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" component={Login} />
          <Route exact path="/newuser" element={<NewUser />} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/feed" element={<PostList />} />
          <PrivateRoute path="/createpost" element={<CreatePost />} />
          <PrivateRoute path="/profile" element={<ProfileDetails />} />
          <PrivateRoute path="/friends" element={<FindFriends />} />
          <PrivateRoute path="/friendspage" element={<FriendsPage />} />
          <PrivateRoute path="/createpostbutton" element={<CreatePostButton />}
        
          <PrivateRoute path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
