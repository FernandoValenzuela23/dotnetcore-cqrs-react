import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';

import './custom.css'

import { Customers } from './components/Customer/Customers';
import { Create } from './components/Customer/Create';
import { Edit } from './components/Customer/Edit';
import { Delete } from './components/Customer/Delete';

import { Login } from './components/Auth/Login';
import { Logout } from './components/Auth/Logout';
import Registration from './components/Auth/Registration';
import { Users } from './components/User/Users';
import { UpdateUser } from './components/User/UpdateUser';
import Roles from './components/Role/Roles';
import CreateRole from './components/Role/CreateRole';
import EditRole from './components/Role/EditRole';
import { DeleteRole } from './components/Role/DeleteRole';
import { CreateUser } from './components/User/CreateUser';
import { DeleteUser } from './components/User/DeleteUser';
import UsersRole from './components/UsersRoles/UsersRoles';
import SessionManager from './components/Auth/SessionManager';

import { NavMenu } from './components/NavMenu';

function App() {

  return (
      <BrowserRouter>

        {SessionManager.getToken() != null && (
          <>
            <NavMenu  />
            <Routes>
              <Route exact path='/home' element={<Home />} />

              <Route path='/logout' element={<Logout />} />
              <Route path='/Auth/registration' element={<Registration />} />

              <Route path='/customers' element={<Customers />} />
              <Route path='/customer/create' element={<Create />} />
              <Route path='/customer/edit/:id' element={<Edit />}></Route>
              <Route path='/customer/delete/:id' element={<Delete />}></Route>

              <Route path='/users' element={<Users />}></Route>
              <Route path='/user/edit/:id' element={<UpdateUser />}></Route>
              <Route path='/user/delete/:id' element={<DeleteUser />}></Route>

              <Route path='/roles' element={<Roles />}></Route>
              <Route path='/role/create' element={<CreateRole />}></Route>
              <Route path='/role/edit/:id' element={<EditRole />}></Route>
              <Route path='/role/delete/:id' element={<DeleteRole />}></Route>

              <Route path='/usersroles' element={<UsersRole />}></Route>
              <Route path='/user/create' element={<CreateUser />}></Route>

            </Routes>
          </>
        )}

        {SessionManager.getToken() == null && (
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/user/register' element={<CreateUser />}></Route>
          </Routes>
        )}

      </BrowserRouter>
  );
}

export default App