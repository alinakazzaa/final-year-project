import { db } from '../database/config/db';

export const COUNTER_CHANGE = 'COUNTER_CHANGE'
export const TEXT_CHANGE = 'TEXT_CHANGE'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_USER_PROJECTS = 'SET_USER_PROJECTS'

export const DB_USER_REF = db.ref('Users/');
export const DB_PROJECTS_REF = 'Projects'
export const DB_FETCH_JOBS_REF = 'FetchJobs'
export const DB_INFLUENCERS_REF = 'Influencers'
