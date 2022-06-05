import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/global/Layout";
import Notice from "./pages/Notice";
import Branch from "./pages/Branch";
import VideoLec from "./pages/VideoLec";
import Aicte from "./pages/Aicte";
import Mou from "./pages/Mou";
import TeacherAdd from "./pages/TeacherAdd";
import TeacherView from "./pages/TeacherView";
import Slider from "./pages/Slider";
import Gallery from "./pages/Gallery";
import Acal from "./pages/Acal";
import TimeTable from "./pages/TimeTable";
import Result from "./pages/Result";
import Grievance from "./pages/Grievance";
import Rag from "./pages/Rag";
import Alumni from "./pages/Alumni";
import Contact from "./pages/Contact";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  
  const { user } = useSelector((state) => state.login);
  let routes = "";

  useEffect(() => {
    console.log(user);
  });

  if (!user) {
    routes = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    routes = (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          ></Route>
          
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          ></Route>
          
            <Route
          path="/notice"
          element={
            <Layout>
              <Notice />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/branch"
          element={
            <Layout>
              <Branch />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/videolec"
          element={
            <Layout>
              <VideoLec />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/aicte"
          element={
            <Layout>
              <Aicte />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/mou"
          element={
            <Layout>
              <Mou />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/teacheradd"
          element={
            <Layout>
              <TeacherAdd />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/teacherview"
          element={
            <Layout>
              <TeacherView />
            </Layout>
          }
        >
        </Route>

            <Route
          path="/slider"
          element={
            <Layout>
              <Slider />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/gallery"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/acal"
          element={
            <Layout>
              <Acal />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/timetable"
          element={
            <Layout>
              <TimeTable />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/result"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/grievance"
          element={
            <Layout>
              <Grievance />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/rag"
          element={
            <Layout>
              <Rag />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/alumni"
          element={
            <Layout>
              <Alumni />
            </Layout>
          }
        >
        </Route>
           
            <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        >
        </Route>




        </Routes>
      </BrowserRouter>
    );
  }

  return <>
  {routes}
  <div><Toaster/></div>
  </>;
}

export default App;
