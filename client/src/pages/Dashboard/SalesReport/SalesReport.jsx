
import DataTable from 'react-data-table-component';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SkeletonTableLoader from '../../../component/loader/SkeletonTableLoader';
import { exportToCSV, exportToDoc, exportToExcel, exportToPDF } from '../../../utils/FileSave';

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();





  const { data, isPending } = useQuery({
    queryKey: ['salesReport'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/sales-report',);
      return res.data;
    },
  })
  const columns = [
    { name: 'Medicine Name', selector: row => row.medicineName, sortable: true },
    { name: 'Seller Email', selector: row => row.sellerEmail || 'N/A', sortable: true },
    { name: 'Buyer Email', selector: row => row.buyerEmail, sortable: true },
    { name: 'Price', selector: row => row.price, sortable: true, right: true, format: row => `$${row.price.toFixed(2)}` },
    { name: 'Quantity', selector: row => row.quantity, sortable: true, right: true },
    { name: 'Total', selector: row => row.total, sortable: true, right: true, format: row => `$${row.total.toFixed(2)}` },
    {
      name: 'Date', selector: row => row.date, sortable: true, format: row => {
        const d = new Date(row.date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
    },
  ];

  // Export data to Excel


  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sales Report</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

        <button
          onClick={() => exportToExcel(data)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to Excel
        </button>
        <button
          onClick={() => exportToCSV(data)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to CSV
        </button>
        <button
          onClick={() => exportToPDF(data, columns)}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to PDF
        </button>
        <button
          onClick={() => exportToDoc(data, columns)}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to Doc
        </button>
      </div>

      {
        isPending && <SkeletonTableLoader></SkeletonTableLoader>
      }
      {!isPending && data?.length === 0 && (
        <p className="text-center text-gray-500">No sales data found for selected date range.</p>
      )}


      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        // striped
        // dense
        defaultSortFieldId={7}
      />
    </div>
  );
};

export default SalesReport;
