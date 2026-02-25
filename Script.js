function makeSizer(size) {
    return () => {
        document.body.style.fontSize =`${size}px`;
    };
}
const sizer12 = makeSizer(12);
const sizer14 = makeSizer(14);
const sizer16 = makeSizer(16);

document.getElementById("size-12").onclick = sizer12;
document.getElementById("size-14").onclick = sizer14;
document.getElementById("size-16").onclick = sizer16;