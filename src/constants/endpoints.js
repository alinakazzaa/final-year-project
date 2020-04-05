export const INSTAGRAM_BASE = 'https://www.instagram.com/'
export const INSTAGRAM_GET_MEDIA_BY_HASHTAG = hashtag => `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`
export const INSTAGRAM_MEDIA_BY_SHORTCODE = shortcode => `https://www.instagram.com/p/${shortcode}/?__a=1`
export const INSTAGRAM_GET_USERS_FROM_SHORTCODE = username => `https://www.instagram.com/${username}/?__a=1`
export const INSTAGRAM_GET_NEXT_PAGE_MEDIA = (hashtag, end_cursor) => `https://www.instagram.com/graphql/query/?query_hash=bd33792e9f52a56ae8fa0985521d141d&variables=%7B%22tag_name%22%3A%22${hashtag}%22%2C%22first%22%3A1000%2C%22after%22%3A%22${end_cursor}%22%7D`
export const INSTAGRAM_GET_USER_BY_ID = id => `https://www.instagram.com/graphql/query/?query_hash=e74d51c10ecc0fe6250a295b9bb9db74&variables=%7B%22user_id%22:%22${id}%22,%22include_chaining%22:false,%22include_reel%22:true,%22include_suggested_users%22:false,%22include_logged_out_extras%22:false,%22include_highlight_reels%22:false,%22include_related_profiles%22:false%7D`
export const INSTAGRAM_GET_USER_FOLLOWED_BY = id => `https://www.instagram.com/graphql/query/?query_id=17851374694183129&id=${id}&first=0`
export const INSTAGRAM_GET_USER_MEDIA = id => `https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables=%7B%22id%22:%22${id}%22,%22first%22:15%7D`
export const INSTAGRAM_GET_USER_MEDIA_COUNT = id => `https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables=%7B%22id%22:%22${id}%22,%22first%22:0%7D`

export const INSTAGRAM_GET_USER_BY_USERNAME = username => `https://www.instagram.com/${username}/?__a=1`




