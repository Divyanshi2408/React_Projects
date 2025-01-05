import (ShoppingCartIcon , XIcon) from 'lucide-react'

const Shoppingcart = () => {
  return (
    <>
    <div className='w-[300px] h-screen bg-gray-200 fixed right-0 top-0
    z-30 border-l-4 rounded-tl-lg'>
    <div className='w-full h-16 bg-white absolute left-0 top-0 z-10
    grid place-items-center border rounded-lg'>
    <h1 className='text-xl teaxt-gray-600'>Shopping cart</h1>
    <button className='w-9 h-9 bg-yellow-400 absolute right-3 z-20
    grid place-items-center border-2 rounded-full'></button>
    </div></div>
    </>
  )
}

export default Shoppingcart