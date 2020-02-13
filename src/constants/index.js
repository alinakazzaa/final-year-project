import { db } from '../database/config/db';

export const COUNTER_CHANGE = 'COUNTER_CHANGE'
export const TEXT_CHANGE = 'TEXT_CHANGE'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_PROJECTS = 'SET_PROJECTS'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'
export const SET_FETCH_JOBS = 'SET_FETCH_JOBS'
export const SET_CURRENT_FETCH_JOB = 'SET_CURRENT_FETCH_JOB'

export const GET_ALL_INFLUENCERS = 'GET_ALL_INFLUENCERS'
export const SET_CURRENT_INFLUENCER = 'SET_CURRENT_INFLUENCER'
export const GET_ALL_FETCH_JOBS = 'GET_ALL_FETCH_JOBS'


export const DB_USER_REF = db.ref('Users/');
export const DB_USER_PROJECTS_REF = user_id => db.ref(`Users/${user_id}/Projects`);
export const DB_PROJECT_FETCH_JOBS_REF = (user_id, project_id) => db.ref(`Users/${user_id}/Projects/${project_id}/FetchJobs`);
export const DB_PROJECTS_REF = 'Projects'
export const DB_FETCH_JOBS_REF = 'FetchJobs'
export const DB_INFLUENCERS_REF = 'Influencers'

