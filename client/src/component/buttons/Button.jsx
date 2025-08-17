

export default function Button({children, className: childClass, type="button", onClick} ) {
  return (
    <button type={type} onClick={onClick} className={`bg-primary text-lg font-semibold text-white py-2 px-6 rounded-md hover:bg-blue-700 transition cursor-pointer ${childClass}`}>
      {children}
    </button>
  )
}
