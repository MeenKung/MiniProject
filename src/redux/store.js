import { createStore, combineReducers} from "../../node_modules/redux";


export const searchPostReducer = (search = '', action) => {
    switch (action.type) {
        case 'SEARCH_CHANGE':
            return action.search
        case 'SEARCH_CLEAR':
            return ''  
        default:
            return search
    }
}

const initialShowStatus = {
    showForm: false,
    showLoginForm: false,
    showBuyForm: false,
    showBills: false
}
export const showStatusReducer = (data = initialShowStatus, action) => {
    switch (action.type) {
        case 'SHOWFORM':
            return { ...data, showForm: true }
        case 'SHOWLOGINFORM':
            return { ...data, showLoginForm: true }
        case 'SHOWBUYFORM':
            return { ...data, showBuyForm: true }
        case 'SHOWBILLS':
            return { ...data, showBills: true }
        case 'NOT_SHOWFORM':
            return { ...data, showForm: false }
        case 'NOT_SHOWLOGINFORM':
            return { ...data, showLoginForm: false }
        case 'NOT_SHOWBUYFORM':
            return { ...data, showBuyForm: false }
        case 'NOT_SHOWBILLS':
            return { ...data, showBills: false }
        case 'TOGGLE_SHOWBILLS':
            return { ...data, showBills: !data.showBills }
        default:
            return data
    }
}
const initialForm = {
    title: '',
    image: '',
    content: '',
    price: 0,
    stock: 0
}
export const formReducer = (data = initialForm, action) => {
    switch (action.type) {
        case 'TITLE_CHANGE':
            return { ...data, title: action.title }
        case 'IMAGE_CHANGE':
            return { ...data, image: action.image }
        case 'CONTENT_CHANGE':
            return { ...data, content: action.content }
        case 'PRICE_CHANGE':
            return { ...data, price: action.price }
        case 'STOCK_CHANGE':
            return { ...data, stock: action.stock }
        case 'FORM_CLEAR':
            return initialForm
        default:
            return data
    }
}
export const imageAsFileReducer = (imageAsFile = '', action) => {
    switch (action.type) {
        case 'FILEIMAGE_CHANGE':
            return action.imageAsFile
        case 'FILEIMAGE_CLEAR':
            return ''  
        default:
            return imageAsFile
    }
}
export const buyInfoReducer = (buyInfo = [], action) => {
    switch (action.type) {
        case 'BUYINFO_CHANGE':
            return action.buyInfo
        case 'BUYINFO_CLEAR':
            return []  
        default:
            return buyInfo
    }
}
const initialBuyerForm = {
    buyer: '',
    address: '',
    postNO: 0
}
export const buyerFormReducer = (data = initialBuyerForm, action) => {
    switch (action.type) {
        case 'BUYER_CHANGE':
            return { ...data, buyer: action.buyer }
        case 'ADDRESS_CHANGE':
            return { ...data, address: action.address }
        case 'POSTNO_CHANGE':
            return { ...data, postNO: action.postNO }
        case 'BUYERFORM_CLEAR':
            return initialBuyerForm
        default:
            return data
    }
}
export const postToBuyReducer = (postToBuy=[], action) => {
    switch (action.type) {
        case 'POSTTOBUY_CHANGE':
            return action.postToBuy
        case 'POSTTOBUY_CLEAR':
            return []
        default:
            return postToBuy
    }
}
const reducers = combineReducers({
    searchPost: searchPostReducer,
    showStatus: showStatusReducer,
    form: formReducer,
    imageAsFile: imageAsFileReducer,
    buyInfo:buyInfoReducer,
    buyerForm:buyerFormReducer,
    postToBuy:postToBuyReducer
})
export const store = createStore(reducers);