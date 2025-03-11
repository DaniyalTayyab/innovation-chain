import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    OPEN_MODAL_ADD_MEMBER,
	  CLOSE_MODAL_ADD_MEMBER,
	  OPEN_MODAL_BOOK_PLACES,
	  CLOSE_MODAL_BOOK_PLACES,
    OPEN_MODAL_DEPOSIT,
	  CLOSE_MODAL_DEPOSIT,
	  OPEN_MODAL_WITHDRAWAL,
	  CLOSE_MODAL_WITHDRAWAL,
    OPEN_MODAL_ASSIGN_POSITION,
	  CLOSE_MODAL_ASSIGN_POSITION,
    OPEN_MODAL_PAYMENT,
	  CLOSE_MODAL_PAYMENT,
    SET_USER_MOBILE,



    SELECTED_PLAN,
    SET_SECTION,
    SET_LEVEL,
    SET_CURRENT_USER,
    SET_ADDRESS,
    OPEN_MODAL_REQUEST,
    CLOSE_MODAL_REQUEST,
    OPEN_MODAL_PRIVATE,
    CLOSE_MODAL_PRIVATE,
    SET_REWARDS_TYPE,
    OPEN_MODAL_USER,
	  CLOSE_MODAL_USER,
    SET_USER_DETAILS,
    OPEN_MODAL_USER_MEMBER,
	  CLOSE_MODAL_USER_MEMBER,
    SET_USER_MEMBERS
  } from '../utils/actions'
  
  const main_reducer = (state : any , action : any) => {
  
    switch (action.type) {
      case SIDEBAR_OPEN:
        return {...state, isSidebarOpen :true}
      case SIDEBAR_CLOSE:
        return { ...state, isSidebarOpen: false }
      case OPEN_MODAL_ADD_MEMBER:
        return { ...state, isAddMemberModalOpen: true }
      case CLOSE_MODAL_ADD_MEMBER:
        return { ...state, isAddMemberModalOpen: false }
      case OPEN_MODAL_BOOK_PLACES:  
        return { ...state, isBookPlacesModalOpen: true }
      case CLOSE_MODAL_BOOK_PLACES:  
        return { ...state, isBookPlacesModalOpen: false }
      case OPEN_MODAL_DEPOSIT:    
        return { ...state, isDepositModalOpen: true }
      case CLOSE_MODAL_DEPOSIT:
        return { ...state, isDepositModalOpen: false }
      case OPEN_MODAL_WITHDRAWAL:
        return { ...state, isWithdrawalModalOpen: true }  
      case CLOSE_MODAL_WITHDRAWAL:
        return { ...state, isWithdrawalModalOpen: false }  
      case OPEN_MODAL_ASSIGN_POSITION :
        return { ...state, isAssignPositionModalOpen: true }
      case CLOSE_MODAL_ASSIGN_POSITION:
        return { ...state, isAssignPositionModalOpen: false }
      case OPEN_MODAL_PAYMENT:
        return {...state, isPaymentModalOpen : true} 
      case CLOSE_MODAL_PAYMENT:
        return {...state, isPaymentModalOpen : false}     
      case SET_USER_MOBILE:
        return { ...state, MobileUser: action.payload }  


      case SELECTED_PLAN:
        return {...state , selectedPlan : action.payload}  

      case SET_SECTION :  
      return {...state , currentSection : action.payload} 
      case SET_REWARDS_TYPE :  
      return {...state , currentRewardsType : action.payload}  
      case SET_LEVEL :  
      return {...state , currentLevel : action.payload}
      case SET_CURRENT_USER:
        return {...state , currentUser : action.payload}

      case OPEN_MODAL_REQUEST:
        return {...state , isRequestModalOpen : true , currentWithdrawal: action.payload} 
          
      case CLOSE_MODAL_REQUEST:
      return {...state , isRequestModalOpen : false} 

      case OPEN_MODAL_PRIVATE :
        return {...state , isPrivateModalOpen : true} 
      case CLOSE_MODAL_PRIVATE :
        return {...state , isPrivateModalOpen : false}  
        
      case OPEN_MODAL_USER :
        return {...state , isUserModalOpen : true} 
      case CLOSE_MODAL_USER :
        return {...state , isUserModalOpen : false} 
        
      case SET_USER_DETAILS:
        return {...state , userDetails : action.payload} 
        
      case OPEN_MODAL_USER_MEMBER :
        return {...state , isUserMembersModalOpen : true} 
      case CLOSE_MODAL_USER_MEMBER :
        return {...state , isUserMembersModalOpen : false}  
        
      case SET_USER_MEMBERS:
        return {...state , userMembers : action.payload}   

      default:
        return state
      //throw new Error(`No Matching "${action.type}" - action type`)
    }
  }
  
  export default main_reducer