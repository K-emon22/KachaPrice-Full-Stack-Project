import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewSection from "../ReviewSection/ReviewSection";
import ProductCompare from "../ProductCompare/ProductCompare";
import Loader from "../../../Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { user, loading, accessToken } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [addingWatchlist, setAddingWatchlist] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const token = accessToken;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (loading || !user || !token) return;

    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setIsFetching(false);
      }
    };

    const checkWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/wishlist/${user.email}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const wishlistItems = res.data || [];
        const found = wishlistItems.some((item) => item.productId === id);
        setIsWishlisted(found);
      } catch {}
    };

    fetchProduct();
    checkWishlist();
  }, [loading, user, id, token]);

  const handleWatchlist = async () => {
    if (!user || !accessToken) {
      toast.error("You must be logged in.");
      return;
    }

    setAddingWatchlist(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/wishlist`,
        { productId: product._id, userEmail: user.email },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      toast.success(res.data.message || "Added to watchlist!");
      setIsWishlisted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to watchlist");
    } finally {
      setAddingWatchlist(false);
    }
  };

  if (isFetching) return <Loader />;

  if (error) {
    return <p className="text-center mt-8 text-red-600 font-semibold">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-8 text-gray-600">No product data available.</p>;
  }

  return (
    <div className="mx-[2%] lg:mx-[5%] min-h-screen text-gray-800">
      <div className="bg-white rounded-2xl shadow-md my-10 p-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-green-600">Product Details</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="rounded-xl shadow w-full object-cover h-64 md:h-full"
            />
          </div>

          <div className="md:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="text-gray-700 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">📍 Market:</span> {product.market || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">💰 Price: </span>{" "}
                  <span className="text-green-600 font-bold"> {product.price} </span>৳
                </p>
                <p>
                  <span className="font-semibold">📅 Posted At:</span>{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {product.vendor && (
              <div className="mt-6 p-4 border rounded-xl bg-green-50">
                <h3 className="text-xl font-semibold mb-2 text-green-700">Vendor Info</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={product.vendor.image || "https://via.placeholder.com/64"}
                    alt={product.vendor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{product.vendor.name}</p>
                    <p className="text-gray-600">{product.vendor.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-row justify-between mt-10">
              <Link
                to="/payment"
                className="btn  border-green-600 h-[45px] border-2 bg-white hover:bg-green-100 text-green-700 font-medium"
              >
                Buy Now
              </Link>
              <button
                onClick={handleWatchlist}
                disabled={addingWatchlist || isWishlisted}
                className={`btn-primary h-10 ${
                  isWishlisted || addingWatchlist ? "!cursor-not-allowed !text-black opacity-60" : ""
                }`}
              >
                {isWishlisted ? "✅ Wishlisted" : addingWatchlist ? "Adding..." : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductCompare productId={product._id} />
      </div>
      <ReviewSection productId={product._id} accessToken={accessToken} />
    </div>
  );
};

export default ProductDetails;