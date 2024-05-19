import SparkMD5 from 'spark-md5'


const hash = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        const fr = new FileReader();
        fr.readAsArrayBuffer(blob);
        fr.onload = (e) => {
            spark.append(e.target?.result as ArrayBuffer);
            resolve(spark.end());
        }
    })
}

export default hash;