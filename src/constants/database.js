import { db } from '../database/config/db';

export const DB_USER_REF = db.ref('Users/');
export const DB_USER_PROJECTS_REF = user_id => db.ref(`Users/${user_id}/Projects`);
export const DB_PROJECT_FETCH_JOBS_REF = (user_id, project_id) => db.ref(`Users/${user_id}/Projects/${project_id}/FetchJobs`);
export const DB_USER_COLLABS_REF = user_id => db.ref(`Users//${user_id}/Collabs`);