// Enable slot editing
document.querySelectorAll('.slot:not(.sleeping)').forEach(slot => {
    slot.addEventListener('click', () => {
        const activity = prompt("Enter activity for this slot:");
        if (activity) {
            slot.textContent = activity;
        }
    });
});

// Download timetable as PDF
document.getElementById('downloadBtn').addEventListener('click', () => {
    const element = document.querySelector('.container'); // Capture the whole timetable container
    html2canvas(element, { scale: 2 }).then(canvas => { // High scale for better quality
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth(); // PDF page width
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale height proportionally
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("timetable.pdf");
    }).catch(error => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
    });
});
