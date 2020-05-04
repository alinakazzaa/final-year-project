import { SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, CLEAR_PROJECT_STATE } from '../constants'
import { SET_PROJECTS_PENDING, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR } from '../constants/response/types'

const initialState = {
    all_projects: [],
    current_project: {},
    pending: null,
    error: null
}

const projectReducer = (state = initialState, action) => {
    let all_projects = [...state.all_projects]

    switch (action.type) {

        case SET_PROJECTS_PENDING:

            return {
                ...state,
                error: null,
                pending: true,
                response: null
            }

        case SET_PROJECTS_SUCCESS:

            return {
                ...state,
                all_projects: [...action.projects],
                pending: false
            }

        case SET_PROJECTS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }

        case SET_CURRENT_PROJECT:

            return {
                ...state,
                current_project: action.project,
                pending: false
            }

        case CLEAR_CURRENT_PROJECT:

            return {
                ...state,
                current_project: {}
            }

        case CLEAR_PROJECT_STATE:
            return {
                ...initialState
            }

        case ADD_PROJECT:
            all_projects.splice(all_projects.length, 0, action.project)

            return {
                ...state,
                all_projects
            }
        case UPDATE_PROJECT:
            all_projects.splice(getIndex(all_projects, action.project), 1, action.project)

            return {
                ...state,
                all_projects
            }

        case REMOVE_PROJECT:

            return {
                ...state,
                all_projects: [...state.all_projects.filter(project => project.id != action.project.id)]
            }

        default:
            return state
    }
}

export const activeProjects = state => [...state.all_projects.filter(proj => proj.active == true)]
export const archivedProjects = state => [...state.all_projects.filter(proj => proj.active == false)]
export const getIndex = (projects, project) => projects.map(p => { return p }).indexOf(project.id)

export default projectReducer