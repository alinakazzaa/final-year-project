import { SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from '../constants'
import { SET_PROJECTS_PENDING, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR } from '../constants/response/types'

const initialState = {
    projects: [],
    current_project: {},
    pending: null,
    error: null
}

const projectReducer = (state = initialState, action) => {
    let projects
    switch (action.type) {

        case SET_PROJECTS_PENDING:

            return {
                ...state,
                pending: true
            }

        case SET_PROJECTS_SUCCESS:

            return {
                ...state,
                projects: action.projects,
                pending: false
            }

        case SET_PROJECTS_ERROR:

            return {
                ...state,
                pending: false,
                error: action.error
            }

        case SET_CURRENT_PROJECT:

            return {
                ...state,
                current_project: action.payload,
                pending: false
            }

        case CLEAR_CURRENT_PROJECT:

            return {
                ...state,
                current_project: {}
            }

        case ADD_PROJECT:
            projects = [...state.projects]
            projects.splice(projects.length, 1, action.project)
            console.log(projects)
            return {
                ...state,
                projects: projects
            }
        case UPDATE_PROJECT:
            projects = [...state.projects]
            let index = projects.findIndex(proj => proj.id == action.payload.id)
            projects.splice(index, 1, action.payload)

            return {
                ...state,
                projects: projects

            }

        case REMOVE_PROJECT:

            return {
                ...state,
                projects: [...state.projects.filter(project => project.id !== action.payload.id)]
            }

        default:
            return state
    }
}

export const activeProjects = state => [...state.project.projects.filter(proj => proj.active == true)]
export const archivedProjects = state => [...state.project.projects.filter(proj => proj.active == false)]

export default projectReducer