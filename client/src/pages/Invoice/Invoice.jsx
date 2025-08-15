import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaPrint } from 'react-icons/fa';
import printJS from 'print-js';

export default function Invoice() {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/invoice/${orderId}`);
      return res.data;
    },
    enabled: !!orderId,
  });

  const printInvoice = () => {
    const content = document.getElementById('invoice-to-print');
    if (!content) return;

    printJS({
      printable: content.innerHTML,
      type: 'raw-html',
      style: `
        body { font-family: sans-serif; font-size: 12px; color: #000; }
        h2, h3, strong { color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid black; padding: 6px; text-align: left; }
        .total { font-size: 16px; font-weight: bold; text-align: right; margin-top: 10px; }
      `
    });
  };

  if (isLoading) return <p>Loading invoice...</p>;

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4 no-print">
        <h2 className="text-2xl font-bold">Invoice</h2>
        <button
          onClick={printInvoice}
          className="btn btn-sm btn-info flex items-center gap-2"
        >
          <FaPrint /> Print
        </button>
      </div>


      <div id="invoice-to-print" className="border p-4 space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-base">Holy Care Pharmacy</h3>
            <p>Modon Mohon Schoool Market<br />Chowmuhani, Noakhali</p>
          </div>
          <div className="text-right">
            <p><strong>Invoice #:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className="text-green-600">{order.status}</span></p>
          </div>
        </div>

        <div>
          <p><strong>Customer Name:</strong> {order.name}</p>
          <p><strong>Customer Email:</strong> {order.email}</p>
        </div>

        <table className="w-full text-left border mt-4 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item, index) => {
              const { name, price } = item.product;
              const qty = item.quantity;
              const subtotal = price * qty;

              return (
                <tr key={item._id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{name}</td>
                  <td className="p-2 border">${price}</td>
                  <td className="p-2 border">{qty}</td>
                  <td className="p-2 border">${subtotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right mt-4 text-base font-semibold">
          Total: ${order.amount.toFixed(2)}
        </div>
      </div>
    </section>
  );
}
