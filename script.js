document.addEventListener('DOMContentLoaded', () => {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expand/Collapse Sections
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling.nextElementSibling;
            if (content.style.display === 'none' || !content.style.display) {
                content.style.display = 'block';
                button.textContent = '▲';
            } else {
                content.style.display = 'none';
                button.textContent = '▼';
            }
        });
    });

    // PDF Download Button
    // const downloadButton = document.getElementById('download-btn');
    // if (downloadButton) {
    //     downloadButton.addEventListener('click', () => {
    //         // Use html2canvas to capture the entire body
    //         html2canvas(document.body, {
    //             scale: 2, // Increase scale for better quality
    //             useCORS: true, // Allow cross-origin images
    //             logging: true, // Enable logging for debugging
    //         }).then((canvas) => {
    //             // Convert the canvas to an image
    //             const imgData = canvas.toDataURL('image/png');

    //             // Create a new PDF instance
    //             const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

    //             // Calculate the dimensions of the PDF
    //             const imgWidth = 210; // A4 width in mm
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //             // Add the image to the PDF
    //             pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    //             // Save the PDF
    //             pdf.save('Dr_Sreeharsha_Resume.pdf');
    //         }).catch((error) => {
    //             console.error('Error generating PDF:', error);
    //         });
    //     });
    // }
    const downloadButton = document.getElementById('download-btn');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            // Hide the download button and profile picture
            downloadButton.style.display = 'none';
            const profilePic = document.getElementById('profile-pic');
            profilePic.style.display = 'none';

            // Scroll to the top of the page to ensure all content is rendered
            window.scrollTo(0, 0);

            // Use html2canvas to capture the entire body
            html2canvas(document.body, {
                scale: 2, // Increase scale for better quality
                useCORS: true, // Allow cross-origin images
                logging: true, // Enable logging for debugging
                windowWidth: document.body.scrollWidth, // Capture full width
                windowHeight: document.body.scrollHeight, // Capture full height
            }).then((canvas) => {
                // Convert the canvas to an image
                const imgData = canvas.toDataURL('image/png');

                // Create a new PDF instance
                const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

                // Calculate the dimensions of the PDF
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Split the content into multiple pages if it exceeds the height of an A4 page
                const pageHeight = 297; // A4 height in mm
                let position = 0;

                while (position < imgHeight) {
                    pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
                    if (position + pageHeight < imgHeight) {
                        pdf.addPage(); // Add a new page if content exceeds the current page
                    }
                    position += pageHeight;
                }

                // Save the PDF
                pdf.save('Dr_Sreeharsha_Resume.pdf');

                // Show the download button and profile picture again
                downloadButton.style.display = 'block';
                profilePic.style.display = 'block';
            }).catch((error) => {
                console.error('Error generating PDF:', error);
                // Show the download button and profile picture again in case of error
                downloadButton.style.display = 'block';
                profilePic.style.display = 'block';
            });
        });
    }
});