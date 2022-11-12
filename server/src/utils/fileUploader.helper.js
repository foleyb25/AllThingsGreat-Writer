async function uploadFile(file) {
    console.log("Trying to upload file with helper method..")

    // perform file upload
    const options = {
        adapter: require('skipper-better-s3'),
        key: 'AKIAJKFA7OTP4OZYSKBQ',
        secret: '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',
        bucket: 'all-things-great/test',
        s3params: { ACL: 'public-read' }
    }

    file.upload(options, async (err, files) => {
        if (err) { 
        throw('uploadFailed')
        }

        const fileUrl = files[0].extra.Location
        return fileUrl
    })

}
  
module.exports = {
    uploadFile
}
  