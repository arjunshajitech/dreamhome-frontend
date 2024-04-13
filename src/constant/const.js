

const BASE_URL = "http://localhost:3000/api/v1";
const FRONT_END_BASE_URL = "http://localhost:5173"


const ADMIN_GET_PROFILE = BASE_URL + "/admin/profile";
const ADMIN_LOGIN = BASE_URL + '/admin/login'
const ADMIN_LOGOUT = BASE_URL + '/admin/logout'
const ADMIN_GET_ALL_CLIETNS = BASE_URL + '/admin/clients'
const ADMIN_APPROVE_CLIENT = BASE_URL + '/admin/approve/client'
const ADMIN_GET_ALL_ENGINEERS = BASE_URL + '/admin/engineers'
const ADMIN_APPROVE_ENGINEER = BASE_URL + '/admin/approve/engineer'
const ADMIN_GET_JOBS = BASE_URL + '/admin/jobs'
const ADMIN_APPROVED_ENGINEERS = BASE_URL + '/admin/engineers/approved'
const ADMIN_ASSIGN_ENGINEER = BASE_URL + '/admin/assign'


const CLIENT_REGISTER = BASE_URL + "/client/signup"
const CLIENT_LOGIN = BASE_URL + "/client/login"
const CLIENT_LOGOUT = BASE_URL + '/client/logout'
const CLIENT_CREATE_PROJECT = BASE_URL + '/client/project'
const CLIENT_GET_PROJECT = BASE_URL + '/client/project'
const CLIENT_DELETE_PROJECT = BASE_URL + '/client/project'
const CLIENT_PROFILE_URL = BASE_URL + '/client/profile'

const ENGINEER_LOGIN = BASE_URL + '/engineer/login'
const ENGINEER_SIGNUP = BASE_URL + '/engineer/signup'
const ENGINEER_LOGOUT = BASE_URL + '/engineer/logout'
const ENGINEER_PROFILE = BASE_URL + '/engineer/profile'
const ENGINEER_JOBS = BASE_URL + '/engineer/jobs'


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
    CLIENT_DELETE_PROJECT,
    CLIENT_PROFILE_URL,
    ENGINEER_LOGIN,
    ENGINEER_LOGOUT,
    ENGINEER_PROFILE,
    ENGINEER_SIGNUP,
    ADMIN_GET_ALL_ENGINEERS,
    ADMIN_APPROVE_ENGINEER,
    ADMIN_GET_JOBS,
    ADMIN_APPROVED_ENGINEERS,
    ADMIN_ASSIGN_ENGINEER,
    ENGINEER_JOBS
};