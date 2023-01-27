import XLSX from 'xlsx'
import fs from 'file-saver'
import { cloneDeep } from 'lodash-es'
 
const s2ab = (s) => {
  var buf
  if (typeof ArrayBuffer !== 'undefined') {
    buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  } else {
    buf = new Array(s.length)
    for (var i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff
    return buf
  }
}
 
// 自动分析dom元素导出excel
export function excelExport(table, filename) {
  // workbook,
  const wb = XLSX.utils.table_to_book(table)
 
  /* Export to file (start a download) */
  const defaultCellStyle = {
    font: { name: 'Verdana', sz: 13, color: 'FF00FF88' },
    fill: { fgColor: { rgb: 'FFFFAA00' } },
  }
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    cellStyle: true,
    defaultCellStyle: defaultCellStyle,
    showGridLines: false,
  }
  const wbout = XLSX.write(wb, wopts)
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  fs.saveAs(blob, filename+'.xlsx')
}
 
// 使用数据导出excel
export function excelExport2(data, headers, filename) {
  const json = cloneDeep(data)
 
  json.forEach(item => {
    for(let key in item){
      if(headers.hasOwnProperty(key)){
        item[headers[key]] = item[key]
      }
      delete item[key]
    }
  })
 
  // excel 对象
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(json, {header: Object.values(headers)})
  wb.SheetNames.push(filename)
  wb.Sheets[filename] = ws
  const defaultCellStyle = {
    font: { name: 'Verdana', sz: 13, color: 'FF00FF88' },
    fill: { fgColor: { rgb: 'FFFFAA00' } },
  }
  const wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
    cellStyle: true,
    defaultCellStyle: defaultCellStyle,
    showGridLines: false,
  }
  const wbout = XLSX.write(wb, wopts)
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  fs.saveAs(blob, filename+'.xlsx')
}
 
// excel导入
export function excelImport(file, output) {
  const type = file.name.split('.')[1]
  const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt'].some(
    (item) => item === type
  )
  if (!fileType) {
    ElMessage.error('格式错误！请重新选择')
    return
  }
 
  const reader = new FileReader(file)
  reader.readAsArrayBuffer(file, 'utf-8')
  reader.onloadend = function (e) {
    const data = e.target.result
    /* Parse file */
    // workbook
    const wb = XLSX.read(data, {
      type: 'buffer',
    })
    // worksheet
    const ws = wb.Sheets[wb.SheetNames[0]]
    const htmlstr = XLSX.utils.sheet_to_html(ws)
    /* Generate HTML */
    output.innerHTML = htmlstr
  }
}
