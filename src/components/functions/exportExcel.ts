const xlsx = await import('xlsx');
import { saveAs } from "file-saver";

export default function exportExcel(
  items: { [key: string]: unknown[] },
  export_name: string,
) {
  const wb = xlsx.utils.book_new();

  for (const [key, value] of Object.entries(items)) {
    // add worksheet to file with bookmark members
    const ws = xlsx.utils.json_to_sheet(value);
    xlsx.utils.book_append_sheet(wb, ws, key);
  }

  const wbout = xlsx.write(wb, { bookType: "xlsx", type: "binary" });

  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  // The preference for application/octet-stream probably has to do with IE6 compatibility.
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `${export_name}.xlsx`,
  );
}
