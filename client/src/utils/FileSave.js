import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export const exportToExcel = (data) => {
    if (!data || data.length === 0) {
        Swal.fire('No Data', 'No data to export!', 'info');
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'sales-report.xlsx');
};



export const exportToCSV = (data) => {
    if (!data || data.length === 0) return;

    const header = Object.keys(data[0]);
    const csvRows = [
        header.join(','),
        ...data.map(row =>
            header.map(fieldName => `"${String(row[fieldName]).replace(/"/g, '""')}"`).join(',')
        )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'sales-report.csv');
};



export const exportToPDF = (data, columns) => {
    const doc = new jsPDF();
    const tableColumn = columns.map(col => col.name);
    const tableRows = data.map(row =>
        columns.map(col => {
            const val = typeof col.selector === 'function' ? col.selector(row) : row[col.selector];
            return val ?? '';
        })
    );

    // doc.table({
    //     head: [tableColumn],
    //     body: tableRows,
    // });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
    });

    doc.save('sales-report.pdf');
};



export const exportToDoc = (data, columns) => {
    if (!data || data.length === 0) return;

    const header = columns.map(col => col.name);
    let html = `<table border="1" style="border-collapse:collapse;"><thead><tr>`;
    header.forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;

    data.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
            const val = typeof col.selector === 'function' ? col.selector(row) : row[col.selector];
            html += `<td>${val ?? ''}</td>`;
        });
        html += '</tr>';
    });

    html = html + '</tbody></table>';

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    saveAs(blob, 'sales-report.doc');
};
