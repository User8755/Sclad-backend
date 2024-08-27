const Excel = require('exceljs');

module.exports = (req, res, next) => {
  const workbook = new Excel.Workbook();
  workbook.xlsx
    .load(req.files.file.data)
    .then(() => {
      const worksheet = workbook.getWorksheet(1);
      const cell = (lit, num) => worksheet.getCell(lit + num);

      const { lastRow } = worksheet;
      const arr = [];

      for (let startRow = 5; startRow <= lastRow.number; startRow += 1) {
        const currentRow = { art: '', name: '', place: '' };
        currentRow.art = cell('A', startRow).value.trim();
        currentRow.name = cell('D', startRow).value.trim();
        currentRow.place = '' || cell('F', startRow).value.trim();

        arr.push(currentRow);
      }
      const uniqArt = [];
      arr.forEach((i) => {
        const obj = { art: i.art, name: i.name, place: [] };
        if (!uniqArt.some((s) => s.art === i.art)) {
          arr
            .filter((f) => f.art === i.art)
            .forEach((d) => obj.place.push(d.place));
          uniqArt.push(obj);
        }
      });
      req.data = uniqArt;

      next();
    })
    .catch((e) => next(e));
};
