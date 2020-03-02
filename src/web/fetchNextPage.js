// import { INSTAGRAM_GET_NEXT_PAGE_MEDIA } from "../constants/endpoints"
// import { extractInfluencerIDs } from "./fetchMedia"

// export const getNextPage = (end_cursor, user_id, project_id, current_fetch_job, pending, success, error) => {
//     pending()
//     let parsed_end_cursor = end_cursor.replace('==', '%3D%3D')
//     let response

//     fetch(INSTAGRAM_GET_NEXT_PAGE_MEDIA(current_fetch_job.hashtag, parsed_end_cursor))
//         .then(result => {
//             result.json().then(res => {
//                 if (res.status = 'ok') {
//                     response = 'got next page, extracting media'
//                     return success(response, [...extractInfluencerIDs(res)], current_fetch_job)
//                 } else {
//                     response = 'does not have next page'
//                     return error(response, user_id, project_id, current_fetch_job)
//                 }
//             })
//         }).catch(error => {
//             return error(error, user_id, project_id, current_fetch_job)
//         })
// }