const toBuffer = async (url: string) => {
    let blob = await (await fetch(url)).blob();
    return blob;
}

// const toBuffer = async (url: string,callback:()=>void) => {
//     let buffer = await toBlob(url);
//     const fr = new FileReader();
//     fr.readAsArrayBuffer(buffer);
//     fr.onload = (e) => {
//         callback(e);
//     }
// }
export default toBuffer;