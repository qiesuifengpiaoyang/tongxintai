
// let host = process.env.NODE_ENV === 'development' ? 'www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58' : `${window.location.host}`;
// let protocol = process.env.NODE_ENV === 'development' ? 'https:' : `${window.location.protocol}`;

// export const staticDomain = `${window.location.protocol}//${host}`

// let locality = process.env.NODE_ENV === 'development' ? '' : `${protocol}//${host}/api`
// export const apiDomain = `${locality}`











let host = process.env.NODE_ENV === 'development' ? 'www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58' : `${window.location.host}`;
let protocol = process.env.NODE_ENV === 'development' ? 'https:' : `${window.location.protocol}`;

export const apiDomain = `${protocol}//${host}/api`;






















// let host = process.env.NODE_ENV === 'development' ? 'www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58' : `${window.location.host}`;
// // let protocol = process.env.NODE_ENV === 'development' ? '' : `${window.location.protocol}`;




// export const apiDomain = `${window.location.protocol}//${window.location.host}/api`;

// export const staticDomain = `${window.location.protocol}//${host}`
