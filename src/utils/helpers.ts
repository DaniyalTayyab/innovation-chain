import ExcelJS from "exceljs";

export const classNames = (...classes : any) => {
    return classes.filter(Boolean).join(' ')
}

export const getLocalStorage = (variableName : string) =>{
  let requiredVar : any = localStorage.getItem(variableName);
  switch (variableName) {
      case 'auth':
        return requiredVar ? JSON.parse(requiredVar) : {user: {} , isLoggedin : false };
      default:
        return {}
    }
}



export const handleDownload = () => {
    const filePath = "/docs/Innovation Chain-Whitepaper.pdf"; // Relative path to the file

    // Create a link element
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "whitePaper.pdf"; // Specify the downloaded file name
    link.target = "_blank";
    link.rel = "White paper";

    // Dispatch a click event on the link
    link.dispatchEvent(new MouseEvent("click"));
};


export const handleRequestStatusClassName = (status : string) => {
  switch (status) {
    case "pending":
        return "py-1 px-3 rounded-full bg-orange-600 font-medium uppercase";
      case 'paid':
        return "py-1 px-3 rounded-full bg-blue-600 font-medium uppercase";
      case 'canceled':
        return "py-1 px-3 rounded-full bg-red-600 font-medium uppercase";
      break;
    default:
      return "py-1 px-3 rounded bg-orange-600 font-medium capitalize";
  }
};

export const exportExcelFile = (fileData : any , fileName : string)=>{
  // Create a new Excel workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Convert the array of objects to an array of arrays
  const arrayOfArrays = fileData.map((obj: any) => {
    return Object.values(obj);
  });

  // Add the data to the worksheet
  arrayOfArrays.forEach((row: any) => {
    worksheet.addRow(row);
  });

  // Generate a download link for the user
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName+".xlsx";
    a.click();
  });
}