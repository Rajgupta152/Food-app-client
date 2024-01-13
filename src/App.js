import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useEffect, useState } from "react";
import { Menu } from "./components/Menu";
import Nav from "./components/Nav";
import Cookies from "universal-cookie";
function App() {
  const [data, setData] = useState([]);
  const [isValidate, setIsValidate] = useState('');
  const [tempValidate, setTempValidate] = useState();
  const [currentUser, setCurrentUser] = useState([]);
  const cookie = new Cookies(null, {path: '/'});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('userInfo')))
  },[])

  // add data to database
  const addData = async (values) => {
    setData([...data, values]);
    await fetch("http://localhost:8081/api/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };



  //get data from database
  const getData = async () => {

    await fetch("http://localhost:8081/api/getData")
          .then(res => res.json())
          .then(userData => setData(userData.data))
          .catch(err => console.log(err))
  }
  useEffect(() => {
    getData();
  },[])



  //Login api
  const login = async (credential) => {
  await fetch("http://localhost:8081/api/login",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(credential),
      withCredentials: true
    })
          .then(res => res.json())
          .then(data =>{
            if(data.status){
              console.log(data)
              cookie.set('Token',data.token);
              // setCurrentUser(data.user.name);
              localStorage.setItem("userInfo",JSON.stringify(data.user))
              alert(`${data.user.name} logged in`);
              setTempValidate(true);
            }
            else{
              alert(data.message);
              setTempValidate(false);
            }
            // console.log(data)
          })
          .catch(err => console.log(err))
  }

  //login success
  const loginSuccess =  (value) => {
    setTempValidate(value) 
    }

  //login validation api's

  const getLoginValidation = async() => {
    await fetch("http://localhost:8081/api/getLoginValidation")
          .then(res => res.json())
          .then(data => {
            console.log(data.data[0].isValidate);
            setIsValidate(data.data[0].isValidate);
          })
          .catch(err => console.log(err))
  }
  getLoginValidation();

  //post api
  const updateLoginValidation = async() => {
    await fetch("http://localhost:8081/api/updateValidation",{
      method : "PUT",
      body : JSON.stringify({isValidate: tempValidate}),
      headers : {
        "Content-Type" : "application/json"
      }
    })
          .then(res => res.json())
          .then(data => {
            if (data.data) {
              console.log(data.data.isValidate);
              setIsValidate(data.data.isValidate);
          } else {
              console.error("Invalid response format:", data.data.isValidate);
          }
          })
          .catch(err => console.log(err)) 
  }

  updateLoginValidation();

  // console.log(data);
  console.log("app.js",isValidate);
  console.log("cookie",cookie);
  console.log("app.js",currentUser)

  return (
    <div className="App">
        <Nav isValidate = {isValidate} loginSuccess = {loginSuccess} currentUser = {currentUser}/>
        <Routes>
          <Route path="/Login" element={<Login login = {login} isValidate = {isValidate} loginSuccess = {loginSuccess}/>}></Route>
          <Route
            path="/Register"
            element={<Register addData={addData} />}
          ></Route>
          <Route path="/Menu" element={<Menu isValidate = {isValidate} loginSuccess = {loginSuccess}/>}></Route>
          <Route path="/" element={<Home isValidate = {isValidate} loginSuccess = {loginSuccess} currentUser = {currentUser}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
