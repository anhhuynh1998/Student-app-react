import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup"
import axios from "axios";
const DisplayingErrorMessagesSchema = yup.object().shape({
    name: yup.string()
        .required("nhập  họ và tên vào bạn ơi!!"),
    age: yup.number()
        .required("nhập tuổi vào bạn ơi!!!")
        .positive()
        .typeError(),
    mark: yup.string()
        .required("nhập điểm vào bạn ơi!!!")
        .test("is-number", "Nhập một số từ 1 đến 10 bạn ơi", (value) => {
            const parsedValue = parseFloat(value.replace(',', '.'));
            return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10;
        }),
    gender: yup.string()
        .required("chọn 1 trong 2"),
    city: yup.string()
        .required("nhập thành phố vào bạn ơi")
});

const FormikRegisterForm = () => (
    <div>
        <h3>Register Student Form</h3>
        <Formik
            initialValues={{
                name: "",
                age: "",
                mark: "",
                gender: "",
                city: ""
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async values => {
                const response = await axios.post('https://js-post-api.herokuapp.com/api/students',values)
                console.log(response.values);
              }}
            
        >
            {({ errors, touched }) => (
                <Form >
                    <label htmlFor="name">Name</label>
                    <Field
                        name="name"
                        type="text"
                        placeholder="Nhập tên"
                    />
                    {touched.name && errors.name && <div>{errors.name}</div>}
                    <label htmlFor="name">Age</label>
                    <Field
                        name="age"
                        type="number"
                        placeholder="Nhập tuổi" />
                    {touched.age && errors.age && <div>{errors.age}</div>}
                    <label htmlFor="name">Mark</label>
                    <Field
                        name="mark"
                        type="number"
                        placeholder="Nhập điểm"
                    />
                    {touched.mark && errors.mark && <div>{errors.mark}</div>}
                    <label htmlFor="name">Gender</label>
                    <Field
                        name="gender"
                        type="text"
                        placeholder="Nhập giới tính"
                    />
                    {touched.gender && errors.gender && <div>{errors.gender}</div>}
                    <label htmlFor="name">City</label>
                    <Field
                        name="city"
                        type="text"
                        placeholder="Nhập thành phố"
                    />
                    {touched.city && errors.city && <div>{errors.city}</div>}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);
export default FormikRegisterForm;