import axios from 'axios';
//import jwt_decode from 'jwt-decode';

//axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/ats/api" : "http://65.0.203.0/ats/api";
//axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/ats/api" : "http://13.232.206.231/ats/api";

axios.defaults.baseURL = "http://localhost:3002/ats/api";
/** Make API Requests */
const token = localStorage.getItem("authToken");

export async function CustomPostApi(url, object, contentType) {
    let data = null;
    let error = null;
    try {
        const resp = await axios.post(url, object, {
            headers: {
                Authorization: token, // Include the token in the request header
                'Content-Type': contentType || 'application/json',

            }
        });
        if (resp.status === 200 || resp.status === 201) {
            data = resp?.data;
        } else if (resp.status === 404) {
            error = error.response.data.msg || "NOT FOUND!";
        } else if (resp.status === 417) {
            error = error.response.data.msg || "Expectation Process Failed!";
        } else if (resp.status === 422) {
            error = error.response.data.msg || "Unprocessable Entity, Please try again!";
        } else if (resp.status === 500) {
            error = error.response.data.msg || "Internal Error, Contact Your Admin";
        } else {
            error = error.response.data.msg || "Something Went Wrong";
        }
        return { data, error }
    } catch (err) {
        error = err?.response?.data?.msg || err?.response?.data[0].msg || err?.message || err || "Something Went Wrong";
    } finally {
        return { data, error }
    }
}
export async function CustomGetApi(url) {

    let data = null;
    let error = null;
    try {
        const resp = await axios.get(url, {
            headers: {
                Authorization: token
            }
        });
        if (resp.status === 200) {
            data = resp?.data;
        } else if (resp.status === 404) {
            error = error.response.data.msg || "NOT FOUND!";
        } else if (resp.status === 417) {
            error = error.response.data.msg || "Expectation Process Failed!";
        } else if (resp.status === 422) {
            error = error.response.data.msg || "Unprocessable Entity, Please try again!";
        } else if (resp.status === 500) {
            error = error.response.data.msg || "Internal Error, Contact Your Admin";
        } else {
            error = error.response.data.msg || "Something Went Wrong";
        }
        return { data, error }
    } catch (err) {
        error = err?.response?.data?.msg || err?.response?.data[0].msg || err?.message || err || "Something Went Wrong";
    } finally {
        return { data, error }
    }
}
