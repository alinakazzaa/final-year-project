import { db } from '../database/config/db';

export const USER_LOGOUT = 'USER_LOGOUT'

export const UPDATE_STATE_PROJECTS = 'UPDATE_STATE_PROJECTS'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'
export const CLEAR_CURRENT_PROJECT = 'CLEAR_CURRENT_PROJECT'

export const GET_ALL_FETCH_JOBS = 'GET_ALL_FETCH_JOBS'
export const SET_CURRENT_FETCH_JOB = 'SET_CURRENT_FETCH_JOB'
export const SET_RUNNING_FETCH = 'SET_RUNNING_FETCH'
export const CLEAR_RUNNING_FETCH = 'CLEAR_RUNNING_FETCH'

export const ADD_FETCH_JOB = 'ADD_FETCH_JOB'
export const UPDATE_FETCH_JOB_STATUS = 'UPDATE_FETCH_JOB_STATUS'
export const REMOVE_FETCH_JOB = 'REMOVE_FETCH_JOB'
export const UPDATE_FETCH_JOB = 'UPDATE_FETCH_JOB'

export const CLEAR_CURRENT_FETCH_JOB = 'CLEAR_CURRENT_FETCH_JOB'

export const SET_CURRENT_INFLUENCER = 'SET_CURRENT_INFLUENCER'

export const DB_USER_REF = db.ref('Users/');
export const DB_USER_PROJECTS_REF = user_id => db.ref(`Users/${user_id}/Projects`);
export const DB_PROJECT_FETCH_JOBS_REF = (user_id, project_id) => db.ref(`Users/${user_id}/Projects/${project_id}/FetchJobs`);
export const DB_USER_COLLABS_REF = user_id => db.ref(`Users//${user_id}/Collabs`);

export const DB_FETCH_JOBS_REF = 'FETCHJOBS'
export const DB_INFLUENCERS_REF = 'INFLUENCERS'

export const CLEAR_CURRENT_COLLAB = 'CLEAR_CURRENT_COLLAB'
export const SET_CURRENT_COLLAB = 'SET_CURRENT_COLLAB'
export const ADD_COLLAB = 'ADD_COLLAB'
export const UPDATE_COLLAB = 'UPDATE_COLLAB'
export const REMOVE_COLLAB = 'REMOVE_COLLAB'

export const SET_COLLABS_PENDING = 'SET_COLLABS_PENDING'
export const SET_COLLABS_SUCCESS = 'SET_COLLABS_SUCCESS'
export const SET_COLLABS_ERROR = 'SET_COLLABS_ERROR'

// FETCH STAGES
export const MEDIA_FETCH = 'MEDIA_FETCH'
export const USER_FETCH = 'USER_FETCH'
export const MEDIA_NEXT_PAGE = 'MEDIA_NEXT_PAGE'

// FETCH JOB STATUS
export const PENDING = 'PENDING'
export const IN_PROGRESS = 'IN_PROGRESS'
export const COMPLETED = 'COMPLETED'


export const SET_CURRENT_PAGE_MEDIA_IDS = 'SET_CURRENT_PAGE_MEDIA_IDS'
export const GET_MEDIA_IDS = 'GET_MEDIA_IDS'

export const CLEAR_FETCH_JOB_STATE = 'CLEAR_FETCH_JOB_STATE'

