function tinhDTB(toan, ly, hoa) {
  return (toan + ly + hoa) / 3;
}

function xepLoai(dtb) {
  if (dtb > 9) {
    console.log("xuat sac");
  } else if (dtb > 7) {
    console.log("gioi");
  } else if (dtb > 6) {
    console.log("kha");
  } else if (dtb > 5) {
    console.log("trung binh");
  } else {
    console.log("yeu");
  }
}

function main() {
  var average = tinhDTB(10, 10, 9);
  console.log(average);
  xepLoai(average);
}
main();
