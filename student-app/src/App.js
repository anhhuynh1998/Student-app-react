
import './App.css';
import React from 'react';
import UseEffect from './conponents/UseEffect';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RegisterStudentForm from './conponents/RegisterStudentForm';
import FormikRegisterForm from './conponents/FormikRegisterForm';
function App() {
  return (
    <div>
      <UseEffect />
      <RegisterStudentForm />
      <FormikRegisterForm />
      
    </div>
  );
}

export default App;