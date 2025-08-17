import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CardSkeleton from '../../component/loader/CardSkeleton';
import { ReTitle } from 're-title';
import ProductCard from '../../component/ProductCard';

export default function Shop() {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);


  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', searchTerm, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?search=${searchTerm}&sort=${sortOrder}`);
      return res.data;
    }
  });





  return (
    <section className="py-20">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
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
