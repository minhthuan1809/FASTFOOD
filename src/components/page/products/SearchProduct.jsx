import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/middlewares/client/addProduct";
import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
      dispatch(getProducts(searchQuery));
    }
  }, [location.search, dispatch]);

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      const queryParams = new URLSearchParams(location.search);
      if (value) {
        queryParams.set("search", value);
      } else {
        queryParams.delete("search");
      }
      navigate({ search: queryParams.toString() });
    },
    [location.search, navigate]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div>
      <input
        type="search"
        id="searchInput"
        placeholder="Nhập món ăn ..."
        className="flex-grow m-0 p-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
