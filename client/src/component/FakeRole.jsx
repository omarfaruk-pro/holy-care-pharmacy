

export default function FakeRole({role}) {
  return (
    <div>
        <h1 className="text-2xl font-bold text-center mb-3">You are not <span className="uppercase">{role}</span></h1>
        <img className="w-2/3 mx-auto rounded-lg" src="/images/error-403.jpg" alt="403 Error" />
    </div>
  )
}
