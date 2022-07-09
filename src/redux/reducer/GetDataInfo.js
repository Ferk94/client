
const initialState = {
    coordinators: [],
    coordinatorsByEnterprise: [],
    enterprises: [],
    excursions: [],
    users: [],
    notAcepted: ''
}



function sortById(list, type) {
    let temp = JSON.parse(JSON.stringify(list))
    if (type === "asc") {
        temp.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (b.id > a.id) {
                return -1;
            }
            return 0;
        })
    }
    else if (type === "desc") {
        temp.sort((a, b) => {
            if (a.id > b.id) {
                return -1;
            }
            if (b.id > a.id) {
                return 1;
            }
            return 0;
        })
    }
    return temp;
}



function getDataInfoReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COORDINATORS':
            return {
                ...state,
                coordinators: action.payload
            }
        case 'GET_COORDINATORS_BY_ENTERPRISEID':
            return {
                ...state,
                coordinatorsByEnterprise: action.payload
            }
        case 'POST_COORDINATOR':
            return {
                ...state,
                coordinators: state.coordinators.concat(action.payload)
            }
        case 'DELETE_COORDINATOR':
            return {
                ...state,
                coordinators: state.coordinators.filter(e => e.id !== action.payload)
            }
        case 'GET_ENTERPRISES':
            return {
                ...state,
                enterprises: action.payload
            }
        case 'POST_ENTERPRISE':
            return {
                ...state,
                enterprises: state.enterprises.concat(action.payload)
            }
        case 'DELETE_ENTERPRISE':
            return {
                ...state,
                enterprises: state.enterprises.filter(e => e.id !== action.payload)
            }
        case 'GET_EXCURSIONS_BY_COORDINATOR':
            return {
                ...state,
                excursions: action.payload
            }
        case 'DELETE_EXCURSION':
            return {
                ...state,
                excursions: state.excursions.filter(e => e.id !== action.payload)
            }
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SEARCH_USER':
            return {
                ...state,
                users: state.users.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case 'SEARCH_USER_BY_ENTERPRISE':
            return {
                ...state,
                users: state.users.filter(e => e.enterprise.toLowerCase().includes(action.payload.toLowerCase()))
            }

        case 'SEARCH_USER_BY_COORDINATOR':
            return {
                ...state,
                users: state.users.filter(e => e.coordinator.toLowerCase().includes(action.payload.toLowerCase()))
            }


        case 'ORDER_BY_ID':
            return {
                ...state,
                users: sortById(state.users, action.payload)
            }
        case 'DELETE_USER_BY_ID':
            return {
                ...state,
                users: state.users.filter(e => e.id !== action.payload)
            }
        case 'NOT_ACEPTED':
            return {
                ...state,
                notAcepted: action.payload
            }
        default:
            return state;
    }
}

export default getDataInfoReducer;