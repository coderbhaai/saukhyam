const base = '/api/'
// const base = '//api/'

export default {
    register: base+'register',
    login: base+'login',
    logout: base+'logout',

    adminUsers : base+'adminUsers',
    adminBasics: base+'adminBasics',
    addBasic: base+'addBasic',
    updateBasic: base+'updateBasic',
    adminAttendance: base+'adminAttendance',
    adminGarbage: base+'adminGarbage',
    getExport:  base+'getExport'
}