import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { productActions } from "../action/productAction";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
    category: query.get("category") || ""
  });

  const menuList = [
    "Top",
    "Dress",
    "Pants",
    "Dog"
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    // URL 파라미터에서 초기 값 설정
    setSearchQuery({
      page: query.get("page") || 1,
      name: query.get("name") || "",
      category: query.get("category") || ""
    });
  }, [query]);

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      setSearchQuery({ ...searchQuery, name: value });
      navigate(`/?name=${value}`);
    }
  };

  const handleMyOrders = () => {
    if (user) {
      navigate("/account/purchase");
    } else {
      navigate("/login"); // 로그인 페이지로 리다이렉트
    }
  };

  const handleCategoryClick = (category) => {
    setSearchQuery({ ...searchQuery, category });
    navigate(`/?category=${category}`);
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="Search"
                onKeyPress={onCheckEnter}
                defaultValue={searchQuery.name}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button
              key={index}
              className={searchQuery.category === menu ? "active" : ""}
              onClick={() => handleCategoryClick(menu)}
            >
              {menu}
            </button>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>Sign out</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>Sign in</span>
                )}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`Cart(${
                  cartItemCount || 0
                })`}</span>
              )}
            </div>
            <div onClick={handleMyOrders} className="nav-icon">
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>My orders</span>
              )}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a
                href="#"
                className={searchQuery.category === menu ? "active" : ""}
                onClick={() => handleCategoryClick(menu)}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>
        {!isMobile && (
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search"
              onKeyPress={onCheckEnter}
              defaultValue={searchQuery.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
