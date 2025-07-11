import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router";
import {HiMenuAlt3} from "react-icons/hi";
import {AuthContext} from "../ContextFiles/AuthContext";
import {signOut} from "firebase/auth";
import {Auth} from "../FirebaseAuth/FirebaseAuth";
import Swal from "sweetalert2";

const NavBAr = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setCurrentTheme(saved);
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const {user, loading} = useContext(AuthContext);
  const navigate = useNavigate();
console.log(user);

  const logOut = () => {
    signOut(Auth);
    navigate("/");
  };

  const pages = (
    <>
      <NavLink
        to={"/"}
        className="relative px-2 py-1 font-semibold text-black overflow-hidden"

        // {({isActive})=> }
      >
        {({isActive}) => (
          <>
            <span
              className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                isActive ? "scale-x-100" : "scale-x-0"
              } origin-left rounded-lg`}
            />
            <span className="relative z-10">Home</span>
          </>
        )}
      </NavLink>

      <NavLink
        to={"/bookshelf"}
        className="relative px-2 py-1 font-semibold text-black overflow-hidden"
      >
        {({isActive}) => (
          <>
            <span
              className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                isActive ? "scale-x-100" : "scale-x-0"
              } origin-left rounded-lg`}
            />
            <span className="relative z-10">Bookshelf</span>
          </>
        )}
      </NavLink>

      <>
        <NavLink
          to={"/addBook"}
          className="relative px-2 py-1 font-semibold text-black overflow-hidden"
        >
          {({isActive}) => (
            <>
              <span
                className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left rounded-lg`}
              />
              <span className="relative z-10">Add Book</span>
            </>
          )}
        </NavLink>
        <NavLink
          to={"/myBooks"}
          className="relative px-2 py-1 font-semibold text-black overflow-hidden"
        >
          {({isActive}) => (
            <>
              <span
                className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left rounded-lg`}
              />
              <span className="relative z-10">My Books</span>
            </>
          )}
        </NavLink>
        <NavLink
          to={"/profile"}
          className="relative px-2 py-1 font-semibold text-black overflow-hidden"
        >
          {({isActive}) => (
            <>
              <span
                className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                  isActive ? "scale-x-100" : "scale-x-0"
                } origin-left rounded-lg`}
              />
              <span className="relative z-10">Profile</span>
            </>
          )}
        </NavLink>
      </>

      <NavLink
        to={"/about"}
        className="relative px-2 py-1 font-semibold text-black overflow-hidden"
      >
        {({isActive}) => (
          <>
            <span
              className={`absolute inset-0 bg-blue-500 z-0 transition-transform duration-500 ease-in-out ${
                isActive ? "scale-x-100 " : "scale-x-0"
              } origin-left rounded-lg`}
            />
            <span className="relative z-10 ">About</span>
          </>
        )}
      </NavLink>
    </>
  );

  const button = (
    <>
      <Link to={"/login"}>
        <button className="btnn">Login </button>
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-sm bg-blue-600/30">
      <nav className="flex flex-row justify-between mb-10 pt-1 px-[2%] lg:px-[5%] border-b">
        <div className="flex justify-between gap-2 mb-1">
          <div className="flex justify-center items-center">
            <img
              className="h-10 w-15 rounded-lg"
              src={
                "https://i.ibb.co/Q7NsLYWn/572504ff-152a-44e5-9fb4-e4d0966bab63.jpg"
              }
              alt=""
            />
          </div>
          <h1 className="my-auto font-bold text-2xl hidden lg:text-4xl [@media(min-width:851px)]:block">
            Bookshelf
          </h1>
        </div>

        <div className="my-auto hidden [@media(min-width:850px)]:block">
          <div className="flex gap-3 text-[12px] xl:gap-8 lg:text-[16px] font-semibold mb-1.5">
            {pages}
          </div>
        </div>

        <div className="[@media(min-width:850px)]:hidden my-auto">
          <h1 className="my-auto font-bold text-2xl">Bookshelf</h1>
        </div>

        <div className="flex flex-row gap-3 items-center mb-1">
          <div className="hidden [@media(min-width:850px)]:block my-1">
            <select
              value={currentTheme}
              onChange={(e) => changeTheme(e.target.value)}
              className="select select-bordered rounded-full border-e-2 border-black"
            >
              <option value="light">🌞 </option>
              <option value="dark">🌙 </option>
              <option value="cupcake">🧁 </option>
              <option value="bumblebee">🐝 </option>
              <option value="synthwave">🌌 </option>
              <option value="dracula">🧛‍♂️ </option>
              <option value="valentine">💘 </option>
              <option value="halloween">🎃 </option>
              <option value="forest">🌲 </option>
              <option value="aqua">💧 </option>
              <option value="pastel">🎨 </option>
              <option value="luxury">💎 </option>
              <option value="night">🌃 </option>
              <option value="winter">❄️ </option>
              <option value="coffee">☕ </option>
            </select>
          </div>
          {loading ? (
            <span className="loading h-[50px] w-[40px] loading-ring my-auto "></span>
          ) : (
            <>
              {user ? (
                <div className="dropdown dropdown-end ">
                  <div tabIndex={0} role="button ">
                    <img
                      className="h-10 my-auto  rounded-full"
                      src={user?.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-3 border-2"
                  >
                    <li className="font-bold mb-5 text-center mt-3">
                      {user?.displayName || "User"}
                    </li>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure You Want To Logout?",
                          text: "You won’t be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, Logout",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            logOut();
                            Swal.fire({
                              title: "Logged Out!",
                              text: "Successfully Logged Out.",
                              icon: "success",
                              showConfirmButton: true,
                            });
                          }
                        });
                      }}
                      className="btnnnnn"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              ) : (
                <div className="space-x-3 hidden [@media(min-width:850px)]:block pb-1">
                  {button}
                </div>
              )}
            </>
          )}

          <div className="[@media(min-width:850px)]:hidden my-auto">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <HiMenuAlt3 size={35} className="mt-1.5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border-2 mt-3"
              >
                <div className="flex flex-col font-semibold space-y-1">
                  {pages}

                  <div className="mt-4">
                    <label className="text-sm font-semibold mb-1 block">
                      Theme:
                    </label>
                    <select
                      value={currentTheme}
                      onChange={(e) => changeTheme(e.target.value)}
                      className="select select-bordered w-full max-w-xs "
                    >
                      <option value="light">🌞 Light</option>
                      <option value="dark">🌙 Dark</option>
                      <option value="cupcake">🧁 Cupcake</option>
                      <option value="bumblebee">🐝 Bumblebee</option>
                      <option value="synthwave">🌌 Synthwave</option>
                      <option value="dracula">🧛‍♂️ Dracula</option>
                      <option value="valentine">💘 Valentine</option>
                      <option value="halloween">🎃 Halloween</option>
                      <option value="forest">🌲 Forest</option>
                      <option value="aqua">💧 Aqua</option>
                      <option value="pastel">🎨 Pastel</option>
                      <option value="luxury">💎 Luxury</option>
                      <option value="night">🌃 Night</option>
                      <option value="winter">❄️ Winter</option>
                      <option value="coffee">☕ Coffee</option>
                    </select>
                  </div>

                  {user ? (
                    <div className="w-full">
                      <hr className="mb-2 mt-4" />
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure You Want To Logout?",
                            text: "You won’t be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, Logout",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              logOut();
                              Swal.fire({
                                title: "Logged Out!",
                                text: "Successfully Logged Out.",
                                icon: "success",
                                showConfirmButton: true,
                              });
                            }
                          });
                        }}
                        className="btnnnnn w-full"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="w-full">
                      <hr className="mt-2" />
                      <div className="flex justify-center items-center mt-5 ">
                        {button}
                      </div>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBAr;
