import { coommitBooks } from "@/utils/commitBooks";

class BatchDeleteOperation {
    public booksListToDelete: Array<string> 

    constructor(booksListToDelete: Array<string>){ this.booksListToDelete = booksListToDelete }

    public async deleteOperation(){
        try {
             const response = await fetch('book/bulk', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookTitles: this.booksListToDelete,
                })
            })

            if (response.redirected) {
                window.location.href = response.url;
                console.log(response.url);
                alert("Não Autorizado! ")
            } else {
                coommitBooks()
                console.log("autorizado");
                return response
            }

            
            const data = await response.json();
            console.log(data);
            alert(data.message);
            return data;
        } catch (error) {
            console.log(error);
            
            return error
        }
    }

}

export default BatchDeleteOperation