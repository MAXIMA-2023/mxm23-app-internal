import Excel from "exceljs";
import { MUIDataTableColumn } from "mui-datatables";
import Swal from "sweetalert2";

/*
    ** GOOFY AHH EXCEL EXPORTER **

    HOW TO USE:
    trigger this function with the following parameters:
    - name: string
    - muiColumn: MUIDataTableColumn[]
    - data: { [key: string]: any }[]

    contoh:
        function:
        onClick={() => {
            exportToExcel("Nama Divisi", columnsPanitia, dataPanitia);
        }}
*/
const exportToExcel = async (
  name: string,
  muiColumn: MUIDataTableColumn[],
  data: { [key: string]: any }[]
) => {
  try {
    const template = new Excel.Workbook();
    const ws = template.addWorksheet("Sheet 1");

    // divisi
    const divisiCell = ws.getCell("B2");
    divisiCell.value = name;
    divisiCell.font = {
      bold: true,
    };

    // exported at
    const exportedAtCell = ws.getCell("B3");
    exportedAtCell.value = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    exportedAtCell.font = {
      size: 11,
    };

    // headers
    const header = ws.getRow(5);

    muiColumn.forEach((column, index) => {
      // style cell width to be bold and width 20
      const cell = header.getCell(index + 2);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "185C99" },
      };

      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
      };

      cell.border = {
        top: { style: "thick" },
        left: { style: "thick" },
        bottom: { style: "thick" },
        right: { style: "thick" },
      };

      header.getCell(index + 2).value = column.label;
    });

    // data
    data.forEach((organisator, index) => {
      const row = ws.getRow(index + 6);

      muiColumn.forEach((column, index) => {
        row.getCell(index + 2).value = organisator[column.name] ?? undefined;
      });
    });

    // adjust column width
    ws.columns.forEach((column) => {
      const lengths = column.values?.map((v) => v?.toString().length ?? 0);
      const maxLength = Math.max(
        ...(lengths?.filter((v): v is number => typeof v === "number") ?? [])
      );
      if (isFinite(maxLength)) {
        column.width = maxLength + 5;
      }
    });

    const blob = new Blob([await template.xlsx.writeBuffer()], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    // download url
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.xlsx`;
    a.click();
  } catch (err) {
    console.error(err);
    Swal.fire(
      "Error!",
      "Maaf, terjadi kesalahan saat export ke Excel",
      "error"
    );
  }
};

export default exportToExcel;
