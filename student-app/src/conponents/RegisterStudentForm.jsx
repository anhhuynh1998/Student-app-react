import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios";

const registerSchema = yup.object({
    name: yup.string()
        .required("nhập  họ và tên vào bạn ơi!!"),
    age: yup.number()
        .required("nhập tuổi vào bạn ơi!!!")
        .positive()
        .typeError(),
        mark: yup.mixed()
        .required()
        .test("valid-mark", "Invalid Mark", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) && /^\d+(\.\d{1})?$/.test(value);
        }),
    gender: yup.string()
        .required("chọn 1 trong 2"),
    city: yup.string()
        .required("nhập thành phố vào bạn ơi")

})

const RegisterStudentForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const handleSubmitForm = async (data) => {
        const response = await axios.post('https://js-post-api.herokuapp.com/api/students',data)
        console.log(response.data);
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-6 rounded">
                <h3 className="fw-boder text-center mt-5">Register Student Form</h3>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="form-group mb-3">
                        <label className="lable-form">Name</label>
                        <input type="text" className="form-control" {...register("name")} />
                        <span className="text-danger">{errors?.name?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Age</label>
                        <input type="number" className="form-control" {...register("age")} />
                        <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Mark</label>
                        <input type="number" className="form-control" {...register("mark")} />
                        <span className="text-danger">{errors?.mark?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Gender</label>
                        <select name="gender" className="form-select" {...register("gender")}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                        <span className="text-danger">{errors?.select?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">City</label>
                        <input type="text" className="form-control" {...register("city")} />
                        <span className="text-danger">{errors?.city?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-sm btn-success me-3">Register</button>
                        <button type="button" className="btn btn-sm btn-dark"
                            onClick={() => reset()}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterStudentForm;