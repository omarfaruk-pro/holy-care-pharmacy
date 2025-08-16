import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Button from '../../../component/buttons/Button';

export default function ManageBanner() {
  const [updatingId, setUpdatingId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [offerTimeError, setOfferTimeError] = useState(null);
  const [offerPercentError, setOfferPercentError] = useState(null);

  const { data: banners = [], refetch } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await axiosSecure.get('/banners');
      return res.data;
    }
  });

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);

    try {
      if (status === 'delete') {
        const confirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You want to delete this promotion!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        });

        if (!confirm.isConfirmed) {
          setUpdatingId(null);
          return;  // User canceled delete
        }

        await axiosSecure.delete(`/banners/${id}`);
        Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
      } else {
        await axiosSecure.patch(`/banners/${id}`, { status });
        Swal.fire('Updated!', `Status changed to ${status}`, 'success');
      }

      // Refresh data after success
      refetch();
    } catch (error) {
      console.error("Error updating banner:", error);
      Swal.fire(
        'Error!',
        error.response?.data?.message || error.message || 'Something went wrong.',
        'error'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOfferTime = (e) => {
    const time = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (time < today) {
      setOfferTimeError("You cannot select a past date!");
      e.target.value = "";
      return;
    }
    else {
      setOfferTimeError(null);
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `Offer will be end on ${time.toDateString()}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('targetDate', e.target.value);
        }
      });
  }

  const handleOfferPercentage = (e) => {
    e.preventDefault();
    const percentageStr = e.target.offerPercentage.value;
    const percentage = parseFloat(percentageStr);
    if (percentage < 0 || percentage > 12) {
      setOfferPercentError("Percentage should be between 0 and 12!");
      return;
    } else if(typeof percentage !== 'number'){
      setOfferPercentError("Percentage should be a number!");
      return;
    }
    else {
      setOfferPercentError(null);
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Offer percentage will be ${percentage}%`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('discountPercentage', percentage);
          e.target.reset();
        }
      });
  }

  const inputClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5';

  return (
    <>
      <section className="px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Manage Promotional Banners And Offer</h2>
        <div className=" mb-6 flex justify-between">
          <div>
            <div className='flex justify-end items-center gap-4'>
              <p className='font-semibold'>Percentage of Offer</p>
              <form onSubmit={handleOfferPercentage} className='flex items-center gap-1'>
                <input name='offerPercentage' type="number" className={inputClass} placeholder='10'/>
                <Button type="submit">Done</Button>
              </form>
            </div>
            {offerPercentError && <p className='text-red-500'>{offerPercentError}</p>}
          </div>
          <div>
            <div className='flex justify-end items-center gap-4'>
              <p className='font-semibold'>Offer will be end on</p>
              <input onChange={handleOfferTime} type="date" className={inputClass} />
            </div>
            {offerTimeError && <p className='text-red-500 text-right'>{offerTimeError}</p>}
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table min-w-2xl w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner._id} className="hover:bg-gray-100 transition">
                  <td className="font-semibold">{index + 1}</td>
                  <td className="flex items-center gap-2 py-2">
                    <img src={banner.productImage} alt="product" className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{banner.name}</p>
                      <p className="text-xs text-gray-500">{banner.tags?.join(', ')}</p>
                    </div>
                  </td>
                  <td>{banner.sellerEmail || 'N/A'}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${banner.status === 'active' ? 'bg-green-200 text-green-700' :
                        banner.status === 'inactive' ? 'bg-yellow-200 text-yellow-700' :
                          'bg-gray-200 text-gray-700'
                        }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value=""
                      onChange={(e) => handleStatusChange(banner._id, e.target.value)}
                      disabled={updatingId === banner._id}
                      className="border rounded px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="" disabled>Change</option>
                      <option value="active">Activate</option>
                      <option value="inactive">Inactivate</option>
                      <option value="delete" className="text-red-600">Delete</option>
                    </select>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No banners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
