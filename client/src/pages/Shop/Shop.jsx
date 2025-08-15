import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEye, FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import SkeletonTableLoader from '../../component/loader/SkeletonTableLoader';
import useUserRole from '../../hooks/useUserRole';
import { useRemoveFromCart } from '../../hooks/useRemoveFromCart';
import { useAddToCart } from '../../hooks/useAddToCart';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { ReTitle } from 're-title';

export default function Shop() {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { userId } = useUserRole();
  const { cart = [] } = useCart();
  const { mutate: addToCart, isPending: adding } = useAddToCart();
  const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();
  const { user } = useAuth();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', searchTerm, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?search=${searchTerm}&sort=${sortOrder}`);
      return res.data;
    }
  });

  const handleAddToCart = (product) => {
    if (!user) {
      return Swal.fire('Error', 'Please login first to add product on cart', 'error');
    }
    addToCart({ userId, productId: product._id });
    Swal.fire('Added!', `${product.name} added to cart`, 'success');
  };

  const handleRemoveFromCart = (product) => {
    console.log(product._id);
    removeFromCart({ userId, productId: product._id });
    Swal.fire('Remove!', `${product.name} Remove from cart`, 'success');

  };

  const isInCart = (id) => cart.some(item => item.productId === id);


  return (
    <section className="p-6">
      <ReTitle title="Shop || Holy Care Pharmacy" />
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-5">
          <h2 className="text-3xl font-bold">Medicines Shop</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded w-full md:w-auto"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border px-3 py-2 rounded w-full md:w-auto"
            >
              <option value="asc">Sort A To Z</option>
              <option value="desc">Sort Z To A</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <SkeletonTableLoader />
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded">
            <table className="min-w-2xl w-full text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={prod.productImageURL}
                        alt={prod.name}
                        className="w-20 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{prod.name}</td>
                    <td className="px-6 py-4">${prod.price}</td>
                    <td className="px-6 py-4">{prod.stock} in stock</td>
                    <td className="px-6 py-4 space-x-2">
                      {isInCart(prod._id) ? (
                        <button
                          disabled={removing}
                          onClick={() => handleRemoveFromCart(prod)}
                          className="text-red-200 hover:text-red-100 text-xl h-10 w-10 rounded-md inline-flex items-center justify-center bg-black cursor-pointer"
                          title="Remove from Cart"
                        >
                          <FaRegTrashAlt />
                        </button>
                      ) : (
                        <button
                          disabled={adding}
                          onClick={() => handleAddToCart(prod)}
                          className="text-green-200 hover:text-green-100 text-xl h-10 w-10 rounded-md inline-flex items-center justify-center bg-black cursor-pointer"
                          title="Add to Cart"
                        >
                          <FaShoppingCart />
                        </button>
                      )}
                      <button
                        className="text-blue-200 hover:text-blue-100 text-xl h-10 w-10 rounded-md inline-flex items-center justify-center bg-yellow-900 cursor-pointer"
                        title="View Details"
                        onClick={() => setSelectedProduct(prod)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-[#000000d8] flex justify-center items-center z-50 max-h-screen py-10">
            <div className="bg-white max-w-lg w-full p-6 rounded shadow relative overflow-hidden h-full">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 right-2 text-xl font-bold"
              >
                ×
              </button>
              <div className='h-full overflow-y-auto'>
                <h3 className="text-xl font-semibold mb-4">{selectedProduct.name}</h3>
                <img
                  src={selectedProduct.productImageURL}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                {selectedProduct.features?.length > 0 && (
                  <div className="mt-2">
                    <strong>Features:</strong>
                    <ul className="list-disc pl-5 text-gray-700">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
