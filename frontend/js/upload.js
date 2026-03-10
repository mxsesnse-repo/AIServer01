async function uploadDataset() {

    const fileInput = document.getElementById("datasetFile")
    const status = document.getElementById("status")

    if (fileInput.files.length === 0) {
        status.innerText = "Please select a dataset"
        return
    }

    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append("dataset", file)

    status.innerText = "Uploading..."

    try {

        const response = await fetch("http://localhost:8000/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        status.innerText = data.message

    } catch (error) {

        console.error(error)
        status.innerText = "Upload failed"

    }

}