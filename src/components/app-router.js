import Dashboard from "./dashboard";
import Login from "./login";
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Student from "./student";
import Employee from "./employee";
import Authentication from "../routes/authentication";
import Authorization from '../routes/authorization';
import PERMISSIONS from "../permissions/permissions";
import { AuthProvider } from "../providers/authprovider";
import Counter from '../redux/counter';

export default function RouterBody(){

  return(<div>
        <Routes>
          <Route path="/" element={
                                  <Login />
                                } />
          <Route path="/dashboard/*" element={<Authentication>
                                                  <Dashboard />
                                              </Authentication>
                                              }>
                <Route path="student" element={<Authentication>
                                                  <Student />
                                              </Authentication>
                                              }></Route>
                <Route path="employee" element={<Authentication>
                                                  <Employee />
                                              </Authentication>
                                              }></Route>
              <Route path="counter-reducer" element={<Authentication>
                                <Counter />
                            </Authentication>
                            }></Route>                              
          </Route>
       </Routes>

  </div>);
}