import { useContext } from 'react'
import CartContext from '../context/cart/CartContext'

export default function useCart() {
    const cartInfo = useContext(CartContext)
    return cartInfo;
}
