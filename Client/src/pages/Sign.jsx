import Astro from "../../public/svg/Astronaut.svg"
function Sign() {
  return (
    <div className="flex relative flex-col justify-center items-end pl-16 mt-24 bg-zinc-950 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
          <div className="flex flex-col items-stretch w-[44%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-stretch self-stretch my-auto text-2xl font-medium text-slate-300 max-md:mt-10 max-md:max-w-full">
              <div className="self-center text-3xl font-bold">Sign up</div>
              <div className="self-start mt-16 ml-6 max-md:mt-10 max-md:ml-2.5">
                Name
              </div>
              <div className="shrink-0 mt-3.5 h-px bg-slate-300 max-md:max-w-full" />
              <div className="self-start mt-11 ml-6 max-md:mt-10 max-md:ml-2.5">
                Email
              </div>
              <div className="shrink-0 mt-3.5 h-px bg-slate-300 max-md:max-w-full" />
              <div className="self-start mt-12 ml-6 max-md:mt-10 max-md:ml-2.5">
                Password
              </div>
              <div className="shrink-0 mt-3.5 h-px bg-slate-300 max-md:max-w-full" />
              <div className="self-start mt-11 ml-6 max-md:mt-10 max-md:ml-2.5">
                Confirm Password
              </div>
              <div className="shrink-0 mt-3.5 h-px bg-slate-300 max-md:max-w-full" />
              <div className="self-center mt-16 text-base max-md:mt-10">
                Already Signed up?
              </div>
              <div className="self-center mt-5 text-xl font-bold text-violet-700">
                Login
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-stretch px-16 py-12 w-full bg-zinc-950 rounded-[319px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col items-start px-11 pt-5 pb-8 mx-2.5 mt-5 rounded-full border-2 border-white border-solid bg-stone-300 bg-opacity-0 max-md:px-5 max-md:max-w-full">
                <img
                  loading="lazy"
                  src = {Astro}
                  className="object-center max-w-full aspect-[0.97] w-[434px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sign