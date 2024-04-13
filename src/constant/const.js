

const BASE_URL = "http://localhost:3000/api/v1";
const FRONT_END_BASE_URL = "http://localhost:5173"


const ADMIN_GET_PROFILE = BASE_URL + "/admin/profile";
const ADMIN_LOGIN = BASE_URL + '/admin/login'
const ADMIN_LOGOUT = BASE_URL + '/admin/logout'
const ADMIN_GET_ALL_CLIETNS = BASE_URL + '/admin/clients'
const ADMIN_APPROVE_CLIENT = BASE_URL + '/admin/approve/client'


const CLIENT_REGISTER = BASE_URL + "/client/signup"
const CLIENT_LOGIN = BASE_URL + "/client/login"
const CLIENT_LOGOUT = BASE_URL + '/client/logout'
const CLIENT_CREATE_PROJECT = BASE_URL + '/client/project'
const CLIENT_GET_PROJECT = BASE_URL + '/client/project'
const CLIENT_DELETE_PROJECT = BASE_URL + '/client/project'


export default {
    FRONT_END_BASE_URL,
    ADMIN_GET_PROFILE,
    ADMIN_LOGIN,
    ADMIN_LOGOUT,
    CLIENT_REGISTER,
    CLIENT_LOGIN,
    ADMIN_GET_ALL_CLIETNS,
    ADMIN_APPROVE_CLIENT,
    CLIENT_LOGOUT,
    CLIENT_CREATE_PROJECT,
    CLIENT_GET_PROJECT,
    CLIENT_DELETE_PROJECT
};