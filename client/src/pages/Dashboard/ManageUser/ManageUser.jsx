import { useQuery, useMutation } from '@tanstack/react-query';
import { FaUser, FaUserTie, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [sortRole, setSortRole] = useState('all'); 
 
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', sortRole],
    queryFn: async () => {
 
      const url = sortRole === 'all' ? '/users' : `/users?role=${sortRole}`;
      const res = await axiosSecure.get(url);
      return res.data;
    }
  });

  // Mutation for role change
  const { mutateAsync: roleMutation } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire('Updated!', 'User role has been changed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to change user role.', 'error');
    },
  });

  const handleChangeRole = (userId, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Change',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await roleMutation({ id: userId, role: newRole });
      }
    });
  };

  return (
    <section className=" md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <select
          className="border px-3 py-1 rounded"
          value={sortRole}
          onChange={(e) => setSortRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {
        isLoading && (
          <SkeletonTableLoader></SkeletonTableLoader>
        )
      }
      {
        !isLoading &&
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-2xl w-full text-left text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Current Role</th>
                <th className="px-6 py-3">Change Role</th>
              </tr>
            </thead>
            <tbody>

              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50 last:border-b-0">
                  <td className="px-6 py-4">
                    <img
                      src={user.photoURL || 'https://www.w3schools.com/howto/img_avatar.png'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleChangeRole(user._id, 'user')}
                      className="text-blue-600 hover:text-blue-800"
                      title="Make User"
                    >
                      <FaUser />
                    </button>
                  
                    <button
                      onClick={() => handleChangeRole(user._id, 'admin')}
                      className="text-purple-600 hover:text-purple-800"
                      title="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              ))}
              {
                users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      No {sortRole === 'all' ? 'users' : sortRole} found.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  );
}
