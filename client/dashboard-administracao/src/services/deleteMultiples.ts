import { coommitBooks } from "@/utils/commitBooks";

class BatchDeleteOperation {
    public booksListToDelete: Array<string> 

    constructor(booksListToDelete: Array<string>){ this.booksListToDelete = booksListToDelete }

    public deleteOperation(){
        try {
             fetch('removeBookBatch', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                bookTitles: this.booksListToDelete,
                            })
                        }).then(async response => {
                            if (response.redirected) {
                                window.location.href = response.url;
                                console.log(response.url);
                                alert("Não Autorizado! ")
                            } else {
                                coommitBooks()
                                console.log("autorizado");
                                return response
                            }
                        })
                        .then(response => response?.json())
                        .then(data => {
                            console.log(data);
                            alert(data.message)
                            return data
                        })
        } catch (error) {
            return error
        }
    }

}

export default BatchDeleteOperation