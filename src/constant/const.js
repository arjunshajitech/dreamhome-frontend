

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
const ADMIN_GET_FAQ = BASE_URL + '/admin/faq'
const ADMIN_GET_FEEDBACK = BASE_URL + '/admin/feedback'
const ADMIN_GET_ALL_PAYMENT = BASE_URL + '/admin/payment-history'
const ADMIN_DOWNLOAD_RECIEPT = BASE_URL + '/admin/download/pdf'

const CLIENT_REGISTER = BASE_URL + "/client/signup"
const CLIENT_LOGIN = BASE_URL + "/client/login"
const CLIENT_LOGOUT = BASE_URL + '/client/logout'
const CLIENT_CREATE_PROJECT = BASE_URL + '/client/project'
const CLIENT_GET_PROJECT = BASE_URL + '/client/project'
const CLIENT_DELETE_PROJECT = BASE_URL + '/client/project'
const CLIENT_PROFILE_URL = BASE_URL + '/client/profile'
const CLIENT_PAY_MODEL = BASE_URL + '/client/pay/model'
const CLIENT_PAY_PLAN = BASE_URL + '/client/pay/plan'
const CLIENT_ALL_PLAN_IMAGES = BASE_URL + '/client/plan/image/all'
const CLIENT_ALL_MODEL_IMAGES = BASE_URL + '/client/model/image/all'
const CLIENT_DOWNLOAD_PLAN = BASE_URL + '/client/download/plan'
const CLIENT_DOWNLOAD_MODEL = BASE_URL + '/client/download/model'
const CLIENT_PLAN_APPROVE = BASE_URL + '/client/plan/approve-reject'
const CLIENT_MODEL_APPROVE = BASE_URL + '/client/model/approve-reject'
const CLIENT_POST_FAQ = BASE_URL + '/client/faq'
const CLIENT_POST_FEEDBACK = BASE_URL + '/client/feedback'

const ENGINEER_LOGIN = BASE_URL + '/engineer/login'
const ENGINEER_SIGNUP = BASE_URL + '/engineer/signup'
const ENGINEER_LOGOUT = BASE_URL + '/engineer/logout'
const ENGINEER_ACTIVE = BASE_URL + '/engineer/active'
const ENGINEER_PROFILE = BASE_URL + '/engineer/profile'
const ENGINEER_JOBS = BASE_URL + '/engineer/jobs'
const ENGINEER_UPDATE_PROJECT = BASE_URL + '/engineer/project'
const ENGINEER_UPLOAD_IMAGE = BASE_URL + '/engineer/plan'
const ENGINEER_UPLOAD_MODEL = BASE_URL + '/engineer/model'
const ENGINEER_ALL_PLAN_IMAGES = BASE_URL + '/engineer/plan/image/all'
const ENGINEER_ALL_MODEL_IMAGES = BASE_URL + '/engineer/model/image/all'
const ENGINEER_DELETE_PLAN_IMAGE = BASE_URL + '/engineer/plan'
const ENGINEER_DELETE_MODEL_IMAGE = BASE_URL + '/engineer/model'
const ENGINEER_DOWNLOAD_PLAN = BASE_URL + '/engineer/download/plan'
const ENGINEER_DOWNLOAD_MODEL = BASE_URL + '/engineer/download/model'
const ENGINEER_DOWNLOAD_RECIEPT = BASE_URL + '/engineer/download/pdf'


export default {
    ENGINEER_DOWNLOAD_RECIEPT,
    ADMIN_DOWNLOAD_RECIEPT,
    ADMIN_GET_ALL_PAYMENT,
    CLIENT_POST_FEEDBACK,
    ADMIN_GET_FEEDBACK,
    CLIENT_POST_FAQ,
    ADMIN_GET_FAQ,
    ENGINEER_ACTIVE,
    ENGINEER_DOWNLOAD_MODEL,
    ENGINEER_DOWNLOAD_PLAN,
    CLIENT_PLAN_APPROVE,
    CLIENT_MODEL_APPROVE,
    BASE_URL,
    CLIENT_DOWNLOAD_MODEL,
    CLIENT_DOWNLOAD_PLAN,
    CLIENT_ALL_MODEL_IMAGES,
    CLIENT_ALL_PLAN_IMAGES,
    ENGINEER_DELETE_PLAN_IMAGE,
    ENGINEER_DELETE_MODEL_IMAGE,
    ENGINEER_ALL_MODEL_IMAGES,
    ENGINEER_ALL_PLAN_IMAGES,
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
    ENGINEER_JOBS,
    ENGINEER_UPDATE_PROJECT,
    CLIENT_PAY_MODEL,
    CLIENT_PAY_PLAN,
    ENGINEER_UPLOAD_IMAGE,
    ENGINEER_UPLOAD_MODEL
};