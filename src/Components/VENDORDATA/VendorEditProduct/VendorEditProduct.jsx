import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../ContextFiles/AuthContext";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API;

const VendorEditProduct = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    market: "",
    image: "",
    description: "",
  });
console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/allProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProduct(res.data);
        setFormData({
          name: res.data.name || "",
          price: res.data.price || "",
          market: res.data.market || "",
          image: res.data.image || "",
          description: res.data.description || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      price: Number(formData.price), // ✅ Convert to number before sending
    };

    try {
      const res = await axios.put(`${BASE_URL}/allProduct/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Product updated successfully!", "success");
      } else {
        Swal.fire("No changes made", "Try updating some fields.", "info");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Edit Product
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-semibold">Price</label>
          <input
            type="number"
            name="price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-semibold">Market</label>
          <input
            type="text"
            name="market"
            className="input input-bordered w-full"
            value={formData.market}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-success w-full mt-4 text-white font-bold"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default VendorEditProduct;