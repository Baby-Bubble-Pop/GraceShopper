/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllProductsConnected} from './all-products'
export {SingleProductConnected} from './single-product'
export {default as Cart} from './cart'
export {UserProfile} from './user-profile'
export {default as GuestCart} from './guestCart'
export {EditProfile} from './edit-profile'
export {CheckedOutShipping} from './checkoutShipping'
export {CheckedOutBilling} from './checkoutBilling'
export {CheckedOutConfirmed} from './checkoutConfirm'
export {default as AddProduct} from './add-products'
export {default as OrderConfirmed} from './orderConfirmed'
