// const fs = require('fs');
/** image onto base64 */
export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}


export function convertPdfFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }

        if (file.type === 'application/pdf') {
            // Handle PDF file
            fileReader.readAsArrayBuffer(file);
        } else {
            // Handle image file
            fileReader.readAsDataURL(file);
        }
    });
}


export const fetchPdfTemplate = async () => {
    try {
        const response = await fetch('/test1.pdf'); // Update the path accordingly
        if (!response.ok) {
            throw new Error('Failed to fetch PDF template');
        }
        const pdfBytes = await response.arrayBuffer();
        return pdfBytes;
    } catch (error) {
        throw error;
    }
};

